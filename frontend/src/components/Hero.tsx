import { ArrowRight, Printer, Zap, Shield } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden border-b border-border/30">
      {/* Background glow effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(252 70% 57% / 0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, hsl(280 60% 45% / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, hsl(252 70% 57% / 0.2) 0%, transparent 60%)",
        }}
      />

      <div className="container relative mx-auto px-4 py-28 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            India's #1 Academic Printing Platform
          </div>

          <h1
            className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your One-Stop{" "}
            <span className="bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Academic
            </span>{" "}
            Printing Solution
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            From assignments to project reports, notes to question papers — we handle everything so you can focus on what matters: your studies.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border px-8 text-base font-semibold text-foreground hover:bg-secondary"
            >
              View Services
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border/30 pt-10 max-w-xl mx-auto">
            {[
              { value: "10K+", label: "Students Served" },
              { value: "50K+", label: "Pages Printed" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-foreground md:text-3xl" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
