import React, { useState } from "react";
import { FileText, Upload, FolderOpen, Archive, Trash2, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const files = [
  { id: 1, name: "notes_physics_ch1.pdf", customer: "Rahul Sharma", size: "2.4 MB", date: "20 Feb", type: "PDF", status: "Printed" },
  { id: 2, name: "assignment_math.docx", customer: "Priya Singh", size: "0.8 MB", date: "20 Feb", type: "DOCX", status: "Pending" },
  { id: 3, name: "official_letter.pdf", customer: "Amit Kumar", size: "0.3 MB", date: "19 Feb", type: "PDF", status: "Printed" },
  { id: 4, name: "project_report.pdf", customer: "Sneha Patel", size: "5.1 MB", date: "19 Feb", type: "PDF", status: "Archived" },
  { id: 5, name: "id_card_copy.jpg", customer: "Dev Rao", size: "1.2 MB", date: "18 Feb", type: "JPG", status: "Pending" },
];

const typeColors: Record<string, string> = {
  PDF: "bg-red-500/10 text-red-600",
  DOCX: "bg-blue-500/10 text-blue-600",
  JPG: "bg-green-500/10 text-green-600",
};

const PageShell = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">{title}</h1><p className="text-muted-foreground">{description}</p></div>
    {children}
  </div>
);

const FileTable = ({ filterFn, title, description }: { filterFn: (f: typeof files[0]) => boolean; title: string; description: string }) => {
  const filtered = files.filter(filterFn);
  return (
    <PageShell title={title} description={description}>
      <Card>
        <CardHeader><CardTitle>Files ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">File Name</th><th className="pb-3 pr-4 font-medium">Customer</th>
              <th className="pb-3 pr-4 font-medium">Type</th><th className="pb-3 pr-4 font-medium">Size</th>
              <th className="pb-3 pr-4 font-medium">Date</th><th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-muted/30">
                  <td className="py-3 pr-4"><div className="flex items-center gap-2"><FileText size={14} className="text-primary shrink-0" /><span className="font-medium truncate max-w-[160px]">{f.name}</span></div></td>
                  <td className="py-3 pr-4 text-muted-foreground">{f.customer}</td>
                  <td className="py-3 pr-4"><span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[f.type] || "bg-muted text-muted-foreground"}`}>{f.type}</span></td>
                  <td className="py-3 pr-4 text-muted-foreground">{f.size}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{f.date}</td>
                  <td className="py-3 pr-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${f.status === "Printed" ? "bg-green-500/10 text-green-600" : f.status === "Pending" ? "bg-yellow-500/10 text-yellow-600" : "bg-muted text-muted-foreground"}`}>{f.status}</span></td>
                  <td className="py-3"><div className="flex gap-1"><Button variant="outline" size="sm" className="h-7"><Eye size={12} /></Button><Button variant="outline" size="sm" className="h-7"><Download size={12} /></Button><Button variant="outline" size="sm" className="h-7 text-destructive"><Trash2 size={12} /></Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export const AllFiles = () => <FileTable filterFn={() => true} title="All Files" description="All uploaded print files" />;
export const ArchivedFiles = () => <FileTable filterFn={(f) => f.status === "Archived"} title="Archived Files" description="Files moved to archive" />;

export const UploadFiles = () => (
  <PageShell title="Upload Files" description="Upload print files manually for an order">
    <Card className="max-w-lg">
      <CardHeader><CardTitle>Upload File</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <Upload size={32} className="text-muted-foreground mb-3" />
          <p className="font-medium">Drag & drop files here</p>
          <p className="text-sm text-muted-foreground mt-1">Supports PDF, DOCX, JPG, PNG</p>
          <Button variant="outline" className="mt-4 gap-2"><Upload size={14} />Browse Files</Button>
        </div>
        <div className="space-y-2"><Label>Associated Customer</Label><Input placeholder="Search customer..." /></div>
        <div className="space-y-2"><Label>Order ID (optional)</Label><Input placeholder="#ORD-001" /></div>
        <Button className="w-full gap-2"><Upload size={14} />Upload File</Button>
      </CardContent>
    </Card>
  </PageShell>
);

export const FileCategories = () => (
  <PageShell title="File Categories" description="Organize files by category">
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {[
        { label: "Assignments", count: 124, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Notes", count: 234, icon: FileText, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Official Docs", count: 89, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "ID Copies", count: 45, icon: FileText, color: "text-orange-500", bg: "bg-orange-500/10" },
        { label: "Projects", count: 67, icon: FileText, color: "text-pink-500", bg: "bg-pink-500/10" },
        { label: "Archived", count: 23, icon: Archive, color: "text-muted-foreground", bg: "bg-muted" },
      ].map((c) => (
        <Card key={c.label} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${c.bg}`}><c.icon size={20} className={c.color} /></div>
            <p className="font-semibold">{c.label}</p>
            <p className="text-2xl font-bold mt-1">{c.count}</p>
            <p className="text-xs text-muted-foreground">files</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </PageShell>
);
