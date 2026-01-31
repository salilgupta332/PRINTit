function FrontPageDetailsForm({ value, onChange }) {
  const update = (key, val) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <>
      <label>Institution Name</label>
      <input onChange={(e) => update("institutionName", e.target.value)} />

      <label>Student Name</label>
      <input onChange={(e) => update("studentName", e.target.value)} />

      <label>Course</label>
      <input onChange={(e) => update("course", e.target.value)} />

      <label>Semester</label>
      <input onChange={(e) => update("semester", e.target.value)} />
    </>
  );
}

export default FrontPageDetailsForm;
