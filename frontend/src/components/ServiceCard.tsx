import { type LucideIcon } from "lucide-react";

interface ServiceItem {
  text: string;
}

interface ServiceCardProps {
  icon: LucideIcon;
  emoji: string;
  title: string;
  description: string;
  items: ServiceItem[];
  highlight?: string;
  badge?: string;
}

const ServiceCard = ({ icon: Icon, emoji, title, description, items, highlight, badge }: ServiceCardProps) => {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/50">
      {badge && (
        <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          {badge}
        </span>
      )}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            {item.text}
          </li>
        ))}
      </ul>

      {highlight && (
        <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-muted-foreground">
          👉 {highlight}
        </p>
      )}
    </div>
  );
};

export default ServiceCard;
