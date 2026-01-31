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
