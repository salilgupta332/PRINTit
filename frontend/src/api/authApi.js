import { apiFetch } from "./client";

export const loginUser = async (email, password) => {
  return apiFetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const signupUser = async ({
  fullName,
  email,
  password,
  confirmPassword,
  mobileNumber,
}) => {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
      confirmPassword,
      mobileNumber,
    }),
  });
};



export const forgotPassword = async (email) => {
  return apiFetch("/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (token, password) => {
  return apiFetch(`/auth/reset-password/${token}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
};