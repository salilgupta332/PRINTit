function FrontPageDetailsForm({ value, onChange }) {
  const update = (key, val) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Front Page Details
        </h3>
        <p className="text-sm text-gray-500">
          Information to be printed on the front page
        </p>
      </div>

      {/* Institution + Student Name */}
      <div className="grid grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Institution Name"
          value={value.institutionName || ""}
          onChange={(e) =>
            update("institutionName", e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Student Name"
          value={value.studentName || ""}
          onChange={(e) =>
            update("studentName", e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Course + Semester */}
      <div className="grid grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Course"
          value={value.course || ""}
          onChange={(e) => update("course", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Semester"
          value={value.semester || ""}
          onChange={(e) => update("semester", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}

export default FrontPageDetailsForm;
