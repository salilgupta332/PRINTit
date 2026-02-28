import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Store,
  Clock,
  FileText,
  MapPin,
  Map,
  Hash,
  Check,
} from "lucide-react";
import AuthInput from "@/components/AuthInput";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import adminBg from "@/assets/admin-bg.jpg";
import ShopLocationPicker from "@/components/ShopLocationPicker";
const STEPS = [
  { label: "Basic Details", icon: User },
  { label: "Shop Info", icon: Store },
  { label: "Location", icon: MapPin },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AdminSignUp = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [workingDays, setWorkingDays] = useState<string[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",

    shopName: "",
    description: "",
    openTime: "",
    closeTime: "",
    gstin: "",

    area: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
    lat: "",
    lng: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        );
        const data = await res.json();

        const address = data.address || {};

        handleChange("lat", lat.toString());
        handleChange("lng", lng.toString());

        handleChange("area", address.suburb || address.neighbourhood || "");
        handleChange(
          "city",
          address.city || address.town || address.village || "",
        );
        handleChange("state", address.state || "");
        handleChange("pincode", address.postcode || "");

        // Optional: auto fill full address
        handleChange("address", data.display_name || "");
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
      }
    });
  };
  const toggleDay = (day: string) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // move steps
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    // validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,

        shop: {
          name: formData.shopName,
          description: formData.description,
          gstin: formData.gstin,
          workingHours: {
            open: formData.openTime,
            close: formData.closeTime,
            workingDays,
          },
        },

        location: {
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          address: formData.address,
          landmark: formData.landmark,
          lat: Number(formData.lat),
          lng: Number(formData.lng),
        },
      };

      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess(true);
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-theme flex min-h-screen">
      {/* LEFT PANEL */}
      <div className="auth-split-left">
        <img
          src={adminBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-md text-center px-8 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
            <Store size={40} className="text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold font-display text-primary-foreground">
            Register Your Shop
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Set up your business profile in just 3 simple steps and start
            reaching customers today.
          </p>
          {/* Step info on left */}
          <div className="space-y-3 pt-6">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  i === step
                    ? "bg-primary-foreground/20 backdrop-blur"
                    : "opacity-60"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    i < step
                      ? "bg-green-400"
                      : i === step
                        ? "bg-primary-foreground"
                        : "bg-primary-foreground/30"
                  }`}
                >
                  {i < step ? (
                    <Check size={16} className="text-primary-foreground" />
                  ) : (
                    <s.icon
                      size={16}
                      className={
                        i === step ? "text-primary" : "text-primary-foreground"
                      }
                    />
                  )}
                </div>
                <span className="text-primary-foreground font-medium text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-split-right">
        <div className="auth-form-container">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 text-green-700 p-3 rounded">
              Shop registered successfully! Redirecting…
            </div>
          )}
          <div className="flex items-center gap-2 mb-2">
            {STEPS.map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div
                  className={`step-indicator ${
                    i < step
                      ? "step-done"
                      : i === step
                        ? "step-active"
                        : "step-pending"
                  }`}
                >
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`step-connector mx-2 ${
                      i < step ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              Step {step + 1} of 3
            </p>
            <h1 className="text-2xl font-bold font-display text-foreground">
              {STEPS[step].label}
            </h1>
          </div>

          <form onSubmit={handleNext} className="space-y-4">
            {/* STEP 0 */}
            {step === 0 && (
              <>
                <AuthInput
                  label="Full Name"
                  id="fullname"
                  required
                  value={formData.fullName}
                  onChange={(e: any) =>
                    handleChange("fullName", e.target.value)
                  }
                  icon={<User size={18} />}
                />
                <AuthInput
                  label="Email Address"
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e: any) => handleChange("email", e.target.value)}
                  icon={<Mail size={18} />}
                />
                <AuthInput
                  label="Mobile Number"
                  id="mobile"
                  required
                  value={formData.mobileNumber}
                  onChange={(e: any) =>
                    handleChange("mobileNumber", e.target.value)
                  }
                  icon={<Phone size={18} />}
                />
                <AuthInput
                  label="Password"
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e: any) =>
                    handleChange("password", e.target.value)
                  }
                  icon={<Lock size={18} />}
                />
                <AuthInput
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e: any) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  icon={<Lock size={18} />}
                />
              </>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <AuthInput
                  label="Shop Name"
                  id="shopName"
                  required
                  value={formData.shopName}
                  onChange={(e: any) =>
                    handleChange("shopName", e.target.value)
                  }
                  icon={<Store size={18} />}
                />
                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                <AuthInput
                  label="Opening Time"
                  id="openTime"
                  type="time"
                  required
                  value={formData.openTime}
                  onChange={(e: any) =>
                    handleChange("openTime", e.target.value)
                  }
                  icon={<Clock size={18} />}
                />
                <AuthInput
                  label="Closing Time"
                  id="closeTime"
                  type="time"
                  required
                  value={formData.closeTime}
                  onChange={(e: any) =>
                    handleChange("closeTime", e.target.value)
                  }
                  icon={<Clock size={18} />}
                />
                <AuthInput
                  label="GSTIN"
                  id="gstin"
                  value={formData.gstin}
                  onChange={(e: any) => handleChange("gstin", e.target.value)}
                  icon={<FileText size={18} />}
                />
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="w-full mb-3 py-2 rounded-lg bg-primary text-white font-medium"
                >
                  📍 Use Current Location
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AuthInput
                    label="Area"
                    id="area"
                    required
                    value={formData.area}
                    onChange={(e: any) => handleChange("area", e.target.value)}
                    icon={<MapPin size={18} />}
                  />

                  <AuthInput
                    label="City"
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e: any) => handleChange("city", e.target.value)}
                    icon={<MapPin size={18} />}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AuthInput
                    label="State"
                    id="state"
                    required
                    value={formData.state}
                    onChange={(e: any) => handleChange("state", e.target.value)}
                    icon={<MapPin size={18} />}
                  />
                  <AuthInput
                    label="Pincode"
                    id="pincode"
                    required
                    value={formData.pincode}
                    onChange={(e: any) =>
                      handleChange("pincode", e.target.value)
                    }
                    icon={<Hash size={18} />}
                  />
                </div>
                <Textarea
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
                <ShopLocationPicker
                  lat={formData.lat ? Number(formData.lat) : null}
                  lng={formData.lng ? Number(formData.lng) : null}
                  address={`${formData.address}, ${formData.area}, ${formData.city}, ${formData.state}, ${formData.pincode}`}
                  onLocationChange={(lat, lng) => {
                    handleChange("lat", lat.toString());
                    handleChange("lng", lng.toString());
                  }}
                />
              </>
            )}

            <button type="submit" className="auth-btn-primary w-full">
              {loading
                ? "Creating..."
                : step < 2
                  ? "Continue"
                  : "Register Shop"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <Link to="/signin" className="text-primary font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
