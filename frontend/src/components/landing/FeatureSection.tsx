import { Truck, Clock, IndianRupee, ShieldCheck, Headphones, FileCheck } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Express Delivery",
    description: "Get your prints delivered within 24 hours. Urgent orders processed in just 6 hours.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Student-friendly prices starting at just ₹1/page. Bulk discounts available.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Premium paper quality with professional binding and formatting standards.",
  },
  {
    icon: Truck,
    title: "Doorstep Delivery",
    description: "Free delivery across campus. Home delivery available at minimal charges.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Reach us anytime via WhatsApp, call, or chat. We're always here to help.",
  },
  {
    icon: FileCheck,
    title: "Plagiarism Free",
    description: "All assignments come with a plagiarism report. 100% original content guaranteed.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative border-b border-border/30">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(252 70% 57% / 0.1) 0%, transparent 50%)",
        }}
      />
      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Why Choose Us</span>
          <h2
            className="mt-3 text-3xl font-bold text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built for Students, by Students
          </h2>
          <p className="mt-4 text-muted-foreground">
            We understand the academic hustle. That's why every feature is designed to save your time and money.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
