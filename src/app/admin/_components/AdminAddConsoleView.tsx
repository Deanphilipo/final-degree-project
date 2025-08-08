import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminAddConsoleForm } from './AdminAddConsoleForm';

export function AdminAddConsoleView() {

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Add Console for User</h1>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
            <AdminAddConsoleForm />
        </div>
      </main>
    </div>
  );
}
