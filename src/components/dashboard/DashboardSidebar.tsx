'use client';

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DashboardSidebar() {
  const { userProfile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/auth');
  };

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col truncate">
                        <span className="text-sm font-semibold">User ID</span>
                        <span className="text-xs text-muted-foreground truncate">{userProfile?.uid || 'guest-user'}</span>
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </>
  );
}
