import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAssignment } from "@/api/assignmentApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  GraduationCap,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface FormData {
  assignmentType: "scratch" | "upload" | "";
  subjectName: string;
  assignmentTitle: string;
  academicLevel: string;
  deadline: string;
  language: string;
  description: string;
  hasLayout: string;
  layoutFile: File | null;
  layoutStyle: string;
  frontPageRequired: string;
  frontPageDescription: string;
  uploadFile: File | null;
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
  printType: string;
  paperSize: string;
  paperQuality: string;
  bindingRequired: string;
  bindingType: string;
  copies: number;
}

const initialForm: FormData = {
  assignmentType: "",
  subjectName: "",
  assignmentTitle: "",
  academicLevel: "",
  deadline: "",
  language: "",
  description: "",
  hasLayout: "",
  layoutFile: null,
  layoutStyle: "",
  frontPageRequired: "",
  frontPageDescription: "",
  uploadFile: null,
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
  printType: "bw",
  paperSize: "A4",
  paperQuality: "normal",
  bindingRequired: "no",
  bindingType: "",
  copies: 1,
};

export default function AssignmentForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [customerName, setCustomerName] = useState("");

  const update = (field: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isScratch = form.assignmentType === "scratch";
  const isUpload = form.assignmentType === "upload";

  // Dynamic steps based on type and front page
  const getSteps = () => {
    const steps = [
      { label: "Type", title: "Assignment Type" },
      { label: "Details", title: "Basic Details" },
    ];
    if (form.frontPageRequired === "yes") {
      steps.push({ label: "Front Page", title: "Front Page Details" });
    }
    steps.push({ label: "Print", title: "Print & Paper Preferences" });
    steps.push({ label: "Delivery", title: "Delivery Details" });
    steps.push({ label: "Payment", title: "Payment" });
    steps.push({ label: "Preview", title: "Review & Submit" });
    return steps;
  };

  const steps = getSteps();
  const totalSteps = steps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
  };
  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      /* ================= BASIC ================= */
      fd.append(
        "customer",
        JSON.stringify({
          name: customerName,
        }),
      );
      fd.append(
        "assignmentType",
        form.assignmentType === "scratch" ? "from_scratch" : "student_upload",
      );
      fd.append("subjectName", form.subjectName);
      fd.append("assignmentTitle", form.assignmentTitle);
      fd.append("academicLevel", form.academicLevel);
      fd.append("deadline", form.deadline);
      fd.append("language", form.language);
      fd.append("description", form.description);

      /* ================= FILES ================= */
      if (form.assignmentType === "upload" && form.uploadFile) {
        fd.append("uploadedFiles", form.uploadFile);
      }

      if (form.assignmentType === "scratch" && form.layoutFile) {
        fd.append("layoutFile", form.layoutFile);
      }

      /* ================= FRONT PAGE ================= */
      fd.append(
        "frontPageRequired",
        form.frontPageRequired === "yes" ? "true" : "false",
      );

      fd.append(
        "frontPageDetails",
        JSON.stringify({
          description: form.frontPageDescription,
        }),
      );

      /* ================= PRINT PREFERENCES ================= */
      const printData: any = {
        printType: form.printType === "bw" ? "black_white" : "color",
        paperSize: form.paperSize,
        paperQuality: form.paperQuality,
        bindingRequired: form.bindingRequired === "yes",
        copies: form.copies,
      };

      if (form.bindingRequired === "yes") {
        printData.bindingType = form.bindingType;
      }

      fd.append("printPreferences", JSON.stringify(printData));

      /* ================= DELIVERY ================= */
      fd.append(
        "deliveryType",
        form.deliveryType === "home" ? "home_delivery" : "pickup",
      );

      fd.append(
        "address",
        JSON.stringify({
          recipientName: form.recipientName,
          phoneNumber: form.phone,
          addressLine1: form.houseNo,
          addressLine2: form.addressLine1,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          landmark: form.landmark,
        }),
      );

      /* ================= API CALL ================= */
      await createAssignment(fd);

      toast({
        title: "Order Submitted! 🎉",
        description: "Your assignment order has been placed successfully.",
      });

      setForm(initialForm);
      setStep(0);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Get actual step content index accounting for optional front page
  const getStepContent = () => {
    const stepLabel = steps[step]?.label;
    switch (stepLabel) {
      case "Type":
        return renderTypeStep();
      case "Details":
        return renderDetailsStep();
      case "Front Page":
        return renderFrontPageStep();
      case "Print":
        return renderPrintStep();
      case "Delivery":
        return renderDeliveryStep();
      case "Payment":
        return renderPaymentStep();
      case "Preview":
        return renderPreviewStep();
      default:
        return null;
    }
  };

  const renderTypeStep = () => (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">
        How would you like to proceed with your assignment?
      </p>
      <RadioGroup
        value={form.assignmentType}
        onValueChange={(v) => update("assignmentType", v)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {[
          {
            value: "scratch",
            label: "From Scratch",
            desc: "We create the assignment content for you",
          },
          {
            value: "upload",
            label: "Upload File",
            desc: "You upload your assignment document",
          },
        ].map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
              form.assignmentType === opt.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30",
            )}
          >
            <RadioGroupItem value={opt.value} className="mt-0.5" />
            <div>
              <p className="font-medium text-card-foreground">{opt.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Your Name *</Label>
          <Input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <Label>Subject Name *</Label>
          <Input
            value={form.subjectName}
            onChange={(e) => update("subjectName", e.target.value)}
            className="mt-1.5"
            placeholder="e.g. Mathematics"
          />
        </div>
        <div>
          <Label>Assignment Title *</Label>
          <Input
            value={form.assignmentTitle}
            onChange={(e) => update("assignmentTitle", e.target.value)}
            className="mt-1.5"
            placeholder="Short heading for order"
          />
        </div>
        <div>
          <Label>Academic Level *</Label>
          <Select
            value={form.academicLevel}
            onValueChange={(v) => update("academicLevel", v)}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="university">University</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Deadline / Delivery Date *</Label>
          <Input
            type="date"
            value={form.deadline}
            onChange={(e) => update("deadline", e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label>Language *</Label>
          <Select
            value={form.language}
            onValueChange={(v) => update("language", v)}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Description *</Label>
        <Textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="mt-1.5"
          rows={3}
          placeholder="Describe your assignment requirements..."
        />
      </div>

      {isScratch && (
        <>
          <div>
            <Label>Do you have a layout/design for the file?</Label>
            <RadioGroup
              value={form.hasLayout}
              onValueChange={(v) => update("hasLayout", v)}
              className="flex gap-4 mt-2"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="yes" /> Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="no" /> No
              </label>
            </RadioGroup>
          </div>
          {form.hasLayout === "yes" && (
            <div>
              <Label>Upload Layout (JPG/PNG/PDF)</Label>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) =>
                  update("layoutFile", e.target.files?.[0] || null)
                }
                className="mt-1.5"
              />
            </div>
          )}
          {form.hasLayout === "no" && (
            <div>
              <Label>Layout Style</Label>
              <Select
                value={form.layoutStyle}
                onValueChange={(v) => update("layoutStyle", v)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Choose style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      )}

      {isUpload && (
        <div>
          <Label>Upload Assignment File *</Label>
          <Input
            type="file"
            accept=".pdf,.docx,.doc,.jpg,.png"
            onChange={(e) => update("uploadFile", e.target.files?.[0] || null)}
            className="mt-1.5"
          />
        </div>
      )}

      <div>
        <Label>Is a Front Page required?</Label>
        <RadioGroup
          value={form.frontPageRequired}
          onValueChange={(v) => update("frontPageRequired", v)}
          className="flex gap-4 mt-2"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="yes" /> Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="no" /> No
          </label>
        </RadioGroup>
      </div>
    </div>
  );

  const renderFrontPageStep = () => (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Please provide details for the front page of your assignment.
      </p>
      <div>
        <Label>Front Page Description *</Label>
        <Textarea
          value={form.frontPageDescription}
          onChange={(e) => update("frontPageDescription", e.target.value)}
          className="mt-1.5"
          rows={5}
          placeholder="School/College Name, Student Name, Roll No, Subject, Teacher's Name, Session/Year, etc."
        />
      </div>
    </div>
  );

  const renderPrintStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Print Type *</Label>
          <Select
            value={form.printType}
            onValueChange={(v) => update("printType", v)}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bw">Black & White</SelectItem>
              <SelectItem value="color">Color</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Paper Size</Label>
          <Select
            value={form.paperSize}
            onValueChange={(v) => update("paperSize", v)}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4 (Default)</SelectItem>
              <SelectItem value="A3">A3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Paper Quality</Label>
          <Select
            value={form.paperQuality}
            onValueChange={(v) => update("paperQuality", v)}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="thick">Thick (Premium)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Copies Required</Label>
          <Input
            type="number"
            min={1}
            value={form.copies}
            onChange={(e) => update("copies", parseInt(e.target.value) || 1)}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label>Binding Required?</Label>
        <RadioGroup
          value={form.bindingRequired}
          onValueChange={(v) => update("bindingRequired", v)}
          className="flex gap-4 mt-2"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="yes" /> Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="no" /> No
          </label>
        </RadioGroup>
      </div>

      {form.bindingRequired === "yes" && (
        <div>
          <Label>Binding Type</Label>
          <Select
            value={form.bindingType}
            onValueChange={(v) => update("bindingType", v)}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select binding type" />
            </SelectTrigger>
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
        <RadioGroup
          value={form.deliveryType}
          onValueChange={(v) => update("deliveryType", v)}
          className="flex gap-4 mt-2"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="home" /> Home Delivery
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="pickup" /> Pickup
          </label>
        </RadioGroup>
      </div>

      {form.deliveryType === "home" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Recipient Name *</Label>
            <Input
              value={form.recipientName}
              onChange={(e) => update("recipientName", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Phone Number *</Label>
            <Input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="mt-1.5"
              placeholder="+91"
            />
          </div>
          <div>
            <Label>House / Flat / Block No *</Label>
            <Input
              value={form.houseNo}
              onChange={(e) => update("houseNo", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Address Line 1 *</Label>
            <Input
              value={form.addressLine1}
              onChange={(e) => update("addressLine1", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Apartment / Road / Area</Label>
            <Input
              value={form.addressLine2}
              onChange={(e) => update("addressLine2", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>City *</Label>
            <Input
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>State *</Label>
            <Input
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Pin Code *</Label>
            <Input
              value={form.pincode}
              onChange={(e) => update("pincode", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Nearby Landmark (Optional)</Label>
            <Input
              value={form.landmark}
              onChange={(e) => update("landmark", e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">
        Choose your preferred payment method.
      </p>

      {/* Order Summary */}
      <div className="bg-muted/50 rounded-xl p-4 space-y-2">
        <h3 className="font-display font-semibold text-foreground text-sm">
          Order Summary
        </h3>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Print Type</span>
          <span className="text-card-foreground">
            {form.printType === "bw" ? "B&W" : "Color"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Copies</span>
          <span className="text-card-foreground">{form.copies}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Binding</span>
          <span className="text-card-foreground capitalize">
            {form.bindingRequired === "yes" ? form.bindingType : "None"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery</span>
          <span className="text-card-foreground capitalize">
            {form.deliveryType || "—"}
          </span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-semibold text-sm">
          <span className="text-foreground">Estimated Total</span>
          <span className="text-primary">₹ —</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Final pricing will be confirmed after review.
        </p>
      </div>

      {/* Payment Method */}
      <div>
        <Label>Payment Method</Label>
        <RadioGroup
          value=""
          onValueChange={() => {}}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
        >
          {[
            {
              value: "cod",
              label: "Cash on Delivery",
              desc: "Pay when you receive",
            },
            {
              value: "upi",
              label: "UPI / QR Code",
              desc: "GPay, PhonePe, Paytm",
            },
            {
              value: "card",
              label: "Debit / Credit Card",
              desc: "Visa, MasterCard, RuPay",
            },
            {
              value: "wallet",
              label: "Wallet / Net Banking",
              desc: "Online transfer",
            },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-start gap-3 p-3 rounded-xl border-2 border-border hover:border-primary/30 cursor-pointer transition-all"
            >
              <RadioGroupItem value={opt.value} className="mt-0.5" />
              <div>
                <p className="font-medium text-card-foreground text-sm">
                  {opt.label}
                </p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>

      <p className="text-xs text-muted-foreground">
        🔒 Payment will be processed securely. You can review your order in the
        next step.
      </p>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Review your order details before submitting.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {[
          [
            "Type",
            form.assignmentType === "scratch" ? "From Scratch" : "Upload",
          ],
          ["Subject", form.subjectName],
          ["Title", form.assignmentTitle],
          ["Academic Level", form.academicLevel],
          ["Deadline", form.deadline],
          ["Language", form.language],
          ["Print Type", form.printType === "bw" ? "Black & White" : "Color"],
          ["Paper Size", form.paperSize],
          [
            "Paper Quality",
            form.paperQuality === "normal" ? "Normal" : "Premium",
          ],
          [
            "Binding",
            form.bindingRequired === "yes" ? form.bindingType : "None",
          ],
          ["Copies", String(form.copies)],
          [
            "Delivery",
            form.deliveryType === "home" ? "Home Delivery" : "Pickup",
          ],
          form.deliveryType === "home" ? ["City", form.city] : null,
          form.frontPageRequired === "yes" ? ["Front Page", "Yes"] : null,
        ]
          .filter(Boolean)
          .map(([label, value]) => (
            <div
              key={label as string}
              className="flex justify-between py-2 border-b border-border"
            >
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium text-card-foreground capitalize">
                {value}
              </span>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Assignment Support
          </h1>
          <p className="text-sm text-muted-foreground">
            Create or upload your assignment for printing
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Step {step + 1} of {totalSteps}
          </span>
          <span>{steps[step]?.title}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-1">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex-1 text-center text-xs py-1 rounded transition-colors",
                i <= step
                  ? "text-primary font-medium"
                  : "text-muted-foreground",
              )}
            >
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
          <Button
            variant="default"
            onClick={next}
            disabled={step === 0 && !form.assignmentType}
          >
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
