import { useState } from "react";
import { createAssignment } from "../../api/assignmentApi";
import FrontPageDetailsForm from "./FrontPageDetailsForm";
import PrintPreferences from "./PrintPreferences";
import AddressForm from "./AddressForm";

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
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl space-y-10 rounded-2xl bg-white p-8 shadow-xl"
    >
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Create New Assignment
        </h2>
        <p className="mt-2 text-gray-500">
          Fill in the details to start your printing process
        </p>
      </div>

      {/* ASSIGNMENT TYPE */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Assignment Type
        </label>
        <select
          value={assignmentType}
          onChange={(e) => setAssignmentType(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select</option>
          <option value="student_upload">Student Upload</option>
          <option value="from_scratch">From Scratch</option>
        </select>
      </div>

      {/* COMMON FIELDS */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Subject Name
          </label>
          <input
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Academic Level
          </label>
          <select
            value={academicLevel}
            onChange={(e) => setAcademicLevel(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="school">School</option>
            <option value="college">College</option>
            <option value="university">University</option>
          </select>
        </div>
      </div>

      {/* DEADLINE */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Deadline
        </label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* STUDENT UPLOAD */}
      {assignmentType === "student_upload" && (
        <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50 p-6">
          <label className="block text-sm font-semibold text-indigo-700">
            Upload Assignment (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setUploadedFile(e.target.files[0])}
            required
            className="mt-3 block w-full text-sm text-gray-600"
          />
        </div>
      )}

      {/* FRONT PAGE TOGGLE */}
      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
        <input
          type="checkbox"
          checked={frontPageRequired}
          onChange={(e) => setFrontPageRequired(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-sm font-medium text-gray-700">
          Front Page Required
        </span>
      </div>

      {/* FRONT PAGE DETAILS */}
      {frontPageRequired && (
        <div className="rounded-xl border border-gray-200 p-6">
          <FrontPageDetailsForm
            value={frontPageDetails}
            onChange={setFrontPageDetails}
          />
        </div>
      )}

      {/* PRINT & ADDRESS */}
      <div className="grid gap-8">
        <div className="rounded-xl border border-gray-200 p-6">
          <PrintPreferences onChange={setPrintPreferences} />
        </div>

        <div className="rounded-xl border border-gray-200 p-6">
          <AddressForm onChange={setAddress} />
        </div>
      </div>

      {/* SUBMIT */}
      <div className="pt-4 text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-500 transition"
        >
          Submit Assignment
        </button>
      </div>
    </form>
  );
}

export default AssignmentForm;
