import { apiFetch } from "./client";

export const getOrderById = async (id) => {
  return apiFetch(`/admin/assignments/${id}`);
};

export const updateOrderStatus = async (id, data) => {
  return apiFetch(`/admin/assignments/${id}/status`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const updateOrderNote = async (id, note) => {
  return apiFetch(`/admin/assignments/${id}/note`, {
    method: "PUT",
    body: JSON.stringify({ note }),
  });
};

export const rejectOrder = async (id) => {
  return apiFetch(`/admin/assignments/${id}/reject`, {
    method: "PUT",
  });
};
