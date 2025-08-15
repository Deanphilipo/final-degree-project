
'use client';

import React from 'react';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { User, LogOut, Home, HelpCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { View } from '@/app/dashboard/_components/UserDashboardView';

interface DashboardSidebarProps {
    view: View;
    setView: (view: View) => void;
}

export function DashboardSidebar({ view, setView }: DashboardSidebarProps) {
  const { userProfile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/auth');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
            <div className="flex items-center gap-2 p-2 rounded-md bg-muted w-full mb-4">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col truncate">
                    <span className="text-sm font-semibold">USER ID</span>
                    <span className="text-xs text-muted-foreground truncate">{userProfile?.uid}</span>
                </div>
            </div>
            <Button variant={view === 'home' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setView('home')}>
                <Home className="h-4 w-4 mr-2"/>
                Home
            </Button>
            <Button variant={view === 'faq' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setView('faq')}>
                <HelpCircle className="h-4 w-4 mr-2"/>
                FAQ
            </Button>
            <Button variant={view === 'add' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setView('add')}>
                <Plus className="h-4 w-4 mr-2"/>
                Add Console
            </Button>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
