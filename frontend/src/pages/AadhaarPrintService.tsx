import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
/**
 * Aadhaar Card Print – Multi-step Form Wizard
 *
 * Steps: Details → Delivery → Payment → Preview → Submit
 *
 * Fields:
 * - User Info: Full Name, Mobile, Email (optional)
 * - Document Upload: PDF/Image with preview
 * - Aadhaar Number (optional)
 * - Print Type: Normal Paper / PVC Card
 *   - If PVC: Card Type (PVC Smart / Premium PVC)
 * - Card Side: Front Only / Front + Back
 * - Lamination (only for Normal Paper): Yes / No
 * - QR Code Verification checkbox
 * - Copies
 * - Delivery: Pickup / Delivery (with address)
 * - Payment: COD / UPI / Card / Wallet
 *
 * Add future fields or steps below the relevant section.
 */
interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  uploadFile: File | null;
  aadhaarNumber: string;
  printType: "normal" | "pvc";
  pvcCardType: "smart" | "premium";
  cardSide: "front" | "both";
  lamination: "yes" | "no";
  qrVerification: boolean;
  copies: number;
  deliveryType: "pickup" | "delivery";
  recipientName: string;
  phone: string;
  addressLine1: string;
  houseNo: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  paymentMethod: string;
}
const initialForm: FormData = {
  fullName: "",
  mobile: "",
  email: "",
  uploadFile: null,
  aadhaarNumber: "",
  printType: "normal",
  pvcCardType: "smart",
  cardSide: "both",
  lamination: "no",
  qrVerification: false,
  copies: 1,
  deliveryType: "pickup",
  recipientName: "",
  phone: "",
  addressLine1: "",
  houseNo: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
  paymentMethod: "cod",
};
const steps = [
  { label: "Details", title: "Aadhaar Card Details" },
  { label: "Delivery", title: "Delivery Options" },
  { label: "Payment", title: "Payment Method" },
  { label: "Preview", title: "Order Preview" },
];
export default function AadhaarPrintService() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const update = (field: keyof FormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));



