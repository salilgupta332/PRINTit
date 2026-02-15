import { useRef } from "react";
export default function StepBasicDetails({ data, setData }) {
  const fileRef = useRef(null);
  const update = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const input =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none";
  const label = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <div className="h-full w-full">
      {/* Header */}
      <h3 className="text-xl font-semibold text-gray-900">
        Step 1: Basic Details
      </h3>

      {/* TOP ROW */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <label className={label}>Subject Name</label>
          <input
            type="text"
            value={data.subjectName}
            onChange={(e) => update("subjectName", e.target.value)}
            className={input}
          />
        </div>

        <div>
          <label className={label}>Assignment Type</label>
          <select
            value={data.assignmentType}
            onChange={(e) => update("assignmentType", e.target.value)}
            className={input}
          >
            <option value="">Select</option>
            <option value="student_upload">Student Upload</option>
            <option value="from_scratch">Typing Required</option>
          </select>
        </div>

        {data.assignmentType === "from_scratch" && (
          <div>
            <label className={label}>Assignment Language</label>
            <select
              value={data.language || ""}
              onChange={(e) => update("language", e.target.value)}
              className={input}
            >
              <option value="">Select</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>
        )}
      </div>

      {/* ASSIGNMENT TITLE */}
      <div className="mt-4">
        <label className={label}>Assignment Title</label>
        <input
          type="text"
          value={data.assignmentTitle}
          onChange={(e) => update("assignmentTitle", e.target.value)}
          className={input}
        />
      </div>

      {/* MIDDLE ROW */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Academic Level</label>
          <select
            value={data.academicLevel || ""}
            onChange={(e) => update("academicLevel", e.target.value)}
            className={input}
          >
            
            <option value="school">School</option>
            <option value="college">College</option>
            <option value="university">University</option>
          </select>
        </div>

        <div>
          <label className={label}>Deadline</label>
          <input
            type="date"
            value={data.deadline}
            onChange={(e) => update("deadline", e.target.value)}
            className={input}
          />
        </div>
      </div>

      {/* PROJECT DESCRIPTION */}
      <div className="mt-4">
        <label className={label}>Project Description</label>
        <textarea
          rows={3}
          value={data.description || ""}
          onChange={(e) => update("description", e.target.value)}
          className={`${input} resize-none`}
        />
      </div>

      {/* FILE UPLOAD */}
      {data.assignmentType === "student_upload" && (
        <div className="mt-4">
          <label className={label}>Upload Assignment File</label>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => update("uploadedFiles", e.target.files)}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95"
          >
            📎 Choose File
          </button>

          {/* file name preview */}
          {data.uploadedFiles && data.uploadedFiles.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {data.uploadedFiles[0].name}
            </p>
          )}
        </div>
      )}

      {/* FRONT PAGE + NEXT */}
      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={data.frontPageRequired}
            onChange={(e) => update("frontPageRequired", e.target.checked)}
          />
          Front Page Required
        </label>
      </div>
    </div>
  );
}
