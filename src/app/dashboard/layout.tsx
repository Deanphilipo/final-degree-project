
'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import type { View } from './_components/UserDashboardView';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [view, setView] = useState<View>('home');

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
        // @ts-ignore
      return React.cloneElement(child, { view, setView });
    }
    return child;
  });

  return (
      <div className="flex min-h-screen">
        <aside className="w-64 flex-col border-r bg-background p-4 flex">
            <DashboardSidebar view={view} setView={setView} />
        </aside>
        <div className="flex-1">
          {children}
        </div>
      </div>
  );
}
