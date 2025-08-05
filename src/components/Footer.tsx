import { Logo } from './Logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-shrink-0">
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Your trusted partner in console repair.
            </p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Company</h3>
              <Link href="/#about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
              <Link href="/#services" className="text-sm text-muted-foreground hover:text-foreground">Services</Link>
              <Link href="/#testimonials" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Support</h3>
              <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link>
              <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Track Repair</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RebootZone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
