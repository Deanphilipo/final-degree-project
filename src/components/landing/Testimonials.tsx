'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: "John D.",
    avatar: "JD",
    text: "My PS5's HDMI port was busted. FixMyConsole had it fixed and back to me in less than a week. Incredible service!"
  },
  {
    name: "Sarah K.",
    avatar: "SK",
    text: "The fan on my Xbox was so loud, I thought it was going to take off. Now it's whisper quiet. Thanks, guys!"
  },
  {
    name: "Mike R.",
    avatar: "MR",
    text: "I thought my launch-day Switch was a goner. They brought it back from the dead. Highly recommend their service."
  },
  {
    name: "Emily W.",
    avatar: "EW",
    text: "The online tracking was super helpful. I always knew what was happening with my repair. Great communication!"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What Our Customers Say</h2>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="flex flex-col items-center text-center justify-center p-6">
                        <p className="italic text-muted-foreground">"{testimonial.text}"</p>
                        <div className="mt-4 flex items-center gap-2">
                           <Avatar>
                            <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.avatar}`} />
                            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                          </Avatar>
                          <p className="font-semibold">{testimonial.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
