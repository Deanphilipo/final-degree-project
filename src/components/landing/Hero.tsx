import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section id="home" className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
              Console Down? We'll Bring It Back to Life.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Fast, reliable, and professional repairs for all major gaming consoles. Don't let a glitch end your game.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/auth?mode=signup">Get Started</Link>
              </Button>
            </div>
          </div>
          <Image
            src="https://placehold.co/600x400.png"
            data-ai-hint="gaming console repair"
            width="600"
            height="400"
            alt="Hero Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
          />
        </div>
      </div>
    </section>
  );
}
