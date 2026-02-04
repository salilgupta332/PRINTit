// src/components/assignment/AssignmentWizard.jsx
import { useState } from "react";

import StepBasicDetails from "./steps/StepBasicDetails";
import StepFrontPage from "./steps/StepFrontPage";
import StepPrintPreferences from "./steps/StepPrintPreferences";
import StepAddress from "./steps/StepAddress";
import StepPayment from "./steps/StepPayment";

import { createAssignment } from "../../api/assignmentApi";

function AssignmentWizard() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    assignmentType: "",
    assignmentTitle: "",
    subjectName: "",
    academicLevel: "college",
    deadline: "",
    language: "",
    uploadedFiles: [],
    frontPageRequired: false,

    frontPageDetails: {},
    printPreferences: {},
    address: {},
  });

  const { frontPageRequired } = formData;

  const TOTAL_STEPS = frontPageRequired ? 5 : 4;
  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // ✅ FINAL SUBMIT
  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      // basic fields
      fd.append("assignmentType", formData.assignmentType);
      fd.append("assignmentTitle", formData.assignmentTitle);
      fd.append("subjectName", formData.subjectName);
      fd.append("academicLevel", formData.academicLevel);
      fd.append("deadline", formData.deadline);
      fd.append("frontPageRequired", formData.frontPageRequired);
      if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
        Array.from(formData.uploadedFiles).forEach((file) => {
          fd.append("uploadedFiles", file);
        });
      }
      if (formData.language) {
        fd.append("language", formData.language);
      }

      // nested objects
      fd.append(
        "frontPageDetails",
        JSON.stringify(formData.frontPageDetails || {}),
      );
      fd.append(
        "printPreferences",
        JSON.stringify(formData.printPreferences || {}),
      );
      fd.append("address", JSON.stringify(formData.address || {}));

      await createAssignment(fd);

      alert("🎉 Assignment created successfully!");
      console.log("SUBMITTED DATA ✅", formData);
    } catch (error) {
      console.error("SUBMIT ERROR:", error);

      const backendMessage =
        error?.response?.data?.message || error?.message || "Unknown error";

      alert(`❌ ${backendMessage}`);
    }
  };

  return (
    <div className="wizard-container">
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        Create Assignment
      </h2>

      {/* Progress */}
      <div className="progress-text">{progress}% completed</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* STEP 1 */}
      {step === 1 && <StepBasicDetails data={formData} setData={setFormData} />}

      {/* STEP 2 (Front Page – conditional) */}
      {step === 2 && frontPageRequired && (
        <StepFrontPage
          data={formData.frontPageDetails}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              frontPageDetails: val,
            }))
          }
        />
      )}

      {/* STEP 3 (Print Preferences) */}
      {(step === 2 && !frontPageRequired) ||
      (step === 3 && frontPageRequired) ? (
        <StepPrintPreferences
          onChange={(updater) =>
            setFormData((prev) => ({
              ...prev,
              printPreferences: updater(prev.printPreferences || {}),
            }))
          }
        />
      ) : null}

      {/* STEP 4 (Address) */}
      {(step === 3 && !frontPageRequired) ||
      (step === 4 && frontPageRequired) ? (
        <StepAddress
          onChange={(updater) =>
            setFormData((prev) => ({
              ...prev,
              address: updater(prev.address || {}),
            }))
          }
        />
      ) : null}

      {/* STEP 5 (Payment / Review) */}
      {step === TOTAL_STEPS && <StepPayment />}

      {/* Navigation */}

      <div className="nav-buttons">
        {step > 1 && (
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            onClick={back}
          >
            Back
          </button>
        )}

        {step < TOTAL_STEPS && (
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            onClick={next}
          >
            Next
          </button>
        )}

        {step === TOTAL_STEPS && (
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default AssignmentWizard;
