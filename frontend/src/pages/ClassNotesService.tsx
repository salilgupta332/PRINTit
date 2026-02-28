import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookOpen, CheckCircle, ArrowLeft, ArrowRight, Upload, Library } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/* ─── Types ─── */
type NotesMode = "" | "upload" | "existing";
type PageMode = "full" | "range";

interface NotesFormData {
  // Basic
  uploadFile: File | null;
  customerName: string;
  subjectName: string;
  academicLevel: string;
  deadline: string;
  pageMode: PageMode;
  totalPages: number;
  rangeFrom: number;
  rangeTo: number;
  // Print preferences (same as assignment)
  printType: string;
  paperSize: string;
  paperQuality: string;
  bindingRequired: string;
  bindingType: string;
  copies: number;
  // Delivery
  deliveryType: string;
  recipientName: string;
  phone: string;
  addressLine1: string;
  houseNo: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

const initialForm: NotesFormData = {
  uploadFile: null,
  customerName: "",
  subjectName: "",
  academicLevel: "",
  deadline: "",
  pageMode: "full",
  totalPages: 0,
  rangeFrom: 1,
  rangeTo: 1,
  printType: "bw",
  paperSize: "A4",
  paperQuality: "normal",
  bindingRequired: "no",
  bindingType: "",
  copies: 1,
  deliveryType: "",
  recipientName: "",
  phone: "",
  addressLine1: "",
  houseNo: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

/* ─── Component ─── */
export default function ClassNotesService() {
  const [mode, setMode] = useState<NotesMode>("");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<NotesFormData>(initialForm);

  const update = (field: keyof NotesFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* ─── Mode Selection Screen ─── */
  if (mode === "") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Notes & Printing</h1>
            <p className="text-sm text-muted-foreground">Print your notes or browse existing ones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Upload Own Notes */}
          <button
            onClick={() => setMode("upload")}
            className="bg-card border-2 border-border hover:border-primary/40 rounded-2xl p-6 text-left transition-all shadow-card hover:shadow-card-hover group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">Upload Your Own Notes</h3>
            <p className="text-sm text-muted-foreground">
              Upload your PDF, DOC, or PPT file and get it printed with your preferences.
            </p>
          </button>

          {/* Option 2: Existing Notes */}
          <button
            onClick={() => setMode("existing")}
            className="bg-card border-2 border-border hover:border-primary/40 rounded-2xl p-6 text-left transition-all shadow-card hover:shadow-card-hover group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Library className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">Existing Notes</h3>
            <p className="text-sm text-muted-foreground">
              Browse pre-uploaded notes from shopkeepers and get them printed.
            </p>
            <span className="inline-block mt-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Coming Soon</span>
          </button>
        </div>
      </div>
    );
  }

