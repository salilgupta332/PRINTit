import { Upload, Settings, CreditCard, Truck, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Easy Document Upload",
    description: "Upload PDF, DOCX, images — any format. Our system handles it all seamlessly.",
  },
  {
    icon: Settings,
    title: "Custom Print Options",
    description: "Choose paper size, quality, binding, color/B&W, and more to match your needs.",
  },
  {
    icon: CreditCard,
    title: "Secure Online Payment",
    description: "Pay safely via UPI, cards, net banking, or wallets. 100% secure transactions.",
  },
  {
    icon: Truck,
    title: "Home Delivery & Pickup",
    description: "Get prints delivered to your door or pick them up from a nearby center.",
  },
  {
    icon: Shield,
    title: "Data Privacy & Security",
    description: "Your documents are encrypted and auto-deleted after printing. Full confidentiality.",
  },
  {
    icon: Clock,
    title: "Real-Time Order Tracking",
    description: "Track your order from upload to delivery with live status updates.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why PRINTit?</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Everything You Need to Print Smarter
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A complete printing solution designed for everyone — students, professionals, and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
