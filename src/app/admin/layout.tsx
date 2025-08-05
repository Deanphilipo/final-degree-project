'use client';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <div className="flex min-h-screen">
        <aside className="w-64 flex-col border-r bg-background p-4 flex">
            <DashboardSidebar />
        </aside>
        <div className="flex-1">
          {children}
        </div>
      </div>
  );
}
