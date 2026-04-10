import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createPanOrder } from "@/api/documentApi";
/**
 * PAN Card Print – Multi-step Form Wizard
 *
 * Steps: Details → Delivery → Payment → Preview → Submit
 *
 * Fields:
 * - User Info: Full Name, Mobile, Email (optional)
 * - PAN Number
 * - Upload PAN Card Image
 * - Print Type: Color Print / PVC Card Print
 * - Lamination: Yes / No
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
  panNumber: string;
  uploadFile: File | null;
  printType: "color" | "pvc";
  lamination: "yes" | "no";
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
  panNumber: "",
  uploadFile: null,
  printType: "color",
  lamination: "no",
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
  { label: "Details", title: "PAN Card Details" },
  { label: "Delivery", title: "Delivery Options" },
  { label: "Payment", title: "Payment Method" },
  { label: "Preview", title: "Order Preview" },
];
export default function PANCardPrintService() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const update = (field: keyof FormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const getCurrentLocation = async () => {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  };

  const handleSubmit = async () => {
    try {
      const location = await getCurrentLocation();
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key !== "uploadFile") {
          formData.append(key, String(value));
        }
      });

      if (form.uploadFile) {
        formData.append("file", form.uploadFile);
      }

      formData.append("lat", String(location.lat));
      formData.append("lng", String(location.lng));

      await createPanOrder(formData);

      toast({
        title: "Order Submitted!",
        description: "Your PAN card print order has been placed.",
      });

      setForm(initialForm);
      setStep(0);

      navigate("/dashboard/official-docs");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Location access is required to place this order.",
        variant: "destructive",
      });
    }
  };
  const handleFileUpload = (file: File | null) => {
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Max file size is 5MB",
          variant: "destructive",
        });
        return;
      }
      update("uploadFile", file);
    }
  };
  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          👤 User Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name *</Label>
            <Input
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label>Mobile Number *</Label>
            <Input
              value={form.mobile}
              onChange={(e) => update("mobile", e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>
          <div>
            <Label>Email (Optional)</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div>
            <Label>PAN Number *</Label>
            <Input
              value={form.panNumber}
              onChange={(e) =>
                update("panNumber", e.target.value.toUpperCase())
              }
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          📁 Upload PAN Card Image
        </h3>
        {form.uploadFile ? (
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
            <span className="text-sm text-foreground flex-1 truncate">
              {form.uploadFile.name}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => update("uploadFile", null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Upload PDF or Image (Max 5MB)
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
            />
          </label>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          🖨️ Print Options
        </h3>
        <div className="space-y-4">
          <div>
            <Label>Print Type</Label>
            <RadioGroup
              value={form.printType}
              onValueChange={(v) => update("printType", v)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="color" id="pan-color" />
                <Label htmlFor="pan-color" className="cursor-pointer">
                  Color Print
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="pvc" id="pan-pvc" />
                <Label htmlFor="pan-pvc" className="cursor-pointer">
                  PVC Card Print
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Lamination</Label>
            <RadioGroup
              value={form.lamination}
              onValueChange={(v) => update("lamination", v)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yes" id="pan-lam-yes" />
                <Label htmlFor="pan-lam-yes" className="cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="no" id="pan-lam-no" />
                <Label htmlFor="pan-lam-no" className="cursor-pointer">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="max-w-[150px]">
            <Label>Copies</Label>
            <Input
              type="number"
              min={1}
              value={form.copies}
              onChange={(e) => update("copies", Math.max(1, +e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
  const renderDeliveryStep = () => (
    <div className="space-y-4">
      <Label>Delivery Type</Label>
      <RadioGroup
        value={form.deliveryType}
        onValueChange={(v) => update("deliveryType", v)}
        className="flex gap-4"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="pickup" id="pan-del-pickup" />
          <Label htmlFor="pan-del-pickup" className="cursor-pointer">
            Pickup from Store
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="delivery" id="pan-del-delivery" />
          <Label htmlFor="pan-del-delivery" className="cursor-pointer">
            Home Delivery
          </Label>
        </div>
      </RadioGroup>
      {form.deliveryType === "delivery" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <Label>Recipient Name *</Label>
            <Input
              value={form.recipientName}
              onChange={(e) => update("recipientName", e.target.value)}
            />
          </div>
          <div>
            <Label>Phone *</Label>
            <Input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div>
            <Label>House / Flat No.</Label>
            <Input
              value={form.houseNo}
              onChange={(e) => update("houseNo", e.target.value)}
            />
          </div>
          <div>
            <Label>Address Line 1 *</Label>
            <Input
              value={form.addressLine1}
              onChange={(e) => update("addressLine1", e.target.value)}
            />
          </div>
          <div>
            <Label>Address Line 2</Label>
            <Input
              value={form.addressLine2}
              onChange={(e) => update("addressLine2", e.target.value)}
            />
          </div>
          <div>
            <Label>City *</Label>
            <Input
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </div>
          <div>
            <Label>State *</Label>
            <Input
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            />
          </div>
          <div>
            <Label>Pincode *</Label>
            <Input
              value={form.pincode}
              onChange={(e) => update("pincode", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Landmark</Label>
            <Input
              value={form.landmark}
              onChange={(e) => update("landmark", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
  const renderPaymentStep = () => (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Document</span>
              <span>PAN Card</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Print Type</span>
              <span>
                {form.printType === "pvc" ? "PVC Card" : "Color Print"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lamination</span>
              <span>{form.lamination === "yes" ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Copies</span>
              <span>{form.copies}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>
                {form.deliveryType === "delivery"
                  ? "Home Delivery"
                  : "Store Pickup"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div>
        <Label className="mb-2 block">Select Payment Method</Label>
        <RadioGroup
          value={form.paymentMethod}
          onValueChange={(v) => update("paymentMethod", v)}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { value: "cod", label: "Cash on Delivery" },
            { value: "upi", label: "UPI Payment" },
            { value: "card", label: "Credit / Debit Card" },
            { value: "wallet", label: "Wallet" },
          ].map((m) => (
            <label
              key={m.value}
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${form.paymentMethod === m.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
            >
              <RadioGroupItem value={m.value} id={`pan-pay-${m.value}`} />
              <span className="text-sm">{m.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
  const renderPreviewStep = () => (
    <Card>
      <CardContent className="pt-6 space-y-3 text-sm">
        <h3 className="font-semibold text-foreground text-base mb-2">
          📋 Order Summary
        </h3>
        <div className="grid grid-cols-2 gap-y-2">
          <span className="text-muted-foreground">Full Name</span>
          <span>{form.fullName}</span>
          <span className="text-muted-foreground">Mobile</span>
          <span>{form.mobile}</span>
          {form.email && (
            <>
              <span className="text-muted-foreground">Email</span>
              <span>{form.email}</span>
            </>
          )}
          <span className="text-muted-foreground">PAN Number</span>
          <span>{form.panNumber}</span>
          <span className="text-muted-foreground">File</span>
          <span>{form.uploadFile?.name || "—"}</span>
          <span className="text-muted-foreground">Print Type</span>
          <span>{form.printType === "pvc" ? "PVC Card" : "Color Print"}</span>
          <span className="text-muted-foreground">Lamination</span>
          <span>{form.lamination === "yes" ? "Yes" : "No"}</span>
          <span className="text-muted-foreground">Copies</span>
          <span>{form.copies}</span>
          <span className="text-muted-foreground">Delivery</span>
          <span>
            {form.deliveryType === "delivery"
              ? "Home Delivery"
              : "Store Pickup"}
          </span>
          <span className="text-muted-foreground">Payment</span>
          <span className="capitalize">{form.paymentMethod}</span>
        </div>
      </CardContent>
    </Card>
  );
  const renderStep = () => {
    switch (step) {
      case 0:
        return renderDetailsStep();
      case 1:
        return renderDeliveryStep();
      case 2:
        return renderPaymentStep();
      case 3:
        return renderPreviewStep();
      default:
        return null;
    }
  };
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard/official-docs")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            PAN Card Print
          </h1>
          <p className="text-muted-foreground text-sm">
            Fill in the details to place your order
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s.label} className="flex-1">
            <div
              className={`h-2 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {steps.map((s, i) => (
          <span
            key={s.label}
            className={i === step ? "text-primary font-medium" : ""}
          >
            {s.label}
          </span>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {steps[step].title}
          </h2>
          {renderStep()}
        </CardContent>
      </Card>
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
