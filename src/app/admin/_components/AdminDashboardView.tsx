'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminConsoleList } from './AdminConsoleList';

export default function AdminDashboardView() {

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>All Console Repairs</CardTitle>
                    <CardDescription>View, manage, and update the status of all submitted repairs.</CardDescription>
                </CardHeader>
            </Card>
            <AdminConsoleList />
        </div>
      </main>
    </div>
  );
}
