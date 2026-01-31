function PrintPreferences({ onChange }) {
  const update = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <label>Print Type</label>
      <select onChange={(e) => update("printType", e.target.value)}>
        <option value="black_white">Black & White</option>
        <option value="color">Color</option>
      </select>

      <label>Paper Size</label>
      <select onChange={(e) => update("paperSize", e.target.value)}>
        <option value="A4">A4</option>
        <option value="A3">A3</option>
      </select>

      <label>Binding Required</label>
      <input
        type="checkbox"
        onChange={(e) => update("bindingRequired", e.target.checked)}
      />

      <label>Binding Type</label>
      <select onChange={(e) => update("bindingType", e.target.value)}>
        <option value="spiral">Spiral</option>
        <option value="staple">Staple</option>
        <option value="hard">Hard Binding</option>
      </select>
    </>
  );
}

export default PrintPreferences;
