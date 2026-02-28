import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What file formats does PRINTit accept?",
    a: "We accept PDF, DOCX, DOC, JPG, PNG, and PPTX files. For best results, we recommend uploading documents in PDF format to ensure formatting is preserved exactly as intended.",
  },
  {
    q: "How fast can I get my documents delivered?",
    a: "Standard delivery takes 2–3 business days. We also offer express delivery (same-day or next-day) for urgent orders. Delivery times may vary by location and order volume.",
  },
  {
    q: "Can I get my assignment written from scratch?",
    a: "Yes! Our 'From Scratch' service lets you provide the topic, requirements, and guidelines. Our team will create the content, format it, print it, and deliver it to your doorstep.",
  },
  {
    q: "What printing and binding options are available?",
    a: "We offer Black & White and Color printing on A4 or A3 paper (Normal or Premium quality). Binding options include Spiral, Staple, and Hard Binding. You can also request a custom front page.",
  },
  {
    q: "Is there a minimum order quantity?",
    a: "No! You can order even a single copy. For bulk orders (50+ copies), we offer special discounted pricing. Contact us for a custom quote on large volumes.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is confirmed, you'll receive real-time status updates on your dashboard. You can track every stage — from processing to printing to out-for-delivery.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI, credit/debit cards, net banking, and popular wallets. All payments are processed securely. Cash on delivery is also available in select areas.",
  },
  {
    q: "Can businesses use PRINTit for bulk printing?",
    a: "Absolutely! We serve businesses of all sizes for brochures, invoices, catalogs, reports, and more. Our bulk printing service offers competitive pricing with consistent quality.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-5 bg-card shadow-sm data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-card-foreground font-medium hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
