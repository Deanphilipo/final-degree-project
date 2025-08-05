'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { auth } from '@/lib/firebase';

export function Header() {
  const { user, isAdmin, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Logo />
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/#home">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" asChild>
                <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href={"/admin"}>Admin</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