  /* ─── Existing Notes (Coming Soon) ─── */
  if (mode === "existing") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setMode("")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Existing Notes</h1>
            <p className="text-sm text-muted-foreground">Browse and print pre-uploaded notes</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-card text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Library className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-lg font-semibold text-foreground">Coming Soon!</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We're working on this feature. Soon you'll be able to browse notes uploaded by shopkeepers, 
            select your academic level (College / Coaching), and order prints directly.
          </p>
          <div className="bg-muted/50 rounded-xl p-4 text-left text-sm space-y-2 max-w-sm mx-auto">
            <p className="font-medium text-foreground">What you'll need:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Customer Name</li>
              <li>Academic Level (College / Coaching)</li>
              <li>Select from available notes</li>
            </ul>
          </div>
          <Button variant="outline" onClick={() => setMode("")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  /* ─── Upload Own Notes - Multi-Step Wizard ─── */
  const steps = [
    { label: "Details", title: "Basic Details" },
    { label: "Print", title: "Print & Paper Preferences" },
    { label: "Delivery", title: "Delivery Details" },
    { label: "Payment", title: "Payment" },
    { label: "Preview", title: "Review & Submit" },
  ];

  const totalSteps = steps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => { if (step < totalSteps - 1) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = () => {
    toast({ title: "Order Submitted! 🎉", description: "Your notes printing order has been placed." });
    setForm(initialForm);
    setStep(0);
    setMode("");
  };

  // Simulate page detection from uploaded file
  const handleFileUpload = (file: File | null) => {
    update("uploadFile", file);
    if (file) {
      // Simulated page count detection
      const simulatedPages = Math.floor(Math.random() * 50) + 5;
      update("totalPages", simulatedPages);
      update("rangeTo", simulatedPages);
    }
  };

  const renderDetailsStep = () => (
    <div className="space-y-4">
      <div>
        <Label>Upload File (PDF / DOC / PPT) *</Label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
          className="mt-1.5"
        />
        {form.uploadFile && (
          <p className="text-xs text-muted-foreground mt-1">
            📄 {form.uploadFile.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Customer Name *</Label>
          <Input value={form.customerName} onChange={(e) => update("customerName", e.target.value)} className="mt-1.5" placeholder="Your full name" />
        </div>
        <div>
          <Label>Subject Name *</Label>
          <Input value={form.subjectName} onChange={(e) => update("subjectName", e.target.value)} className="mt-1.5" placeholder="e.g. Physics" />
        </div>
        <div>
          <Label>Academic Level *</Label>
          <Select value={form.academicLevel} onValueChange={(v) => update("academicLevel", v)}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="coaching">Coaching</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Deadline / Delivery Date *</Label>
          <Input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} className="mt-1.5" />
        </div>
      </div>

      {/* Page Selection */}
      <div className="space-y-3">
        <Label>Number of Pages to Print *</Label>
        <RadioGroup value={form.pageMode} onValueChange={(v: PageMode) => update("pageMode", v)} className="flex gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="full" /> Full Printing</label>
          <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="range" /> Range Selection</label>
        </RadioGroup>

        {form.pageMode === "full" ? (
          <div className="bg-muted/50 rounded-xl p-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Pages (auto-detected)</span>
            <span className="font-semibold text-foreground">{form.totalPages || "Upload file first"}</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>From Page</Label>
              <Input type="number" min={1} max={form.totalPages || 999} value={form.rangeFrom} onChange={(e) => update("rangeFrom", parseInt(e.target.value) || 1)} className="mt-1.5" />
            </div>
            <div>
              <Label>To Page</Label>
              <Input type="number" min={form.rangeFrom} max={form.totalPages || 999} value={form.rangeTo} onChange={(e) => update("rangeTo", parseInt(e.target.value) || 1)} className="mt-1.5" />
            </div>
            <div className="col-span-2 bg-muted/50 rounded-xl p-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pages to print</span>
              <span className="font-semibold text-foreground">{Math.max(0, form.rangeTo - form.rangeFrom + 1)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderPrintStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Print Type *</Label>
          <Select value={form.printType} onValueChange={(v) => update("printType", v)}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bw">Black & White</SelectItem>
              <SelectItem value="color">Color</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Paper Size</Label>
          <Select value={form.paperSize} onValueChange={(v) => update("paperSize", v)}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4 (Default)</SelectItem>
              <SelectItem value="A3">A3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Paper Quality</Label>
          <Select value={form.paperQuality} onValueChange={(v) => update("paperQuality", v)}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="premium">Thick (Premium)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Copies Required</Label>
          <Input type="number" min={1} value={form.copies} onChange={(e) => update("copies", parseInt(e.target.value) || 1)} className="mt-1.5" />
        </div>
      </div>
      <div>
        <Label>Binding Required?</Label>
        <RadioGroup value={form.bindingRequired} onValueChange={(v) => update("bindingRequired", v)} className="flex gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="yes" /> Yes</label>
          <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="no" /> No</label>
        </RadioGroup>
      </div>
      {form.bindingRequired === "yes" && (
        <div>
          <Label>Binding Type</Label>
          <Select value={form.bindingType} onValueChange={(v) => update("bindingType", v)}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select binding type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="spiral">Spiral</SelectItem>
              <SelectItem value="staple">Staple</SelectItem>
              <SelectItem value="hard">Hard Binding</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );

  const renderDeliveryStep = () => (
    <div className="space-y-4">
      <div>
        <Label>Delivery Type *</Label>
        <RadioGroup value={form.deliveryType} onValueChange={(v) => update("deliveryType", v)} className="flex gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="home" /> Home Delivery</label>
          <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="pickup" /> Pickup</label>
        </RadioGroup>
      </div>
      {form.deliveryType === "home" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Recipient Name *</Label>
            <Input value={form.recipientName} onChange={(e) => update("recipientName", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Phone Number *</Label>
            <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1.5" placeholder="+91" />
          </div>
          <div>
            <Label>House / Flat / Block No *</Label>
            <Input value={form.houseNo} onChange={(e) => update("houseNo", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Address Line 1 *</Label>
            <Input value={form.addressLine1} onChange={(e) => update("addressLine1", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Apartment / Road / Area</Label>
            <Input value={form.addressLine2} onChange={(e) => update("addressLine2", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>City *</Label>
            <Input value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>State *</Label>
            <Input value={form.state} onChange={(e) => update("state", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Pin Code *</Label>
            <Input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className="mt-1.5" />
          </div>
          <div className="sm:col-span-2">
            <Label>Nearby Landmark (Optional)</Label>
            <Input value={form.landmark} onChange={(e) => update("landmark", e.target.value)} className="mt-1.5" />
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">Choose your preferred payment method.</p>
      <div className="bg-muted/50 rounded-xl p-4 space-y-2">
        <h3 className="font-display font-semibold text-foreground text-sm">Order Summary</h3>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Pages</span>
          <span className="text-card-foreground">{form.pageMode === "full" ? form.totalPages : (form.rangeTo - form.rangeFrom + 1)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Print Type</span>
          <span className="text-card-foreground">{form.printType === "bw" ? "B&W" : "Color"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Copies</span>
          <span className="text-card-foreground">{form.copies}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-semibold text-sm">
          <span className="text-foreground">Estimated Total</span>
          <span className="text-primary">₹ —</span>
        </div>
        <p className="text-xs text-muted-foreground">Final pricing will be confirmed after review.</p>
      </div>
      <div>
        <Label>Payment Method</Label>
        <RadioGroup value="" onValueChange={() => {}} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {[
            { value: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
            { value: "upi", label: "UPI / QR Code", desc: "GPay, PhonePe, Paytm" },
            { value: "card", label: "Debit / Credit Card", desc: "Visa, MasterCard, RuPay" },
            { value: "wallet", label: "Wallet / Net Banking", desc: "Online transfer" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-start gap-3 p-3 rounded-xl border-2 border-border hover:border-primary/30 cursor-pointer transition-all">
              <RadioGroupItem value={opt.value} className="mt-0.5" />
              <div>
                <p className="font-medium text-card-foreground text-sm">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
      <p className="text-xs text-muted-foreground">🔒 Payment will be processed securely.</p>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">Review your order details before submitting.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {[
          ["Customer", form.customerName],
          ["Subject", form.subjectName],
          ["Academic Level", form.academicLevel],
          ["Deadline", form.deadline],
          ["File", form.uploadFile?.name || "—"],
          ["Pages", form.pageMode === "full" ? `All (${form.totalPages})` : `${form.rangeFrom} – ${form.rangeTo}`],
          ["Print Type", form.printType === "bw" ? "Black & White" : "Color"],
          ["Paper Size", form.paperSize],
          ["Paper Quality", form.paperQuality === "normal" ? "Normal" : "Premium"],
          ["Binding", form.bindingRequired === "yes" ? form.bindingType : "None"],
          ["Copies", String(form.copies)],
          ["Delivery", form.deliveryType === "home" ? "Home Delivery" : "Pickup"],
          form.deliveryType === "home" ? ["City", form.city] : null,
        ].filter(Boolean).map(([label, value]) => (
          <div key={label as string} className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium text-card-foreground capitalize">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const getStepContent = () => {
    switch (steps[step]?.label) {
      case "Details": return renderDetailsStep();
      case "Print": return renderPrintStep();
      case "Delivery": return renderDeliveryStep();
      case "Payment": return renderPaymentStep();
      case "Preview": return renderPreviewStep();
      default: return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => { setMode(""); setStep(0); }}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Upload Your Notes</h1>
          <p className="text-sm text-muted-foreground">Print your own notes with custom preferences</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Step {step + 1} of {totalSteps}</span>
          <span>{steps[step]?.title}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex gap-1">
          {steps.map((s, i) => (
            <div key={s.label} className={cn("flex-1 text-center text-xs py-1 rounded transition-colors", i <= step ? "text-primary font-medium" : "text-muted-foreground")}>
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        {getStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prev} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        {step === totalSteps - 1 ? (
          <Button variant="hero" onClick={handleSubmit}>
            <CheckCircle className="h-4 w-4 mr-2" /> Submit Order
          </Button>
        ) : (
          <Button variant="default" onClick={next}>
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
