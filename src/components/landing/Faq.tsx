import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: "What consoles do you repair?",
    answer: "We repair all major consoles, including PlayStation 5, PlayStation 4, Xbox Series X/S, Xbox One, and Nintendo Switch."
  },
  {
    question: "How long does a repair take?",
    answer: "Most repairs are completed within 3-5 business days after we receive the console. More complex issues might take longer, but we will keep you updated."
  },
  {
    question: "Is there a warranty on repairs?",
    answer: "Yes, we offer a 3-month warranty on all parts and labor for the specific repair we performed."
  },
  {
    question: "How do I send my console to you?",
    answer: "After you submit a repair request through our website, you will receive detailed instructions on how to safely package and ship your console to our repair center."
  },
  {
    question: "Can I track the status of my repair?",
    answer: "Absolutely. Once you create an account and submit your console, you can log in to your dashboard to see the real-time status of your repair."
  }
];

export function Faq() {
  return (
    <section id="faq" className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.question}</AccordionTrigger>

                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
