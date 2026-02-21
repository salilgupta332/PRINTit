import { useState } from "react";

function FloatingInput({ label, onChange, type = "text" }) {
  return (
    <div className="relative group">
      <input
        type={type}
        placeholder=" "
        onChange={onChange}
        className="peer w-full rounded-xl border border-gray-300 bg-white px-4 pt-5 pb-2 text-sm outline-none transition
        focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 group-hover:border-indigo-300"
      />
      <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
      peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">
        {label}
      </label>
    </div>
  );
}

function DeliveryCard({ title, desc, active, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 w-full text-left rounded-xl border p-4 transition-all
      ${active ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100" : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"}`}
    >
      <div className="text-xl">{icon}</div>
      <div>
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{desc}</div>
      </div>
    </button>
  );
}

export default function AddressForm({ onChange }) {
  const [deliveryType, setDeliveryType] = useState("home_delivery");

  const update = (key, value) => {
    if (key === "deliveryType") setDeliveryType(value);
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Step 3: Delivery Address</h3>
        <p className="text-sm text-gray-500">Choose how you want to receive your order</p>
      </div>

      {/* Delivery Type */}
      <div className="grid grid-cols-2 gap-4">
        <DeliveryCard
          title="Home Delivery"
          desc="We deliver to your address"
          icon="🏠"
          active={deliveryType === "home_delivery"}
          onClick={() => update("deliveryType", "home_delivery")}
        />
        <DeliveryCard
          title="Store Pickup"
          desc="Collect from shop"
          icon="🏪"
          active={deliveryType === "pickup"}
          onClick={() => update("deliveryType", "pickup")}
        />
      </div>

      {deliveryType === "home_delivery" && (
        <div className="space-y-6">
          {/* Name + Phone */}
          <div className="grid grid-cols-2 gap-6">
            <FloatingInput label="Full Name" onChange={(e)=>update("fullName",e.target.value)} />
            <FloatingInput label="Phone Number" type="tel" onChange={(e)=>update("phone",e.target.value)} />
          </div>

          {/* Address Line */}
          <FloatingInput label="Address Line" onChange={(e)=>update("addressLine",e.target.value)} />

          {/* City Pin State */}
          <div className="grid grid-cols-3 gap-6">
            <FloatingInput label="City" onChange={(e)=>update("city",e.target.value)} />
            <FloatingInput label="Pin Code" onChange={(e)=>update("pinCode",e.target.value)} />
            <FloatingInput label="State" onChange={(e)=>update("state",e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
}