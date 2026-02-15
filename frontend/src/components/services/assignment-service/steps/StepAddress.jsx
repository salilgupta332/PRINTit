function AddressForm({ onChange }) {
  const update = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Step 3: Delivery Address
        </h3>
      </div>

      {/* Full Name + Phone */}
      <div className="grid grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => update("fullName", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          onChange={(e) => update("phone", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Address Line (Full Width) */}
      <input
        type="text"
        placeholder="Address Line"
        onChange={(e) => update("addressLine", e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3
                   focus:border-indigo-500 focus:ring-indigo-500"
      />

      {/* City, Pin Code, State */}
      <div className="grid grid-cols-3 gap-6">
        <input
          type="text"
          placeholder="City"
          onChange={(e) => update("city", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Pin Code"
          onChange={(e) => update("pinCode", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="State"
          onChange={(e) => update("state", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}

export default AddressForm;
