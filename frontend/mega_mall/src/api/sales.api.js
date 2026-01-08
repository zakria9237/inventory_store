import api from "./axios";

// Checkout cart (sales staff)
export const checkoutCart = async () => {
  const res = await api.post("/sales/checkout/");
  return res.data;
};

// Logged-in user's sales
export const getMySales = async () => {
  const res = await api.get("/sales/my-sales/");
  return Array.isArray(res.data) ? res.data : [];
};
