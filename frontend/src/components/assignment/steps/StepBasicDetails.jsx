export default function StepBasicDetails({ data, setData }) {
  const update = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <h3>Step 1: Basic Details</h3>

      <label>Assignment Type</label>
      <select
        value={data.assignmentType}
        onChange={(e) => update("assignmentType", e.target.value)}
      >
        <option value="">Select</option>
        <option value="student_upload">Student Upload</option>
        <option value="from_scratch">Typing Required</option>
      </select>

      <label>Assignment Title</label>
      <input
        type="text"
        value={data.assignmentTitle}
        onChange={(e) => update("assignmentTitle", e.target.value)}
      />

      <label>Subject Name</label>
      <input
        type="text"
        value={data.subjectName}
        onChange={(e) => update("subjectName", e.target.value)}
      />

      <label>Deadline</label>
      <input
        type="date"
        value={data.deadline}
        onChange={(e) => update("deadline", e.target.value)}
      />

      {/* ✅ FILE UPLOAD (ONLY FOR STUDENT_UPLOAD) */}
      {data.assignmentType === "student_upload" && (
        <>
          <label>Upload Assignment File</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              update("uploadedFiles", e.target.files)
            }
          />
        </>
      )}
      {data.assignmentType === "from_scratch" && (
  <>
    <label>Assignment Language</label>
    <select
      value={data.language || ""}
      onChange={(e) =>
        update("language", e.target.value)
      }
    >
      <option value="">Select Language</option>
      <option value="english">English</option>
      <option value="hindi">Hindi</option>
    </select>
  </>
)}

      <label>
        <input
          type="checkbox"
          checked={data.frontPageRequired}
          onChange={(e) => update("frontPageRequired", e.target.checked)}
        />
        &nbsp; Front Page Required
      </label>
    </div>
  );
}
