export default function StepBasicDetails({ data, setData }) {
  const update = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900">
          Step 1: Basic Details
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Tell us about your assignment
        </p>
      </div>

      {/* Assignment Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Assignment Type
        </label>
        <select
          value={data.assignmentType}
          onChange={(e) => update("assignmentType", e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2
                     focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select</option>
          <option value="student_upload">Student Upload</option>
          <option value="from_scratch">Typing Required</option>
        </select>
      </div>

      {/* Assignment Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Assignment Title
        </label>
        <input
          type="text"
          value={data.assignmentTitle}
          onChange={(e) => update("assignmentTitle", e.target.value)}
          placeholder="Enter assignment title"
          className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Subject Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Subject Name
        </label>
        <input
          type="text"
          value={data.subjectName}
          onChange={(e) => update("subjectName", e.target.value)}
          placeholder="Enter subject name"
          className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Deadline
        </label>
        <input
          type="date"
          value={data.deadline}
          onChange={(e) => update("deadline", e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2
                     focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Student Upload */}
      {data.assignmentType === "student_upload" && (
        <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50 p-6">
          <label className="block text-sm font-semibold text-indigo-700">
            Upload Assignment File
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => update("uploadedFiles", e.target.files)}
            className="mt-3 block w-full text-sm text-gray-600"
          />
        </div>
      )}

      {/* From Scratch Language */}
      {data.assignmentType === "from_scratch" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Assignment Language
          </label>
          <select
            value={data.language || ""}
            onChange={(e) => update("language", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2
                       focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
      )}

      {/* Front Page Checkbox */}
      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
        <input
          type="checkbox"
          checked={data.frontPageRequired}
          onChange={(e) =>
            update("frontPageRequired", e.target.checked)
          }
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-sm font-medium text-gray-700">
          Front Page Required
        </span>
      </div>
    </div>
  );
}
