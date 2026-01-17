import { useState } from "react";
import { createAssignment } from "../../api/assignmentApi";
import FrontPageDetailsForm from "./FrontPageDetailsForm";
import PrintPreferences from "./PrintPreferences";
import AddressForm from "./AddressForm";
// import "./assignmentForm.css";
function AssignmentForm({ onCreated }) {
  const [assignmentType, setAssignmentType] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [academicLevel, setAcademicLevel] = useState("college");
  const [deadline, setDeadline] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const [frontPageRequired, setFrontPageRequired] = useState(false);
  const [frontPageDetails, setFrontPageDetails] = useState({});
  const [printPreferences, setPrintPreferences] = useState({});
  const [address, setAddress] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("assignmentType", assignmentType);
    formData.append("subjectName", subjectName);
    formData.append("academicLevel", academicLevel);
    formData.append("deadline", deadline);
    formData.append("frontPageRequired", frontPageRequired);

    if (uploadedFile) {
      formData.append("uploadedFiles", uploadedFile);
    }

    if (frontPageRequired) {
      formData.append("frontPageDetails", JSON.stringify(frontPageDetails));
    }

    formData.append("printPreferences", JSON.stringify(printPreferences));

    formData.append("address", JSON.stringify(address));

    try {
      const res = await createAssignment(formData);
      onCreated(res.assignment._id);
    } catch (err) {
      alert(err.message || "Failed to create assignment");
    }
  };

  return (
    <form className="assignment-form" onSubmit={handleSubmit}>
      {/* Assignment Type */}
      <label>Assignment Type</label>
      <select
        value={assignmentType}
        onChange={(e) => setAssignmentType(e.target.value)}
        required
      >
        <option value="">Select</option>
        <option value="student_upload">Student Upload</option>
        <option value="from_scratch">From Scratch</option>
      </select>

      {/* COMMON FIELDS */}
      <label>Subject Name</label>
      <input
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        required
      />

      <label>Academic Level</label>
      <select
        value={academicLevel}
        onChange={(e) => setAcademicLevel(e.target.value)}
      >
        <option value="school">School</option>
        <option value="college">College</option>
        <option value="university">University</option>
      </select>

      <label>Deadline</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />

      {/* STUDENT UPLOAD */}
      {assignmentType === "student_upload" && (
        <>
          <label>Upload Assignment (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setUploadedFile(e.target.files[0])}
            required
          />
        </>
      )}

      {/* FRONT PAGE */}
      <div className="checkbox-row">
        <input
          type="checkbox"
          checked={frontPageRequired}
          onChange={(e) => setFrontPageRequired(e.target.checked)}
        />
        <span>Front Page Required</span>
      </div>

      {frontPageRequired && (
        <FrontPageDetailsForm
          value={frontPageDetails}
          onChange={setFrontPageDetails}
        />
      )}

      {/* PRINT + ADDRESS */}
      <PrintPreferences onChange={setPrintPreferences} />
      <AddressForm onChange={setAddress} />

      <button type="submit">Submit Assignment</button>
    </form>
  );
}

export default AssignmentForm;
