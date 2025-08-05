
'use client';

import { Logo } from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export function DashboardSidebar() {
  const { userProfile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/auth');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 items-center border-b p-4 lg:h-[60px] lg:px-6">
        <Logo />
      </div>
      <div className="flex-1">
        <ul className="flex flex-col items-start gap-2 px-2 text-sm font-medium lg:px-4 py-4">
            <li className="w-full">
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted w-full">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col truncate">
                        <span className="text-sm font-semibold">USER ID</span>
                        <span className="text-xs text-muted-foreground truncate">{userProfile?.uid || 'guest-user-placeholder-id'}</span>
                    </div>
                </div>
            </li>
        </ul>
      </div>
      <div className="mt-auto p-4">
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
