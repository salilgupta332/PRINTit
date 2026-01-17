// src/components/assignment/steps/StepPrintPreferences.jsx
export default function StepPrintPreferences({ onChange }) {
  const update = (field, value) => {
    onChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <h3>Step 3: Print Preferences</h3>

      <label>Print Color</label>
      <select onChange={(e) => update("color", e.target.value)}>
        <option value="">Select</option>
        <option value="black_white">Black & White</option>
        <option value="color">Color</option>
      </select>

      <label>Paper Size</label>
      <select onChange={(e) => update("paperSize", e.target.value)}>
        <option value="">Select</option>
        <option value="A4">A4</option>
        <option value="A3">A3</option>
      </select>

      <label>Print Side</label>
      <select onChange={(e) => update("side", e.target.value)}>
        <option value="">Select</option>
        <option value="single">Single Side</option>
        <option value="double">Double Side</option>
      </select>

      <label>Number of Copies</label>
      <input
        type="number"
        min="1"
        defaultValue={1}
        onChange={(e) => update("copies", e.target.value)}
      />
    </div>
  );
}
