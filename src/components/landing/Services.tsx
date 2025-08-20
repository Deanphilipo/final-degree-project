import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    title: "HDMI Port Repair",
    description: "No signal on your TV? We can replace your console's faulty HDMI port.",
    image: "/images/hdmi.png",
    hint: "hdmi port"
  },
  {
    title: "Overheating Issues",
    description: "If your console is shutting down unexpectedly, we'll clean and fix its cooling system.",
    image: "/images/heat.png",
    hint: "console fan"
  },
  {
    title: "Disk Drive Problems",
    description: "Games not reading? We can repair or replace your console's Blu-ray or DVD drive.",
    image: "/images/xeptlio1.png",
    hint: "game disc"
  },
  {
    title: "Power Supply Failure",
    description: "Console not turning on at all? We'll diagnose and replace the internal power supply.",
    image: "/images/power.png",
    hint: "power cord"
  },
  {
    title: "Controller Repair",
    description: "Stick drift, broken buttons, or connection issues? We fix controllers too!",
    image: "/images/controler.png",
    hint: "game controller"
  },
  {
    title: "Software & OS Issues",
    description: "Stuck in a boot loop or facing system errors? We can resolve software-related problems.",
    image: "/images/ynmtuqg2.png",
    hint: "error screen"
  },
];

export function Services() {
  return (
    <section id="services" className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Our Repair Services</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We handle a wide range of hardware and software issues for all major consoles.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <Image
                src={service.image}
                data-ai-hint={service.hint}
                width={400}
                height={300}
                alt={service.title}
                className="aspect-video w-full object-cover"
              />
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
