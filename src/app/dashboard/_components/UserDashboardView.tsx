
'use client';

import { useState } from 'react';
import { Plus, Home, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddConsoleForm } from './AddConsoleForm';
import { ConsoleList } from './ConsoleList';
import { Faq } from '@/components/landing/Faq';
import { Button } from '@/components/ui/button';

type View = 'home' | 'add' | 'faq';

export default function UserDashboardView() {
  const [view, setView] = useState<View>('home');
  const { userProfile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/auth');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <ConsoleList />;
      case 'add':
        return <AddConsoleForm onFormSubmit={() => setView('home')} />;
      case 'faq':
        return <div className="p-4 md:p-6"><Faq /></div>;
      default:
        return <ConsoleList />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <nav className="ml-auto flex items-center gap-2">
            <Button variant={view === 'home' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('home')}>
                <Home className="h-4 w-4 mr-2"/>
                Home
            </Button>
            <Button variant={view === 'faq' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('faq')}>
                <HelpCircle className="h-4 w-4 mr-2"/>
                FAQ
            </Button>
            <Button variant={view === 'add' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('add')}>
                <Plus className="h-4 w-4 mr-2"/>
                Add Console
            </Button>
             <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2"/>
                Logout
            </Button>
        </nav>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
            {view === 'home' && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Welcome, {userProfile?.email || 'User'}!</CardTitle>
                        <CardDescription>Here are your submitted console repairs. You can add a new one or check the status of existing repairs.</CardDescription>
                    </CardHeader>
                </Card>
            )}
            {renderView()}
        </div>
      </main>
    </div>
  );
}
