import {
  BookOpen,
  PenTool,
  AlignLeft,
  BarChart3,
  FileText,
  ClipboardList,
  BookMarked,
  Printer,
} from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Notes & Study Material Printing",
    description: "High-quality prints for all your study needs",
    items: ["Class notes printing", "Coaching material copies", "Chapter-wise printing", "Spiral binding available", "Custom cover page design"],
  },
  {
    icon: PenTool,
    title: "Assignment Writing",
    description: "End-to-end assignment support",
    badge: "High Demand",
    items: ["Written from scratch", "Partial completion support", "Editing & formatting", "Plagiarism check add-on", "Urgent delivery available", "Soft copy + printed copy"],
  },
  {
    icon: AlignLeft,
    title: "Assignment Formatting & Cleanup",
    description: "Polish your already-written content",
    highlight: "Low effort for you, professional results guaranteed",
    items: ["Margin fixing & alignment", "Font standardization", "Page numbering", "Front page creation"],
  },
  {
    icon: BarChart3,
    title: "Mini / Major Projects",
    description: "Complete project report solutions",
    items: ["Final year project reports", "Lab manuals preparation", "Case study reports", "Custom templates & formats", "Professional binding"],
  },
  {
    icon: FileText,
    title: "Internship & Training Reports",
    description: "Common requirement for Indian colleges",
    badge: "Popular",
    items: ["Internship report writing", "Internship report printing", "Hard binding included"],
  },
  {
    icon: ClipboardList,
    title: "Question Paper Printing",
    description: "For coaching institutes & teachers",
    items: ["Coaching institute papers", "Tuition teacher papers", "Private exam papers"],
  },
  {
    icon: BookMarked,
    title: "Previous Year Papers",
    description: "Ace your exams with past papers",
    badge: "Very Popular",
    items: ["University-wise collections", "Subject-wise bundles", "Neatly formatted & printed"],
  },
  {
    icon: Printer,
    title: "All Document Printing",
    description: "Any document, any format, any time",
    items: ["PDF / Word / PPT printing", "Color & B/W options", "A4 / A3 / Legal sizes", "Bulk printing discounts"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative border-b border-border/30">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, hsl(252 70% 57% / 0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, hsl(280 60% 45% / 0.1) 0%, transparent 50%)",
        }}
      />
      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Services</span>
          <h2
            className="mt-3 text-3xl font-bold text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Everything You Need Under One Roof
          </h2>
          <p className="mt-4 text-muted-foreground">
            From printing to writing, formatting to binding — we've got every academic need covered.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              {service.badge && (
                <span className="absolute -top-3 right-4 rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs font-semibold text-primary">
                  {service.badge}
                </span>
              )}

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold leading-tight text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  {service.title}
                </h3>
              </div>

              <p className="mb-3 text-sm text-muted-foreground">{service.description}</p>

              <ul className="flex-1 space-y-1.5">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/75">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>

              {service.highlight && (
                <p className="mt-4 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-medium text-primary">
                  👉 {service.highlight}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
