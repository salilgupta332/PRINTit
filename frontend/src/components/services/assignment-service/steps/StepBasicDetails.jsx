import { useRef } from "react";

function FloatingInput({ label, value, onChange, type = "text" }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder=" "
        className="peer w-full rounded-lg border border-gray-300 bg-white px-3 pt-5 pb-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
      />
      <label
        className="absolute left-3 top-2 text-xs text-gray-500 transition-all \
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm \
      peer-placeholder-shown:text-gray-400 \
      peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600"
      >
        {label}
      </label>
    </div>
  );
}

function TypeCard({ title, desc, active, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border p-4 transition-all w-full
      ${
        active
          ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
          : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
      }`}
    >
      <div className="text-xl">{icon}</div>
      <div className="mt-2 font-medium">{title}</div>
      <div className="text-sm text-gray-500">{desc}</div>
    </button>
  );
}

export default function StepBasicDetails({ data, setData }) {
  const fileRef = useRef(null);

  const update = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const levels = ["school", "college", "university"];

  const daysLeft = data.deadline
    ? Math.ceil((new Date(data.deadline) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="h-full w-full space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        Step 1: Basic Details
      </h3>

      {/* Name + Subject */}
      <div className="grid grid-cols-2 gap-4">
        <FloatingInput
          label="Your Full Name"
          value={data.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />

        <FloatingInput
          label="Subject Name"
          value={data.subjectName}
          onChange={(e) => update("subjectName", e.target.value)}
        />
      </div>

      {/* Assignment Type Cards */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Assignment Type</p>
        <div className="grid grid-cols-2 gap-4">
          <TypeCard
            title="Upload File"
            desc="You already have assignment"
            icon="📄"
            active={data.assignmentType === "student_upload"}
            onClick={() => update("assignmentType", "student_upload")}
          />
          <TypeCard
            title="Typing Required"
            desc="We type handwritten work"
            icon="✍️"
            active={data.assignmentType === "from_scratch"}
            onClick={() => update("assignmentType", "from_scratch")}
          />
        </div>
      </div>

      {/* Language */}
      {data.assignmentType === "from_scratch" && (
        <div className="flex gap-2">
          {["english", "hindi"].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => update("language", lang)}
              className={`px-4 py-1.5 rounded-full text-sm border transition capitalize
              ${
                data.language === lang
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 text-gray-600 hover:border-indigo-400"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}

      {/* Title */}
      <div className="grid grid-cols-2 gap-4 items-start">
        <FloatingInput
          label="Assignment Title"
          value={data.assignmentTitle}
          onChange={(e) => update("assignmentTitle", e.target.value)}
        />

        <div className="space-y-1">
          <FloatingInput
            type="date"
            label="Deadline"
            value={data.deadline}
            onChange={(e) => update("deadline", e.target.value)}
          />
          {daysLeft !== null && (
            <p className="text-xs text-gray-500">{daysLeft} days left</p>
          )}
        </div>
      </div>
     
      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Academic Level</p>
          <div className="flex gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => update("academicLevel", lvl)}
                className={`px-4 py-1.5 rounded-full text-sm border transition capitalize
                ${
                  data.academicLevel === lvl
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-300 text-gray-600 hover:border-indigo-400"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="relative">
        
        <textarea
          rows={3}
          value={data.description || ""}
          onChange={(e) => update("description", e.target.value)}
          placeholder=" "
          className="peer w-full rounded-lg border border-gray-300 bg-white px-3 pt-5 pb-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition resize-none"
        />
        <label
          className="absolute left-3 top-2 text-xs text-gray-500 transition-all \
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm \
        peer-placeholder-shown:text-gray-400 \
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600"
        >
          Project Description
        </label>
      </div>

      {/* File Upload */}
      {data.assignmentType === "student_upload" && (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => update("uploadedFiles", e.target.files)}
            className="hidden"
          />

          <div
            onClick={() => fileRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition"
          >
            <div className="text-3xl">📎</div>
            <p className="text-sm mt-2 font-medium">Click or drag file here</p>
            <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 20MB)</p>
          </div>

          {data.uploadedFiles && data.uploadedFiles.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {data.uploadedFiles[0].name}
            </p>
          )}
        </div>
      )}

      {/* Front Page Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Front Page Required</span>
        <button
          type="button"
          onClick={() => update("frontPageRequired", !data.frontPageRequired)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition
            ${data.frontPageRequired ? "bg-indigo-600" : "bg-gray-300"}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow transform transition 
            ${data.frontPageRequired ? "translate-x-6" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
