import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: LucideIcon;
  variant: "blue" | "green" | "orange" | "purple";
}

const variantClasses: Record<string, string> = {
  blue: "stat-card-blue",
  green: "stat-card-green",
  orange: "stat-card-orange",
  purple: "stat-card-purple",
};

const iconBgClasses: Record<string, string> = {
  blue: "bg-stat-blue/15 text-stat-blue",
  green: "bg-stat-green/15 text-stat-green",
  orange: "bg-stat-orange/15 text-stat-orange",
  purple: "bg-stat-purple/15 text-stat-purple",
};

export function StatCard({ title, value, change, changeType, icon: Icon, variant }: StatCardProps) {
  return (
    <div className={cn("rounded-xl p-5 bg-card", variantClasses[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          <p className={cn("text-xs mt-2 font-medium", changeType === "up" ? "text-stat-green" : "text-destructive")}>
            {changeType === "up" ? "↑" : "↓"} {change} from last month
          </p>
        </div>
        <div className={cn("p-3 rounded-xl", iconBgClasses[variant])}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
