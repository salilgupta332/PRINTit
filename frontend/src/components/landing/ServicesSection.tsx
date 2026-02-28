import { FileText, BookOpen, Stamp, GraduationCap, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: BookOpen,
    title: "Notes Printing",
    description: "Print class notes, study material, and handouts in any format with premium quality.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "Assignment Support",
    description: "Get assignments printed from scratch or upload your own. Includes binding & front page.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Stamp,
    title: "Official Documents",
    description: "Legal papers, certificates, affidavits — professionally printed with confidentiality.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: FileText,
    title: "Exam Utilities",
    description: "Answer sheets, question papers, admit cards, and exam-related prints on demand.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Briefcase,
    title: "Business Printing",
    description: "Brochures, reports, presentations, invoices — everything your business needs.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Bulk Printing",
    description: "High-volume printing for events, organizations, and institutions at best rates.",
    color: "from-teal-500 to-cyan-500",
  },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Print Anything, Anytime
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Whether you're a student, professional, or business — we've got your printing covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/signup")}>
                  Get Started →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
