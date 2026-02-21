import React, { useState } from "react";
import { Plus, Edit, Trash2, Tag, Percent, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const services = [
  { id: 1, name: "Black & White Print", category: "Printing", price: "₹2/page", active: true },
  { id: 2, name: "Color Print", category: "Printing", price: "₹8/page", active: true },
  { id: 3, name: "Spiral Binding", category: "Binding", price: "₹30/book", active: true },
  { id: 4, name: "Thermal Binding", category: "Binding", price: "₹50/book", active: false },
  { id: 5, name: "Lamination (A4)", category: "Lamination", price: "₹15/sheet", active: true },
  { id: 6, name: "Scan & PDF", category: "Scanning", price: "₹5/page", active: true },
];

const categories = ["Printing", "Binding", "Lamination", "Scanning", "Stationery"];

const discounts = [
  { code: "STUDENT10", discount: "10%", type: "Percentage", uses: 45, active: true },
  { code: "BULK20", discount: "20%", type: "Percentage", uses: 12, active: true },
  { code: "FIRST50", discount: "₹50", type: "Flat", uses: 89, active: false },
];

const PageShell = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">{title}</h1><p className="text-muted-foreground">{description}</p></div>
    {children}
  </div>
);

export const AllServices = () => (
  <PageShell title="All Services" description="Manage your shop's available services">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div><CardTitle>Services</CardTitle><CardDescription>{services.length} services configured</CardDescription></div>
        <Button className="gap-2"><Plus size={14} />Add Service</Button>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">Service Name</th><th className="pb-3 pr-4 font-medium">Category</th>
            <th className="pb-3 pr-4 font-medium">Price</th><th className="pb-3 pr-4 font-medium">Status</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-muted/30">
                <td className="py-3 pr-4 font-medium">{s.name}</td>
                <td className="py-3 pr-4"><Badge variant="secondary">{s.category}</Badge></td>
                <td className="py-3 pr-4 font-semibold text-primary">{s.price}</td>
                <td className="py-3 pr-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${s.active ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>{s.active ? "Active" : "Inactive"}</span></td>
                <td className="py-3"><div className="flex gap-1"><Button variant="outline" size="sm" className="h-7 gap-1"><Edit size={12} />Edit</Button><Button variant="outline" size="sm" className="h-7 text-destructive"><Trash2 size={12} /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </PageShell>
);

export const AddService = () => (
  <PageShell title="Add Service" description="Create a new service for your print shop">
    <Card className="max-w-lg">
      <CardHeader><CardTitle>Service Details</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2"><Label>Service Name</Label><Input placeholder="e.g. Color Print" /></div>
        <div className="space-y-2"><Label>Category</Label><Input placeholder="e.g. Printing" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Price</Label><Input placeholder="₹2" /></div>
          <div className="space-y-2"><Label>Unit</Label><Input placeholder="per page" /></div>
        </div>
        <div className="space-y-2"><Label>Description</Label><Input placeholder="Short description..." /></div>
        <div className="flex items-center gap-3"><Switch id="active" defaultChecked /><Label htmlFor="active">Active (visible to customers)</Label></div>
        <Button className="w-full gap-2"><Plus size={14} />Add Service</Button>
      </CardContent>
    </Card>
  </PageShell>
);

export const Categories = () => (
  <PageShell title="Service Categories" description="Organize services into categories">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div><CardTitle>Categories</CardTitle></div>
        <Button className="gap-2"><Plus size={14} />Add Category</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-2"><Layers size={16} className="text-primary" /><span className="font-medium">{cat}</span></div>
              <div className="flex gap-1"><Button variant="ghost" size="sm" className="h-7"><Edit size={12} /></Button><Button variant="ghost" size="sm" className="h-7 text-destructive"><Trash2 size={12} /></Button></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </PageShell>
);

export const Discounts = () => (
  <PageShell title="Discounts & Offers" description="Create and manage promotional discounts">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div><CardTitle>Discount Codes</CardTitle></div>
        <Button className="gap-2"><Plus size={14} />New Discount</Button>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">Code</th><th className="pb-3 pr-4 font-medium">Discount</th>
            <th className="pb-3 pr-4 font-medium">Type</th><th className="pb-3 pr-4 font-medium">Uses</th>
            <th className="pb-3 pr-4 font-medium">Status</th><th className="pb-3 font-medium">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {discounts.map((d) => (
              <tr key={d.code} className="hover:bg-muted/30">
                <td className="py-3 pr-4 font-mono font-bold text-primary">{d.code}</td>
                <td className="py-3 pr-4 font-semibold">{d.discount}</td>
                <td className="py-3 pr-4"><Badge variant="secondary">{d.type}</Badge></td>
                <td className="py-3 pr-4 text-muted-foreground">{d.uses} uses</td>
                <td className="py-3 pr-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${d.active ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>{d.active ? "Active" : "Expired"}</span></td>
                <td className="py-3"><div className="flex gap-1"><Button variant="outline" size="sm" className="h-7"><Edit size={12} /></Button><Button variant="outline" size="sm" className="h-7 text-destructive"><Trash2 size={12} /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </PageShell>
);
