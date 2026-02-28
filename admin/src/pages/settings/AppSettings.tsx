import React from "react";
import { Bell, Lock, UserCheck, Settings2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const PageShell = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">{title}</h1><p className="text-muted-foreground">{description}</p></div>
    {children}
  </div>
);

export const NotificationSettings = () => {
  const { toast } = useToast();
  const items = [
    { label: "New Order Alerts", desc: "Get notified for every new order" },
    { label: "Payment Confirmations", desc: "Alerts when payment is received" },
    { label: "Order Completion", desc: "Notify when an order is completed" },
    { label: "Customer Messages", desc: "Notify on new customer messages" },
    { label: "Daily Summary Email", desc: "Receive daily report via email" },
    { label: "Low Stock Alerts", desc: "Alert when supplies are running low" },
  ];
  return (
    <PageShell title="Notification Settings" description="Configure how you receive alerts and updates">
      <Card className="max-w-xl">
        <CardContent className="divide-y divide-border pt-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-4">
              <div><p className="font-medium text-sm">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
              <Switch defaultChecked={true} />
            </div>
          ))}
          <div className="pt-4"><Button className="gap-2" onClick={() => toast({ title: "Saved!" })}><Save size={14} />Save Preferences</Button></div>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export const SecuritySettings = () => {
  const { toast } = useToast();
  return (
    <PageShell title="Security Settings" description="Manage your password and security preferences">
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="flex items-center gap-2"><Lock size={16} />Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Current Password</Label><Input type="password" placeholder="••••••••" /></div>
          <div className="space-y-2"><Label>New Password</Label><Input type="password" placeholder="••••••••" /></div>
          <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" placeholder="••••••••" /></div>
          <Button className="gap-2" onClick={() => toast({ title: "Password Updated!" })}><Save size={14} />Update Password</Button>
        </CardContent>
      </Card>
      <Card className="max-w-lg">
        <CardHeader><CardTitle>Two-Factor Authentication</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-between">
          <div><p className="font-medium">Enable 2FA</p><p className="text-sm text-muted-foreground">Add an extra layer of security</p></div>
          <Switch />
        </CardContent>
      </Card>
    </PageShell>
  );
};

export const AccountSettings = () => {
  const { toast } = useToast();
  return (
    <PageShell title="Account Settings" description="Manage your admin account details">
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="flex items-center gap-2"><UserCheck size={16} />Account Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>First Name</Label><Input defaultValue="Shop" /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Admin" /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input defaultValue="admin@printit.com" /></div>
          <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+91 9876543210" /></div>
          <Button className="gap-2" onClick={() => toast({ title: "Account Updated!" })}><Save size={14} />Save Changes</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export const Preferences = () => {
  const { toast } = useToast();
  return (
    <PageShell title="Preferences" description="Customize your dashboard experience">
      <Card className="max-w-lg">
        <CardContent className="divide-y divide-border pt-6">
          {[
            { label: "Compact Sidebar", desc: "Show sidebar in compact icon mode by default" },
            { label: "Auto-refresh Dashboard", desc: "Refresh stats every 30 seconds" },
            { label: "Show Revenue in Dashboard", desc: "Display revenue figures on main dashboard" },
            { label: "Sound Notifications", desc: "Play a sound for new orders" },
          ].map((p) => (
            <div key={p.label} className="flex items-center justify-between py-4">
              <div><p className="font-medium text-sm">{p.label}</p><p className="text-xs text-muted-foreground">{p.desc}</p></div>
              <Switch defaultChecked />
            </div>
          ))}
          <div className="pt-4"><Button className="gap-2" onClick={() => toast({ title: "Preferences Saved!" })}><Save size={14} />Save</Button></div>
        </CardContent>
      </Card>
    </PageShell>
  );
};
