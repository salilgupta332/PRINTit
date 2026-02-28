import { CheckCircle, Users, Zap, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Zap, value: "24hrs", label: "Average Delivery" },
  { icon: CheckCircle, value: "99.9%", label: "Quality Guarantee" },
  { icon: Globe, value: "100+", label: "Cities Covered" },
];

const reasons = [
  "No minimum order quantity",
  "Premium paper & ink quality",
  "Free pickup option available",
  "24/7 customer support",
  "Secure document handling",
  "Affordable pricing for all",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">About PRINTit</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6 text-foreground">
              Printing Made Simple for Everyone
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              PRINTit bridges the gap between your digital documents and high-quality prints.
              Whether you're a student rushing to submit an assignment, a business preparing
              for a presentation, or anyone needing professional prints — we've got you covered.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reasons.map((reason) => (
                <div key={reason} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-card border border-border shadow-card text-center"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="font-display text-2xl font-bold text-card-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
