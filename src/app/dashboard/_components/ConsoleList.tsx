
'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import type { Console } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';

export function ConsoleList() {
  const { user } = useAuth();
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Since auth is disabled for viewing, let's load all consoles for demo purposes
      setLoading(true);
      const q = query(collection(db, 'consoles'), orderBy('submittedAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userConsoles: Console[] = [];
        querySnapshot.forEach((doc) => {
          userConsoles.push({ id: doc.id, ...doc.data() } as Console);
        });
        setConsoles(userConsoles);
        setLoading(false);
      });
       return () => unsubscribe();
    } else {
        setLoading(true);
        const q = query(collection(db, 'consoles'), where('userId', '==', user.uid), orderBy('submittedAt', 'desc'));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const userConsoles: Console[] = [];
          querySnapshot.forEach((doc) => {
            userConsoles.push({ id: doc.id, ...doc.data() } as Console);
          });
          setConsoles(userConsoles);
          setLoading(false);
        });

        return () => unsubscribe();
    }
  }, [user]);

  const getStatusVariant = (status: Console['status']): "default" | "secondary" | "destructive" => {
    switch (status) {
      case 'Fixed':
      case 'Returned':
        return 'default';
      case 'Pending':
      case 'In Progress':
        return 'secondary';
       case 'Cannot be Fixed':
        return 'destructive';
      default:
        return 'secondary';
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

  if (consoles.length === 0) {
    return (
        <div className="text-center p-8 border rounded-lg bg-card">
            <h3 className="text-xl font-semibold">No Consoles Submitted</h3>
            <p className="text-muted-foreground mt-2">Click the 'Add Console' button to submit your first repair.</p>
        </div>
    );
  }

  return (
    <div className="border rounded-lg">
        <TooltipProvider>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Console</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Past Repairs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Date Submitted</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {consoles.map((c) => (
                    <TableRow key={c.id}>
                        <TableCell>
                          <div className="font-medium">{c.consoleType}</div>
                          <div className="text-xs text-muted-foreground">{c.color} - {c.storageCapacity}GB</div>
                        </TableCell>
                        <TableCell>{c.serialNumber}</TableCell>
                        <TableCell>
                            <Tooltip>
                                <TooltipTrigger>
                                    <p className="truncate max-w-xs">{c.issueType}</p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p><strong>Issue:</strong> {c.issueType}</p>
                                    {c.additionalNotes && <p><strong>Notes:</strong> {c.additionalNotes}</p>}
                                </TooltipContent>
                            </Tooltip>
                        </TableCell>
                        <TableCell>{c.pastRepairs}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(c.status)}>{c.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {c.submittedAt ? new Date(c.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TooltipProvider>
    </div>
  );
}

