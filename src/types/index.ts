import type { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  name?: string | null;
  role: 'user' | 'admin';
}

export interface Console {
  id: string;
  userId: string;
  consoleType: string;
  serialNumber: string;
  color: string;
  storageCapacity: number;
  issueType: string;
  additionalNotes?: string;
  pastRepairs: 'Yes' | 'No';
  status: 'Pending' | 'In Progress' | 'Awaiting Parts' | 'Fixed' | 'Cannot be Fixed' | 'Returned';
  submittedAt: Timestamp;
}

export interface AdminConsole extends Console {
  userEmail?: string;
}
