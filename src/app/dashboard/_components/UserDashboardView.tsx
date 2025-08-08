
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddConsoleForm } from './AddConsoleForm';
import { ConsoleList } from './ConsoleList';
import { Faq } from '@/components/landing/Faq';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export type View = 'home' | 'add' | 'faq';

export default function UserDashboardView() {
  const { userProfile } = useAuth();
  const [view, setView] = useState<View>('home');
  
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
    <div className="flex h-full">
        <aside className="w-60 flex-col border-r bg-background flex">
           <DashboardSidebar view={view} setView={setView} />
        </aside>
        <div className="flex-1 flex flex-col">
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
    </div>
  );
}
