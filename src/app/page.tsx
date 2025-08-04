import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/landing/Hero';
import { Advantages } from '@/components/landing/Advantages';
import { Services } from '@/components/landing/Services';
import { Faq } from '@/components/landing/Faq';
import { Testimonials } from '@/components/landing/Testimonials';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Advantages />
        <Services />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
