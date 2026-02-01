import { useState } from "react";

function PrintPreferences({ onChange }) {
  const [bindingRequired, setBindingRequired] = useState(false);

  const update = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Step 2: Print Preferences
        </h3>
        <p className="text-sm text-gray-500">
          Choose how you want your assignment printed
        </p>
      </div>

      {/* Top Row: 3 inputs */}
      <div className="grid grid-cols-3 gap-6">
        {/* Paper Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paper Size
          </label>
          <select
            onChange={(e) => update("paperSize", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2
                       focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="A4">A4</option>
            <option value="A3">A3</option>
          </select>
        </div>

        {/* Print Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Print Color
          </label>
          <select
            onChange={(e) => update("printType", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2
                       focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="black_white">Black & White</option>
            <option value="color">Color</option>
          </select>
        </div>

        {/* Print Side */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Print Side
          </label>
          <select
            onChange={(e) => update("printSide", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2
                       focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="single">Single Side</option>
            <option value="double">Double Side</option>
          </select>
        </div>
      </div>

      {/* Number of Copies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Copies
        </label>
        <input
          type="number"
          min="1"
          defaultValue={1}
          onChange={(e) => update("copies", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Binding Section */}
      <div className="grid grid-cols-2 gap-6 items-end">
        {/* Binding Required */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={bindingRequired}
            onChange={(e) => {
              setBindingRequired(e.target.checked);
              update("bindingRequired", e.target.checked);
            }}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600
                       focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Binding Required
          </span>
        </div>

        {/* ✅ Binding Type (ONLY when required) */}
        {bindingRequired && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Binding Type
            </label>
            <select
              onChange={(e) => update("bindingType", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="spiral">Spiral</option>
              <option value="staple">Staple</option>
              <option value="hard">Hard Binding</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrintPreferences;
