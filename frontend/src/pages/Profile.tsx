import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Profile</h1>

      <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-card-foreground">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input defaultValue={user?.name} className="mt-1.5" />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue={user?.email} className="mt-1.5" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input placeholder="+91 98765 43210" className="mt-1.5" />
          </div>
          <div>
            <Label>City</Label>
            <Input placeholder="New Delhi" className="mt-1.5" />
          </div>
        </div>

        <Button variant="hero">Save Changes</Button>
      </div>
    </div>
  );
}
