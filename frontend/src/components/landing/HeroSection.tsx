import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload, Printer, Truck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="text-xs font-semibold text-primary">🚀 India's Smartest Printing Platform</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-foreground leading-tight">
            Upload. Print.{" "}
            <span className="text-gradient">Deliver.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            From assignments to legal documents — upload your files, choose your preferences,
            and get premium prints delivered to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="hero" size="lg" className="text-base px-8" onClick={() => navigate("/signup")}>
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("#services")}>
              Explore Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { icon: Upload, label: "Documents Printed", value: "50K+" },
              { icon: Printer, label: "Print Options", value: "20+" },
              { icon: Truck, label: "Cities Served", value: "100+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs text-primary-foreground/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
