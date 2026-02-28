import React, { useState } from "react";
import { Store, Clock, Power, Palmtree, Save, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

export const GeneralInfo = () => {
  const { toast } = useToast();
  return (
    <PageShell title="Shop General Info" description="Manage your shop's basic information">
      <Card className="max-w-2xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><Store size={18} />Shop Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Shop Name</Label><Input defaultValue="PRINTit" /></div>
          <div className="space-y-2"><Label>Owner Name</Label><Input defaultValue="Shop Admin" /></div>
          <div className="space-y-2"><Label><MapPin size={14} className="inline mr-1" />Address</Label><Input defaultValue="123, Market Road, City - 400001" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label><Phone size={14} className="inline mr-1" />Phone</Label><Input defaultValue="+91 9876543210" /></div>
            <div className="space-y-2"><Label><Mail size={14} className="inline mr-1" />Email</Label><Input defaultValue="admin@printit.com" /></div>
          </div>
          <div className="space-y-2"><Label>GST Number</Label><Input defaultValue="27ABCDE1234F1Z5" /></div>
          <Button className="gap-2" onClick={() => toast({ title: "Saved!", description: "Shop info updated successfully." })}><Save size={14} />Save Changes</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export const WorkingHours = () => {
  const { toast } = useToast();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [hours] = useState(days.map((d) => ({ day: d, open: "09:00", close: "20:00", enabled: d !== "Sunday" })));
  return (
    <PageShell title="Working Hours" description="Set your shop's operating hours">
      <Card className="max-w-2xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><Clock size={18} />Schedule</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {hours.map((h) => (
            <div key={h.day} className="flex items-center gap-4 rounded-lg border border-border p-3">
              <Switch defaultChecked={h.enabled} />
              <span className="w-24 font-medium text-sm">{h.day}</span>
              <div className="flex items-center gap-2 flex-1">
                <Input type="time" defaultValue={h.open} className="w-32" disabled={!h.enabled} />
                <span className="text-muted-foreground text-sm">to</span>
                <Input type="time" defaultValue={h.close} className="w-32" disabled={!h.enabled} />
              </div>
              {!h.enabled && <span className="text-xs text-muted-foreground">Closed</span>}
            </div>
          ))}
          <Button className="gap-2 mt-4" onClick={() => toast({ title: "Saved!", description: "Working hours updated." })}><Save size={14} />Save Schedule</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export const OrderToggle = () => {
  const [accepting, setAccepting] = useState(true);
  const { toast } = useToast();
  return (
    <PageShell title="Order Accepting Toggle" description="Control whether your shop accepts new orders">
      <Card className="max-w-lg">
        <CardContent className="p-8 text-center space-y-6">
          <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${accepting ? "bg-green-500/10" : "bg-red-500/10"}`}>
            <Power size={40} className={accepting ? "text-green-500" : "text-red-500"} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{accepting ? "Accepting Orders" : "Not Accepting Orders"}</h2>
            <p className="text-muted-foreground mt-1">{accepting ? "Your shop is open and accepting new print orders." : "Your shop is currently closed to new orders."}</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium">Shop Status</span>
            <Switch checked={accepting} onCheckedChange={(v) => { setAccepting(v); toast({ title: v ? "Shop Opened!" : "Shop Closed", description: v ? "Now accepting orders." : "Orders paused." }); }} />
            <span className={`text-sm font-medium ${accepting ? "text-green-500" : "text-red-500"}`}>{accepting ? "OPEN" : "CLOSED"}</span>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export const HolidayMode = () => {
  const [holiday, setHoliday] = useState(false);
  const { toast } = useToast();
  return (
    <PageShell title="Holiday Mode" description="Temporarily close your shop for holidays">
      <Card className="max-w-lg">
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${holiday ? "bg-orange-500/10" : "bg-muted"}`}>
              <Palmtree size={36} className={holiday ? "text-orange-500" : "text-muted-foreground"} />
            </div>
            <h2 className="text-xl font-bold">{holiday ? "🏖️ Holiday Mode Active" : "Holiday Mode Inactive"}</h2>
            <p className="text-muted-foreground mt-1 text-sm">Customers will see a holiday notice when trying to place orders.</p>
          </div>
          <div className="space-y-3">
            <div className="space-y-2"><Label>Holiday Start Date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Holiday End Date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Message to Customers</Label><Input defaultValue="We're on holiday! Back soon." /></div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border p-4">
            <Switch checked={holiday} onCheckedChange={(v) => { setHoliday(v); toast({ title: v ? "Holiday Mode ON" : "Holiday Mode OFF" }); }} />
            <div>
              <p className="font-medium">{holiday ? "Holiday mode is enabled" : "Enable holiday mode"}</p>
              <p className="text-xs text-muted-foreground">Toggle to activate/deactivate</p>
            </div>
          </div>
          <Button className="w-full gap-2"><Save size={14} />Save Holiday Settings</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
};
