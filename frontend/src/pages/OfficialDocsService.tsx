import { useNavigate } from "react-router-dom";
import { CreditCard, FileText, Vote, Car } from "lucide-react";
import { cn } from "@/lib/utils";
/**
 * Official Document Printing – Card Selection Page
 * 
 * Displays interactive service cards with glowing borders.
 * Each card navigates to the respective document printing form.
 * 
 * Available services:
 * - Aadhaar Card Print
 * - PAN Card Print
 * - Voter ID Print (Future)
 * - Driving License Print (Future)
 * 
 * Add future document services as new cards here.
 */
interface ServiceCard {
  icon: React.ElementType;
  title: string;
  description: string;
  path: string;
  available: boolean;
}
const services: ServiceCard[] = [
  {
    icon: CreditCard,
    title: "Aadhaar Card Print",
    description: "Print your Aadhaar card on normal paper or PVC card with lamination options.",
    path: "/dashboard/official-docs/aadhaar",
    available: true,
  },
  {
    icon: FileText,
    title: "PAN Card Print",
    description: "Get your PAN card printed in color or on a premium PVC card.",
    path: "/dashboard/official-docs/pan",
    available: true,
  },
  {
    icon: Vote,
    title: "Voter ID Print",
    description: "Print your Voter ID card with high-quality output.",
    path: "/dashboard/official-docs/voter-id",
    available: false,
  },
  {
    icon: Car,
    title: "Driving License Print",
    description: "Print your Driving License on paper or PVC card.",
    path: "/dashboard/official-docs/driving-license",
    available: false,
  },
];
export default function OfficialDocsService() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Official Document Printing</h1>
        <p className="text-muted-foreground mt-1">Select a document type to get started</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <button
            key={service.title}
            onClick={() => service.available && navigate(service.path)}
            disabled={!service.available}
            className={cn(
              "group relative rounded-xl border p-6 text-left transition-all duration-300",
              "bg-card hover:shadow-lg",
              service.available
                ? "cursor-pointer border-primary/30 hover:border-primary shadow-[0_0_15px_hsl(var(--primary)/0.15)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]"
                : "cursor-not-allowed opacity-60 border-border"
            )}
          >
            {/* Glowing border effect */}
            {service.available && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}
            <div className="relative z-10">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                service.available
                  ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              {!service.available && (
                <span className="inline-block mt-3 text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Coming Soon
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
