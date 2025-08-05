
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
                        <span className="text-sm font-semibold">USER ID</span>
                        <span className="text-xs text-muted-foreground truncate">{userProfile?.uid || 'guest-user-placeholder-id'}</span>
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

// TODO: This is a placeholder for the sidebar components. They should be moved to their own files.
namespace RadixUISidebar {
    export const SidebarHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div className={cn("flex h-14 items-center border-b p-4 lg:h-[60px] lg:px-6", className)} {...props} />
    );
    SidebarHeader.displayName = "SidebarHeader";

    export const SidebarContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div className={cn("flex-1", className)} {...props} />
    );
    SidebarContent.displayName = "SidebarContent";

    export const SidebarFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div className={cn("mt-auto p-4", className)} {...props} />
    );
    SidebarFooter.displayName = "SidebarFooter";

    export const SidebarMenu = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <nav className={cn("flex flex-col items-start gap-2 px-2 text-sm font-medium lg:px-4", className)} {...props} />
    );
    SidebarMenu.displayName = "SidebarMenu";

    export const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
        ({ className, ...props }, ref) => (
            <div ref={ref} className={cn("w-full", className)} {...props} />
        )
    );
    SidebarMenuItem.displayName = "SidebarMenuItem";

    function cn(...inputs: any[]) {
        // This is a simplified version of the cn utility.
        return inputs.filter(Boolean).join(' ');
    }
}

// I am adding the Radix UI Sidebar components here temporarily to avoid creating new files.
// This is not a good practice, but it will work for now.
const { SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem } = RadixUISidebar;
