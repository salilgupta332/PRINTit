import { useState, useRef, useEffect } from "react";

function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 bg-white hover:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
      >
        <span>{selected.label}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      <div className={`absolute z-20 mt-2 w-full rounded-lg border bg-white shadow-lg overflow-hidden transition-all duration-200 ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => { onChange(opt.value); setOpen(false); }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 transition ${value === opt.value ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-700"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PrintPreferences({ onChange }) {
  const [state, setState] = useState({
    paperSize: "A4",
    printType: "black_white",
    printSide: "single",
    copies: 1,
    bindingRequired: false,
    bindingType: "spiral",
  });

  const update = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
    onChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Step 2: Print Preferences</h3>
        <p className="text-sm text-gray-500">Choose how you want your assignment printed</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Dropdown
          label="Paper Size"
          value={state.paperSize}
          onChange={(v)=>update("paperSize",v)}
          options={[
            {label:"A4 - Standard", value:"A4"},
            {label:"A3 - Large pages", value:"A3"}
          ]}
        />

        <Dropdown
          label="Print Color"
          value={state.printType}
          onChange={(v)=>update("printType",v)}
          options={[
            {label:"Black & White", value:"black_white"},
            {label:"Color", value:"color"}
          ]}
        />

        <Dropdown
          label="Print Side"
          value={state.printSide}
          onChange={(v)=>update("printSide",v)}
          options={[
            {label:"Single Side", value:"single"},
            {label:"Double Side", value:"double"}
          ]}
        />
      </div>

      {/* Copies Stepper */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Copies</label>
        <div className="flex items-center gap-3">
          <button onClick={()=>update("copies",Math.max(1,state.copies-1))} className="w-10 h-10 rounded-lg border hover:bg-gray-50">−</button>
          <div className="px-6 py-2 border rounded-lg min-w-[60px] text-center font-medium">{state.copies}</div>
          <button onClick={()=>update("copies",state.copies+1)} className="w-10 h-10 rounded-lg border hover:bg-gray-50">+</button>
        </div>
      </div>

      {/* Binding */}
      <div className="grid grid-cols-2 gap-6 items-start">
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <p className="text-sm font-medium text-gray-800">Binding Required</p>
            <p className="text-xs text-gray-500">Bundle pages professionally</p>
          </div>
          <button type="button" onClick={()=>update("bindingRequired",!state.bindingRequired)} className={`w-12 h-6 flex items-center rounded-full p-1 transition ${state.bindingRequired?"bg-indigo-600":"bg-gray-300"}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow transform transition ${state.bindingRequired?"translate-x-6":""}`} />
          </button>
        </div>

        {state.bindingRequired ? (
          <Dropdown
            label="Binding Type"
            value={state.bindingType}
            onChange={(v)=>update("bindingType",v)}
            options={[
              {label:"Spiral",value:"spiral"},
              {label:"Staple",value:"staple"},
              {label:"Hard Binding",value:"hard"}
            ]}
          />
        ) : (
    <div></div>
        )}
      </div>
    </div>
  );
}
