import { Wrench, Zap, Shield, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Wrench className="h-8 w-8 text-blue-500" />,
    title: 'Expert Technicians',
    description: 'Our certified technicians have years of experience fixing every issue imaginable.',
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: 'Fast Turnaround',
    description: 'We know you want to get back to gaming. We offer rapid repair times to minimize downtime.',
  },
  {
    icon: <Shield className="h-8 w-8 text-red-500" />,
    title: '3-Month Warranty',
    description: 'We stand by our work. All our repairs come with a comprehensive 3-month warranty.',
  },
  {
    icon: <Landmark className="h-8 w-8 text-blue-500" />,
    title: 'Clear Communication',
    description: 'Stay updated on your repair status every step of the way through your personal dashboard.',
  },
];

export function Advantages() {
  return (
    <section id="about" className="py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose Us?</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We are dedicated to providing the best console repair service with a focus on quality, speed, and customer satisfaction.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
