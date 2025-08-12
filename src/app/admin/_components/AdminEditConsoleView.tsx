
'use client';
import { AdminEditConsoleForm } from './AdminEditConsoleForm';

export function AdminEditConsoleView({ consoleId }: { consoleId: string }) {

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Edit Console</h1>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
            <AdminEditConsoleForm consoleId={consoleId} />
        </div>
      </main>
    </div>
  );
}
