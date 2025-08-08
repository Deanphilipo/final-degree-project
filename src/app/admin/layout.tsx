'use client';

import React, { useState } from 'react';
import { AdminDashboardSidebar } from '@/components/dashboard/AdminDashboardSidebar';

export type AdminView = 'home' | 'add';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [view, setView] = useState<AdminView>('home');

  return (
      <div className="flex min-h-screen">
        <aside className="w-64 flex-col border-r bg-background p-4 flex">
            <AdminDashboardSidebar view={view} setView={setView} />
        </aside>
        <div className="flex-1">
          {children}
        </div>
      </div>
  );
}
