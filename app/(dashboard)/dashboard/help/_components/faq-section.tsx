import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI Tutor scan my Library files?",
    answer: "AuraStudy utilizes an advanced OCR and context-embedding pipeline. When you upload a PDF or document, it shreds the text into vectorized fragments. When you ask the AI Tutor a question, it retrieves only the most mathematically relevant pieces of your own coursework to generate answers, ensuring no hallucination from outside sources."
  },
  {
    question: "How is 'Efficiency' and 'Retention Rate' calculated?",
    answer: "Your Retention Rate metric in the Analytics dashboard is derived from active recall sessions. During a session, if you correctly answer flashcards or AI-generated prompts without peeking, the algorithm raises your efficiency score for that specific subject."
  },
  {
    question: "Can I reset my learning progress?",
    answer: "Yes. Navigate to Account Settings (click your avatar at the bottom left) and look under the Danger Zone. Resetting learning progress will wipe your flashcard history and area analytics, but will preserve your Library uploads and Subject definitions."
  },
  {
    question: "What is a 'Deep Work' segment?",
    answer: "Deep Work segments are tracked intervals where you are actively studying without interruption. AuraStudy calculates this by cross-referencing your active session timer with continuous interaction metrics."
  }
];

export function FaqSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 block">
        <h2 className="text-xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-sm text-muted-foreground">Quick answers to common platform mechanics.</p>
      </div>

      <Accordion type="single" collapsible className="w-full bg-card border border-border/50 rounded-2xl p-2 shadow-sm">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-border/50 px-4">
            <AccordionTrigger className="text-left font-semibold text-sm hover:text-primary transition-colors py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5 pr-8">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
