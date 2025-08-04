'use client';

import { useState } from 'react';
import { Plus, Home, HelpCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddConsoleForm } from './AddConsoleForm';
import { ConsoleList } from './ConsoleList';
import { Faq } from '@/components/landing/Faq';

type View = 'home' | 'add' | 'faq';

export default function UserDashboardView() {
  const [view, setView] = useState<View>('home');
  const { userProfile } = useAuth();

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
            <button onClick={() => setView('home')} className={`p-2 rounded-md ${view === 'home' ? 'bg-muted' : ''}`}><Home className="h-5 w-5"/></button>
            <button onClick={() => setView('faq')} className={`p-2 rounded-md ${view === 'faq' ? 'bg-muted' : ''}`}><HelpCircle className="h-5 w-5"/></button>
            <button onClick={() => setView('add')} className={`p-2 rounded-md ${view === 'add' ? 'bg-muted' : ''}`}><Plus className="h-5 w-5"/></button>
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