const handleSubmit = async () => {
  try {

    const formData = new FormData();

    // append fields
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "uploadFile") {
        formData.append(key, value as any);
      }
    });

    // append file correctly
    if (form.uploadFile) {
      formData.append("file", form.uploadFile);
    }

    const res = await fetch("http://localhost:5000/api/user/aadhaar-print", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    toast({
      title: "Order Submitted!",
      description: "Your Aadhaar print order has been placed."
    });

  } catch (err) {

    console.error(err);

    toast({
      title: "Error",
      description: "Failed to submit order",
      variant: "destructive"
    });
  }
};


  const handleFileUpload = (file: File | null) => {
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({ title: "File too large", description: "Max file size is 5MB", variant: "destructive" });
        return;
      }
      update("uploadFile", file);
    }
  };
  // ─── Step Renderers ───
  const renderDetailsStep = () => (
    <div className="space-y-6">
      {/* User Information */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">👤 User Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name *</Label>
            <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter full name" />
          </div>
          <div>
            <Label>Mobile Number *</Label>
            <Input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="Enter mobile number" />
          </div>
          <div>
            <Label>Email (Optional)</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Enter email" />
          </div>
          <div>
            <Label>Aadhaar Number (Optional)</Label>
            <Input value={form.aadhaarNumber} onChange={(e) => update("aadhaarNumber", e.target.value)} placeholder="XXXX XXXX XXXX" maxLength={14} />
          </div>
        </div>
      </div>
      {/* Document Upload */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">📁 Upload Document</h3>
        {form.uploadFile ? (
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
            <span className="text-sm text-foreground flex-1 truncate">{form.uploadFile.name}</span>
            <Button variant="ghost" size="icon" onClick={() => update("uploadFile", null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Upload PDF or Image (Max 5MB)</span>
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e.target.files?.[0] || null)} />
          </label>
        )}
      </div>
      {/* Print Options */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">🖨️ Print Options</h3>
        <div className="space-y-4">
          <div>
            <Label>Print Type</Label>
            <RadioGroup value={form.printType} onValueChange={(v) => update("printType", v)} className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="normal" id="print-normal" />
                <Label htmlFor="print-normal" className="cursor-pointer">Normal Paper Print</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="pvc" id="print-pvc" />
                <Label htmlFor="print-pvc" className="cursor-pointer">PVC Card Print</Label>
              </div>
            </RadioGroup>
          </div>
          {form.printType === "pvc" && (
            <div>
              <Label>Card Type</Label>
              <RadioGroup value={form.pvcCardType} onValueChange={(v) => update("pvcCardType", v)} className="flex gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="smart" id="pvc-smart" />
                  <Label htmlFor="pvc-smart" className="cursor-pointer">PVC Smart Card</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="premium" id="pvc-premium" />
                  <Label htmlFor="pvc-premium" className="cursor-pointer">Premium PVC Card</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          <div>
            <Label>Card Side</Label>
            <RadioGroup value={form.cardSide} onValueChange={(v) => update("cardSide", v)} className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="front" id="side-front" />
                <Label htmlFor="side-front" className="cursor-pointer">Front Only</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="both" id="side-both" />
                <Label htmlFor="side-both" className="cursor-pointer">Front + Back</Label>
              </div>
            </RadioGroup>
          </div>
          {form.printType === "normal" && (
            <div>
              <Label>Lamination</Label>
              <RadioGroup value={form.lamination} onValueChange={(v) => update("lamination", v)} className="flex gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="lam-yes" />
                  <Label htmlFor="lam-yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="lam-no" />
                  <Label htmlFor="lam-no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Checkbox
              id="qr-verify"
              checked={form.qrVerification}
              onCheckedChange={(v) => update("qrVerification", !!v)}
            />
            <Label htmlFor="qr-verify" className="cursor-pointer">QR Code Verification</Label>
          </div>
          <div className="max-w-[150px]">
            <Label>Copies</Label>
            <Input type="number" min={1} value={form.copies} onChange={(e) => update("copies", Math.max(1, +e.target.value))} />
          </div>
        </div>
      </div>
    </div>
  );
  const renderDeliveryStep = () => (
    <div className="space-y-4">
      <Label>Delivery Type</Label>
      <RadioGroup value={form.deliveryType} onValueChange={(v) => update("deliveryType", v)} className="flex gap-4">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="pickup" id="del-pickup" />
          <Label htmlFor="del-pickup" className="cursor-pointer">Pickup from Store</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="delivery" id="del-delivery" />
          <Label htmlFor="del-delivery" className="cursor-pointer">Home Delivery</Label>
        </div>
      </RadioGroup>
      {form.deliveryType === "delivery" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div><Label>Recipient Name *</Label><Input value={form.recipientName} onChange={(e) => update("recipientName", e.target.value)} placeholder="Recipient name" /></div>
          <div><Label>Phone *</Label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone number" /></div>
          <div><Label>House / Flat No.</Label><Input value={form.houseNo} onChange={(e) => update("houseNo", e.target.value)} placeholder="House / Flat No." /></div>
          <div><Label>Address Line 1 *</Label><Input value={form.addressLine1} onChange={(e) => update("addressLine1", e.target.value)} placeholder="Street address" /></div>
          <div><Label>Address Line 2</Label><Input value={form.addressLine2} onChange={(e) => update("addressLine2", e.target.value)} placeholder="Locality / Area" /></div>
          <div><Label>City *</Label><Input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" /></div>
          <div><Label>State *</Label><Input value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="State" /></div>
          <div><Label>Pincode *</Label><Input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} placeholder="Pincode" /></div>
          <div className="md:col-span-2"><Label>Landmark</Label><Input value={form.landmark} onChange={(e) => update("landmark", e.target.value)} placeholder="Nearby landmark" /></div>
        </div>
      )}
    </div>
  );
  const renderPaymentStep = () => (
    <div className="space-y-4">
      <Card><CardContent className="pt-6">
        <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Document</span><span>Aadhaar Card</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Print Type</span><span>{form.printType === "pvc" ? `PVC (${form.pvcCardType === "smart" ? "Smart" : "Premium"})` : "Normal Paper"}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Card Side</span><span>{form.cardSide === "both" ? "Front + Back" : "Front Only"}</span></div>
          {form.printType === "normal" && <div className="flex justify-between"><span className="text-muted-foreground">Lamination</span><span>{form.lamination === "yes" ? "Yes" : "No"}</span></div>}
          <div className="flex justify-between"><span className="text-muted-foreground">Copies</span><span>{form.copies}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{form.deliveryType === "delivery" ? "Home Delivery" : "Store Pickup"}</span></div>
        </div>
      </CardContent></Card>
      <div>
        <Label className="mb-2 block">Select Payment Method</Label>
        <RadioGroup value={form.paymentMethod} onValueChange={(v) => update("paymentMethod", v)} className="grid grid-cols-2 gap-3">
          {[
            { value: "cod", label: "Cash on Delivery" },
            { value: "upi", label: "UPI Payment" },
            { value: "card", label: "Credit / Debit Card" },
            { value: "wallet", label: "Wallet" },
          ].map((m) => (
            <label key={m.value} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${form.paymentMethod === m.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
              <RadioGroupItem value={m.value} id={`pay-${m.value}`} />
              <span className="text-sm">{m.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
  const renderPreviewStep = () => (
    <div className="space-y-4">
      <Card><CardContent className="pt-6 space-y-3 text-sm">
        <h3 className="font-semibold text-foreground text-base mb-2">📋 Order Summary</h3>
        <div className="grid grid-cols-2 gap-y-2">
          <span className="text-muted-foreground">Full Name</span><span>{form.fullName}</span>
          <span className="text-muted-foreground">Mobile</span><span>{form.mobile}</span>
          {form.email && <><span className="text-muted-foreground">Email</span><span>{form.email}</span></>}
          {form.aadhaarNumber && <><span className="text-muted-foreground">Aadhaar No.</span><span>{form.aadhaarNumber}</span></>}
          <span className="text-muted-foreground">File</span><span>{form.uploadFile?.name || "—"}</span>
          <span className="text-muted-foreground">Print Type</span><span>{form.printType === "pvc" ? `PVC (${form.pvcCardType === "smart" ? "Smart" : "Premium"})` : "Normal Paper"}</span>
          <span className="text-muted-foreground">Card Side</span><span>{form.cardSide === "both" ? "Front + Back" : "Front Only"}</span>
          {form.printType === "normal" && <><span className="text-muted-foreground">Lamination</span><span>{form.lamination === "yes" ? "Yes" : "No"}</span></>}
          <span className="text-muted-foreground">QR Verification</span><span>{form.qrVerification ? "Yes" : "No"}</span>
          <span className="text-muted-foreground">Copies</span><span>{form.copies}</span>
          <span className="text-muted-foreground">Delivery</span><span>{form.deliveryType === "delivery" ? "Home Delivery" : "Store Pickup"}</span>
          <span className="text-muted-foreground">Payment</span><span className="capitalize">{form.paymentMethod}</span>
        </div>
      </CardContent></Card>
    </div>
  );
  const renderStep = () => {
    switch (step) {
      case 0: return renderDetailsStep();
      case 1: return renderDeliveryStep();
      case 2: return renderPaymentStep();
      case 3: return renderPreviewStep();
      default: return null;
    }
  };
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/official-docs")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Aadhaar Card Print</h1>
          <p className="text-muted-foreground text-sm">Fill in the details to place your order</p>
        </div>
      </div>
      {/* Progress */}
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s.label} className="flex-1 flex items-center gap-1">
            <div className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {steps.map((s, i) => (
          <span key={s.label} className={i === step ? "text-primary font-medium" : ""}>{s.label}</span>
        ))}
      </div>
      {/* Step Content */}
      <Card><CardContent className="pt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">{steps[step].title}</h2>
        {renderStep()}
      </CardContent></Card>
      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prev} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={next}>
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-gradient-primary">
            Submit Order
          </Button>
        )}
      </div>
    </div>
  );
}
