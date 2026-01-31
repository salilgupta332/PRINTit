import { apiFetch } from "./client";

// create assignment
export const createAssignment = async (formData) => {
  return apiFetch("/assignments", {
    method: "POST",
    body: formData,
  });
};

// get my assignments
export const getMyAssignments = async () => {
  return apiFetch("/assignments/my");
};

// get assignment by id
export const getAssignmentById = async (id) => {
  const data = await apiFetch(`/assignments/${id}`);
  return data.assignment;
};

// upload assignment file
export const uploadAssignmentFile = async (assignmentId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const data = await apiFetch(
    `/assignments/${assignmentId}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return data.assignment;
};
