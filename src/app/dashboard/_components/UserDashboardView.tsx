
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddConsoleForm } from './AddConsoleForm';
import { ConsoleList } from './ConsoleList';
import { Faq } from '@/components/landing/Faq';

export type View = 'home' | 'add' | 'faq';

interface UserDashboardViewProps {
    view: View;
    setView: (view: View) => void;
}

export default function UserDashboardView({ view, setView }: UserDashboardViewProps) {
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
