
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Console } from '@/types';

const formSchema = z.object({
    consoleType: z.string().min(1, 'Console type is required.'),
    serialNumber: z.string().min(1, 'Serial number is required.'),
    color: z.string().min(1, 'Color is required.'),
    storageCapacity: z.coerce.number().positive('Storage capacity must be a positive number.'),
    issueType: z.enum(["Doesn't power on", "HDMI port broken", "Overheating", "Disk not reading", "Other"]),
    additionalNotes: z.string().optional(),
    pastRepairs: z.enum(['Yes', 'No']),
}).refine(data => {
    if (data.issueType === 'Other') {
        return data.additionalNotes && data.additionalNotes.trim().length > 0;
    }
    return true;
}, {
    message: "Additional notes are required when 'Other' is selected.",
    path: ['additionalNotes'],
});

type FormValues = z.infer<typeof formSchema>;

export function AdminEditConsoleForm({ consoleId }: { consoleId: string }) {
    const { isAdmin } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    useEffect(() => {
        const fetchConsoleData = async () => {
            if (!isAdmin) return;
            setLoading(true);
            try {
                const consoleRef = doc(db, 'consoles', consoleId);
                const consoleSnap = await getDoc(consoleRef);
                if (consoleSnap.exists()) {
                    const consoleData = consoleSnap.data() as Console;
                    form.reset(consoleData);
                } else {
                    toast({ variant: 'destructive', title: 'Error', description: 'Console record not found.' });
                    router.push('/admin');
                }
            } catch (error) {
                console.error("Failed to fetch console data:", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch console data.' });
            } finally {
                setLoading(false);
            }
        };
        fetchConsoleData();
    }, [isAdmin, consoleId, form, router, toast]);

    const onSubmit = async (values: FormValues) => {
        if (!isAdmin) {
            toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be an admin to perform this action.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const consoleRef = doc(db, 'consoles', consoleId);
            await updateDoc(consoleRef, values);

            toast({ title: 'Success', description: 'Console record has been updated.' });
            router.push('/admin');

        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Update Error', description: error.message || 'An unexpected error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (loading) {
        return <Card><CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader><CardContent><div className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-20 w-full" /></div></CardContent></Card>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Console Record</CardTitle>
                <CardDescription>Update the details for this repair ticket.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="consoleType" render={({ field }) => (
                                <FormItem><FormLabel>Console Type</FormLabel><FormControl><Input placeholder="e.g., PlayStation 5" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="serialNumber" render={({ field }) => (
                                <FormItem><FormLabel>Serial Number</FormLabel><FormControl><Input placeholder="Find on back/bottom of console" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="color" render={({ field }) => (
                                <FormItem><FormLabel>Color</FormLabel><FormControl><Input placeholder="e.g., White" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="storageCapacity" render={({ field }) => (
                                <FormItem><FormLabel>Storage Capacity (GB)</FormLabel><FormControl><Input type="number" placeholder="e.g., 825" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="issueType" render={({ field }) => (
                            <FormItem><FormLabel>Issue Type</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select the main issue" /></SelectTrigger></FormControl><SelectContent>
                                <SelectItem value="Doesn't power on">Doesn't power on</SelectItem>
                                <SelectItem value="HDMI port broken">HDMI port broken</SelectItem>
                                <SelectItem value="Overheating">Overheating</SelectItem>
                                <SelectItem value="Disk not reading">Disk not reading</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent></Select><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="additionalNotes" render={({ field }) => (
                            <FormItem><FormLabel>Additional Notes</FormLabel><FormControl><Textarea placeholder="Describe the issue in more detail..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="pastRepairs" render={({ field }) => (
                             <FormItem><FormLabel>Past Repairs</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Has this console been repaired before?" /></SelectTrigger></FormControl><SelectContent>
                                <SelectItem value="No">No</SelectItem>
                                <SelectItem value="Yes">Yes</SelectItem>
                            </SelectContent></Select><FormMessage /></FormItem>
                        )} />
                        
                        <div className="flex gap-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Update Record
                            </Button>
                            <Button variant="outline" onClick={() => router.push('/admin')} type="button">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
