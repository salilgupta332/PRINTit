export default function StatusDropdown({ value, onChange, disabled = false }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`rounded border px-3 py-2 text-sm capitalize
        ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-white border-gray-300 hover:border-indigo-500"
        }
      `}
    >
      <option value="requested">Requested</option>
      <option value="in_progress">In Progress</option>
      <option value="printing">Printing</option>
      <option value="dispatched">Dispatched</option>
      <option value="delivered">Delivered</option>
    </select>
  );
}
