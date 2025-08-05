import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Gamepad2 className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight">RebootZone</span>
    </Link>
  );
}
