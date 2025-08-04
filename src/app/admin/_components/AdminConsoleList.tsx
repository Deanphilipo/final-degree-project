'use client';

import { useEffect, useState, useTransition } from 'react';
import { collection, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AdminConsole, Console, UserProfile } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Bot } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Status = Console['status'];

const statuses: Status[] = ['Pending', 'In Progress', 'Awaiting Parts', 'Fixed', 'Cannot be Fixed', 'Returned'];

export function AdminConsoleList() {
  const [consoles, setConsoles] = useState<AdminConsole[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'consoles'), orderBy('submittedAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const allConsoles: Console[] = [];
      querySnapshot.forEach((doc) => {
        allConsoles.push({ id: doc.id, ...doc.data() } as Console);
      });

      // Fetch user emails
      const userIds = [...new Set(allConsoles.map(c => c.userId))];
      const userDocs = await Promise.all(userIds.map(id => getDoc(doc(db, 'users', id))));
      const userMap = new Map<string, string>();
      userDocs.forEach(userDoc => {
          if(userDoc.exists()) {
              const userData = userDoc.data() as UserProfile;
              userMap.set(userData.uid, userData.email || 'N/A');
          }
      });
      
      const consolesWithEmails = allConsoles.map(c => ({
          ...c,
          userEmail: userMap.get(c.userId) || 'N/A',
      }))

      setConsoles(consolesWithEmails);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = (consoleId: string, newStatus: Status) => {
      startTransition(async () => {
          const consoleRef = doc(db, 'consoles', consoleId);
          try {
              await updateDoc(consoleRef, { status: newStatus });
              toast({ title: 'Success', description: 'Status updated successfully.'});
          } catch (error: any) {
              toast({ variant: 'destructive', title: 'Error', description: 'Failed to update status.' });
          }
      });
  }

  const handleDelete = (consoleId: string) => {
      startTransition(async () => {
          const consoleRef = doc(db, 'consoles', consoleId);
          try {
              await deleteDoc(consoleRef);
              toast({ title: 'Success', description: 'Console record deleted.'});
          } catch (error) {
              toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete record.' });
          }
      })
  }

  const getStatusVariant = (status: Console['status']): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Fixed': return 'default';
      case 'Returned': return 'default';
      case 'Pending': return 'secondary';
      case 'In Progress': return 'secondary';
      case 'Cannot be Fixed': return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
    )
  }

  return (
    <div className="border rounded-lg">
        <TooltipProvider>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Console</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {consoles.map((c) => (
                    <TableRow key={c.id}>
                        <TableCell>
                            <div className="font-medium">{c.userEmail}</div>
                            <div className="text-xs text-muted-foreground">{c.userId}</div>
                        </TableCell>
                        <TableCell>
                            <div className="font-medium">{c.consoleType}</div>
                            <div className="text-xs text-muted-foreground">SN: {c.serialNumber}</div>
                        </TableCell>
                        <TableCell>
                             <Tooltip>
                                <TooltipTrigger>
                                    <p className="truncate max-w-xs">{c.issueType}</p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p><strong>Issue:</strong> {c.issueType}</p>
                                    {c.additionalNotes && <p><strong>Notes:</strong> {c.additionalNotes}</p>}
                                    {c.aiSummary && <p className="mt-2 pt-2 border-t"><strong><Bot className="inline h-4 w-4 mr-1"/>AI Summary:</strong> {c.aiSummary}</p>}
                                </TooltipContent>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            <Select onValueChange={(value: Status) => handleStatusChange(c.id, value)} defaultValue={c.status} disabled={isPending}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue>
                                        <Badge variant={getStatusVariant(c.status)}>{c.status}</Badge>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button variant="ghost" size="icon" disabled>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" disabled={isPending}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the console repair record.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(c.id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TooltipProvider>
    </div>
  );
}
