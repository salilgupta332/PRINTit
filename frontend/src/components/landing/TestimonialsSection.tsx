import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "B.Tech Student",
    avatar: "PS",
    rating: 5,
    text: "PRINTit saved me during my final semester! I uploaded my thesis at midnight and got it delivered with hard binding by morning. Absolute lifesaver!",
  },
  {
    name: "Rajesh Mehta",
    role: "Business Owner",
    avatar: "RM",
    rating: 5,
    text: "We use PRINTit for all our bulk printing needs — brochures, invoices, and catalogs. The quality is consistent and delivery is always on time.",
  },
  {
    name: "Ananya Gupta",
    role: "Law Student",
    avatar: "AG",
    rating: 4,
    text: "Getting legal documents printed with proper formatting used to be a hassle. PRINTit handles everything perfectly, even spiral binding for case files.",
  },
  {
    name: "Vikram Singh",
    role: "Government Employee",
    avatar: "VS",
    rating: 5,
    text: "I needed certified document copies urgently. PRINTit's express delivery got them to me the same day. Highly recommended for official work!",
  },
  {
    name: "Sneha Patel",
    role: "Freelance Designer",
    avatar: "SP",
    rating: 5,
    text: "The color printing quality is top-notch. I print my portfolio and client presentations here. The premium paper option makes a real difference.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  // Show 3 on desktop, 1 on mobile
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(current + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thousands of students, professionals, and businesses trust PRINTit for their printing needs.
          </p>
        </div>

        {/* Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {getVisible().map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className={cn(
                  "bg-card border border-border rounded-2xl p-6 shadow-sm transition-all duration-300",
                  i === 1 && "md:scale-105 md:shadow-lg md:border-primary/30"
                )}
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-card-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={cn(
                        "h-4 w-4",
                        si < t.rating ? "text-primary fill-primary" : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors my-auto",
                  i === current ? "bg-primary" : "bg-muted-foreground/30"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
