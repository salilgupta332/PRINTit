function AddressForm({ onChange }) {
  const update = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <label>House / Flat</label>
      <input onChange={(e) => update("house", e.target.value)} />

      <label>Area / Road</label>
      <input onChange={(e) => update("area", e.target.value)} />

      <label>City</label>
      <input onChange={(e) => update("city", e.target.value)} />

      <label>State</label>
      <input onChange={(e) => update("state", e.target.value)} />

      <label>Pin Code</label>
      <input onChange={(e) => update("pinCode", e.target.value)} />
    </>
  );
}

export default AddressForm;
