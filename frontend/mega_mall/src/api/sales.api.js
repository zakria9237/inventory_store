import api from "./axios";

// Checkout cart (sales staff)
export const checkoutCart = async () => {
  const res = await api.post("/sales/checkout/");
  return res.data;
};

// Logged-in user's sales (sales staff only)
export const getMySales = async () => {
  const res = await api.get("/sales/my-sales/");
  return Array.isArray(res.data) ? res.data : [];
};

// All sales (inventory manager)
export const getAllSales = async () => {
  const res = await api.get("/sales/"); // backend endpoint returning all sales
  return Array.isArray(res.data) ? res.data : [];
};
