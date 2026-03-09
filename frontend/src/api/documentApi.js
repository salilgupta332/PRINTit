import { apiFetch } from "./client";

// Aadhaar order
export const createAadhaarOrder = async (formData) => {
  return apiFetch("/user/aadhaar-print", {
    method: "POST",
    body: formData,
  });
};

// PAN order
export const createPanOrder = async (formData) => {
  return apiFetch("/user/pan-print", {
    method: "POST",
    body: formData,
  });
};