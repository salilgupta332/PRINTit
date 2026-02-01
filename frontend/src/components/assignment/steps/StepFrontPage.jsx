// src/components/assignment/steps/StepFrontPage.jsx
export default function StepFrontPage({ data = {}, onChange }) {
  const update = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900">
          Step 2: Front Page Details
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Details that will appear on the assignment front page
        </p>
      </div>

      {/* Student + Roll */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Student Name
          </label>
          <input
            type="text"
            value={data.studentName || ""}
            onChange={(e) => update("studentName", e.target.value)}
            placeholder="Enter student name"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3
                       focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Roll Number
          </label>
          <input
            type="text"
            value={data.rollNumber || ""}
            onChange={(e) => update("rollNumber", e.target.value)}
            placeholder="Enter roll number"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3
                       focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Institute */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Institute / University
        </label>
        <input
          type="text"
          value={data.institute || ""}
          onChange={(e) => update("institute", e.target.value)}
          placeholder="Enter institute name"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Course */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Course / Subject
        </label>
        <input
          type="text"
          value={data.course || ""}
          onChange={(e) => update("course", e.target.value)}
          placeholder="Enter course or subject"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
