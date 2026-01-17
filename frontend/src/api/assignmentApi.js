// Assignment API functions
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL;

// create assignment
export const createAssignment = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/assignments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// get my assignments


export const getMyAssignments = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/assignments/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Unauthorized");

  return data;
};

// assignmentApi.js
export async function getAssignmentById(token, id) {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/assignments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch assignment");
  }

  return data.assignment; // ✅ backend now sends single object
}


export async function uploadAssignmentFile(token, assignmentId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/assignments/${assignmentId}/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "File upload failed");
  }

  return data.assignment;
}
