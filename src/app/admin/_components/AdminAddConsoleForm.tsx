
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, getDocs, serverTimestamp, query, where } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { UserProfile } from '@/types';
import { useRouter } from 'next/navigation';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    userId: z.string().min(1, 'A user must be selected.'),
    consoleType: z.string().min(1, 'Console type is required.'),
    serialNumber: z.string().min(1, 'Serial number is required.'),
    color: z.string().min(1, 'Color is required.'),
    storageCapacity: z.coerce.number().positive('Storage capacity must be a positive number.'),
    issueType: z.enum(["Doesn't power on", "HDMI port broken", "Overheating", "Disk not reading", "Other"]),
    additionalNotes: z.string().optional(),
    pastRepairs: z.enum(['Yes', 'No']),
    photos: z.any()
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


export function AdminAddConsoleForm() {
    const { isAdmin } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!isAdmin) return;
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const userList = userSnapshot.docs.map(doc => doc.data() as UserProfile);
                setUsers(userList);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch user list.' });
            }
        };
        fetchUsers();
    }, [isAdmin, toast]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: '',
            consoleType: '',
            serialNumber: '',
            color: '',
            storageCapacity: undefined,
            issueType: undefined,
            additionalNotes: '',
            pastRepairs: undefined,
            photos: undefined,
        }
    });

    const onSubmit = async (values: FormValues) => {
        if (!isAdmin) {
            toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be an admin to perform this action.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const consolesRef = collection(db, 'consoles');
            const q = query(consolesRef, where('serialNumber', '==', values.serialNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                toast({
                    variant: 'destructive',
                    title: 'Duplicate Serial Number',
                    description: 'A console with this serial number has already been submitted.',
                });
                setIsSubmitting(false);
                return;
            }

            const photoFileList = form.getValues('photos') as FileList | null;
            const photoFiles = photoFileList ? Array.from(photoFileList) : [];

            if (photoFiles.length > 3) {
                toast({ variant: 'destructive', title: 'Validation Error', description: 'You can upload up to 3 photos.' });
                setIsSubmitting(false);
                return;
            }
            for (const file of photoFiles) {
                if (file.size > MAX_FILE_SIZE) {
                    toast({ variant: 'destructive', title: 'Validation Error', description: `Max file size is 5MB.` });
                    setIsSubmitting(false);
                    return;
                }
                if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                    toast({ variant: 'destructive', title: 'Validation Error', description: '.jpg, .jpeg, .png and .webp files are accepted.' });
                    setIsSubmitting(false);
                    return;
                }
            }

            const photoURLs = await Promise.all(
                photoFiles.map(async (file) => {
                    const photoId = uuidv4();
                    const storageRef = ref(storage, `consoles/${values.userId}/${photoId}-${file.name}`);
                    await uploadBytes(storageRef, file);
                    const downloadURL = await getDownloadURL(storageRef);
                    return downloadURL;
                })
            );

            const { photos, ...consoleData } = values;
            await addDoc(collection(db, 'consoles'), {
                ...consoleData,
                photos: photoURLs,
                status: 'Pending',
                submittedAt: serverTimestamp(),
            });

            toast({ title: 'Success', description: 'Console has been submitted for repair.' });
            form.reset();
            router.push('/admin');

        } catch (error: any) {
             if (error.code === 'storage/unauthorized') {
                toast({
                    variant: 'destructive',
                    title: 'Storage Permission Error',
                    description: 'You do not have permission to upload files. Please check your Firebase Storage security rules.'
                });
            } else {
                toast({ variant: 'destructive', title: 'Submission Error', description: error.message || 'An unexpected error occurred.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const photoRef = form.register("photos");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add a New Console for a User</CardTitle>
                <CardDescription>Fill out the details below to create a repair ticket on behalf of a user.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                         <FormField control={form.control} name="userId" render={({ field }) => (
                            <FormItem><FormLabel>User</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a user" /></SelectTrigger></FormControl><SelectContent>
                                {users.map(user => (
                                    <SelectItem key={user.uid} value={user.uid}>{user.email}</SelectItem>
                                ))}
                            </SelectContent></Select><FormMessage /></FormItem>
                        )} />

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
                            <FormItem><FormLabel>Issue Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select the main issue" /></SelectTrigger></FormControl><SelectContent>
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
                             <FormItem><FormLabel>Past Repairs</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Has this console been repaired before?" /></SelectTrigger></FormControl><SelectContent>
                                <SelectItem value="No">No</SelectItem>
                                <SelectItem value="Yes">Yes</SelectItem>
                            </SelectContent></Select><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="photos" render={({ field }) => (
                            <FormItem><FormLabel>Upload Photos (Up to 3)</FormLabel><FormControl><Input type="file" multiple accept="image/*" {...photoRef} /></FormControl><FormMessage /></FormItem>
                        )} />

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit for Repair
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
