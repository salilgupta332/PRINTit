// src/components/assignment/steps/StepAddress.jsx
export default function StepAddress({ onChange }) {
  const update = (field, value) => {
    onChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <h3>Step 4: Delivery Address</h3>

      <label>Full Name</label>
      <input
        type="text"
        placeholder="Enter full name"
        onChange={(e) => update("name", e.target.value)}
      />

      <label>Phone Number</label>
      <input
        type="tel"
        placeholder="Enter phone number"
        onChange={(e) => update("phone", e.target.value)}
      />

      <label>Address Line</label>
      <input
        type="text"
        placeholder="House no, Street, Area"
        onChange={(e) => update("line1", e.target.value)}
      />

      <label>City</label>
      <input
        type="text"
        placeholder="City"
        onChange={(e) => update("city", e.target.value)}
      />

      <label>State</label>
      <input
        type="text"
        placeholder="State"
        onChange={(e) => update("state", e.target.value)}
      />

      <label>Pincode</label>
      <input
        type="text"
        placeholder="Pincode"
        onChange={(e) => update("pincode", e.target.value)}
      />
    </div>
  );
}
