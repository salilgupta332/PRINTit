// src/components/assignment/steps/StepFrontPage.jsx
export default function StepFrontPage({ data = {}, onChange }) {
  const update = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div>
      <h3>Step 2: Front Page Details</h3>

      <label>Student Name</label>
      <input
        type="text"
        value={data.studentName || ""}
        onChange={(e) => update("studentName", e.target.value)}
        placeholder="Enter student name"
      />

      <label>Roll Number</label>
      <input
        type="text"
        value={data.rollNumber || ""}
        onChange={(e) => update("rollNumber", e.target.value)}
        placeholder="Enter roll number"
      />

      <label>Institute / University</label>
      <input
        type="text"
        value={data.institute || ""}
        onChange={(e) => update("institute", e.target.value)}
        placeholder="Enter institute name"
      />

      <label>Course / Subject</label>
      <input
        type="text"
        value={data.course || ""}
        onChange={(e) => update("course", e.target.value)}
        placeholder="Enter course or subject"
      />
    </div>
  );
}
