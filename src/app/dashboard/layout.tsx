
'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-screen">
        <aside className="w-60 flex-col border-r bg-background flex">
            {/* The sidebar is now part of the page and will be rendered by children */}
        </aside>
        <div className="flex-1">
          {children}
        </div>
      </div>
  );
}
