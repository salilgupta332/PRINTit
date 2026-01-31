import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAssignmentById } from "../api/assignmentApi";
import { uploadAssignmentFile } from "../api/assignmentApi";

function AssignmentDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [assignment, setAssignment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        const data = await getAssignmentById(token, id);
        setAssignment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      loadAssignment();
    }
  }, [token, id]);

  if (loading) return <p>Loading assignment...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!assignment) return <p>No assignment found</p>;
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
  
    try {
      setUploading(true);
      const updatedAssignment = await uploadAssignmentFile(
        token,
        assignment._id,
        selectedFile
      );
      setAssignment(updatedAssignment);
      setSelectedFile(null);
      alert("File uploaded successfully ✅");
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div style={{ padding: "40px" }}>
      <h2>Assignment Details</h2>

      <p>
        <strong>Subject:</strong> {assignment.subject}
      </p>
      <p>
        <strong>Pages:</strong> {assignment.pages}
      </p>
      <p>
        <strong>Content Type:</strong> {assignment.contentType}
      </p>
      <p>
        <strong>Price:</strong> ₹{assignment.price}
      </p>
      <p>
        <strong>Status:</strong> {assignment.status}
      </p>
      <p>
        <strong>Created:</strong>{" "}
        {assignment.createdAt
          ? new Date(assignment.createdAt).toLocaleString()
          : "N/A"}
      </p>

      <hr />

{/* 🔒 Upload section ONLY if student_upload AND no files yet */}
{assignment.contentType === "student_upload" &&
 assignment.files.length === 0 && (
  <>
    <h3>Upload Assignment Files</h3>

    <input
      type="file"
      onChange={(e) => setSelectedFile(e.target.files[0])}
    />
    <br /><br />

    <button onClick={handleFileUpload}>Upload File</button>
  </>
)}

<h3>Uploaded Files</h3>

{assignment.files.length === 0 ? (
  <p>No files uploaded</p>
) : (
  <ul>
    {assignment.files.map((file, index) => (
      <li key={index}>
        <a
          href={`${process.env.REACT_APP_API_URL}/${file.path}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {file.filename}
        </a>
      </li>
    ))}
  </ul>
)}
    </div>
  );
}

export default AssignmentDetails;
