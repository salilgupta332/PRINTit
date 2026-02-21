export default function StepFrontPage({ data = {}, onChange }) {
  const update = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const FloatingInput = ({ label, value, onChange }) => (
    <div className="relative group">
      <input
        type="text"
        value={value || ""}
        onChange={onChange}
        placeholder=" "
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

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Step 2: Front Page Details</h3>
        <p className="mt-1 text-sm text-gray-500">Details that will appear on the assignment front page</p>
      </div>

      {/* Student + Roll */}
      <div className="grid grid-cols-2 gap-6">
        <FloatingInput
          label="Student Name"
          value={data.studentName}
          onChange={(e) => update("studentName", e.target.value)}
        />

        <FloatingInput
          label="Roll Number"
          value={data.rollNumber}
          onChange={(e) => update("rollNumber", e.target.value)}
        />
      </div>

      {/* Institute */}
      <FloatingInput
        label="Institute / University"
        value={data.institute}
        onChange={(e) => update("institute", e.target.value)}
      />

      {/* Course */}
      <FloatingInput
        label="Course / Subject"
        value={data.course}
        onChange={(e) => update("course", e.target.value)}
      />
    </div>
  );
}