import { Header } from '@/components/Header';
import { Hero } from '@/components/landing/Hero';
import { Advantages } from '@/components/landing/Advantages';
import { Services } from '@/components/landing/Services';
import { Testimonials } from '@/components/landing/Testimonials';
import { Faq } from '@/components/landing/Faq';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
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
