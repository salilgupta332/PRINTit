import { useLocation } from "react-router-dom";
import { Printer, HelpCircle, Settings } from "lucide-react";

const serviceInfo: Record<string, { title: string; description: string }> = {
  notes: { title: "Notes Printing", description: "Upload your study notes, class materials, or handouts for professional printing." },
  "official-docs": { title: "Official Document Services", description: "Print legal papers, certificates, affidavits, and other official documents." },
  "exam-utilities": { title: "Exam Utilities", description: "Print answer sheets, question papers, admit cards, and exam prep materials." },
  business: { title: "Business Printing", description: "Professional printing for brochures, reports, presentations, and business documents." },
  bulk: { title: "Bulk Printing", description: "High-volume printing solutions for events, organizations, and institutions." },
  help: { title: "Help & Support", description: "Need assistance? We're here to help you with your printing needs." },
  settings: { title: "Settings", description: "Manage your account settings and preferences." },
};

export default function ServicePage() {
  const location = useLocation();
  const segment = location.pathname.split("/dashboard/")[1] || "";
  const info = serviceInfo[segment] || { title: "Service", description: "Service coming soon." };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Printer className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{info.title}</h1>
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 shadow-card text-center">
        <Printer className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="font-display text-xl font-semibold text-card-foreground mb-2">Coming Soon</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          We're building this service form. It will work just like the Assignment Support form with step-by-step details, print preferences, and delivery options.
        </p>
      </div>
    </div>
  );
}
