// src/api/client.js

export const API_BASE = "/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}




