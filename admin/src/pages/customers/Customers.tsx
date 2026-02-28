import React, { useState } from "react";
import { Search, UserPlus, Eye, Ban, CheckCircle, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const customers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210", orders: 24, spent: "₹2,880", joined: "Jan 2025", status: "Active", verified: true },
  { id: 2, name: "Priya Singh", email: "priya@gmail.com", phone: "9876543211", orders: 18, spent: "₹1,440", joined: "Feb 2025", status: "Active", verified: true },
  { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "9876543212", orders: 9, spent: "₹720", joined: "Mar 2025", status: "Active", verified: false },
  { id: 4, name: "Sneha Patel", email: "sneha@gmail.com", phone: "9876543213", orders: 32, spent: "₹4,160", joined: "Dec 2024", status: "Active", verified: true },
  { id: 5, name: "Dev Rao", email: "dev@gmail.com", phone: "9876543214", orders: 5, spent: "₹400", joined: "Apr 2025", status: "Blocked", verified: false },
  { id: 6, name: "Kavya Reddy", email: "kavya@gmail.com", phone: "9876543215", orders: 41, spent: "₹5,330", joined: "Nov 2024", status: "Active", verified: true },
];

const CustomerTable = ({ filterFn, title, description }: {
  filterFn: (c: typeof customers[0]) => boolean;
  title: string;
  description: string;
}) => {
  const [search, setSearch] = useState("");
  const filtered = customers.filter(filterFn).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Customers</CardTitle>
              <CardDescription>{filtered.length} customers</CardDescription>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-60" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">Contact</th>
                  <th className="pb-3 pr-4 font-medium">Orders</th>
                  <th className="pb-3 pr-4 font-medium">Total Spent</th>
                  <th className="pb-3 pr-4 font-medium">Joined</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium">{c.name}</p>
                          {c.verified && <p className="text-xs text-green-500 flex items-center gap-1"><CheckCircle size={10} /> Verified</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="flex items-center gap-1 text-xs text-muted-foreground"><Mail size={11} />{c.email}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5"><Phone size={11} />{c.phone}</p>
                    </td>
                    <td className="py-3 pr-4 font-medium">{c.orders}</td>
                    <td className="py-3 pr-4 font-semibold text-green-600 dark:text-green-400">{c.spent}</td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">{c.joined}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-7 gap-1"><Eye size={12} />View</Button>
                        <Button variant="outline" size="sm" className="h-7 text-red-500 hover:text-red-600"><Ban size={12} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const AllCustomers = () => <CustomerTable filterFn={() => true} title="All Customers" description="View and manage all registered customers" />;
export const VerifiedCustomers = () => <CustomerTable filterFn={(c) => c.verified} title="Verified Customers" description="Customers with verified accounts" />;
export const BlockedCustomers = () => <CustomerTable filterFn={(c) => c.status === "Blocked"} title="Blocked Customers" description="Customers with restricted access" />;

export const AddCustomer = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Customer</h1>
        <p className="text-muted-foreground">Register a new customer manually</p>
      </div>
      <Card className="max-w-lg">
        <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>First Name</Label><Input placeholder="Rahul" /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input placeholder="Sharma" /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="rahul@gmail.com" /></div>
          <div className="space-y-2"><Label>Phone Number</Label><Input placeholder="9876543210" /></div>
          <div className="space-y-2"><Label>Address</Label><Input placeholder="123, Main Street, City" /></div>
          <Button className="w-full gap-2"><UserPlus size={16} />Add Customer</Button>
        </CardContent>
      </Card>
    </div>
  );
};
