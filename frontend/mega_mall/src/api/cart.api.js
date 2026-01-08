import api from "./axios";

export const getCart = async () => {
  const res = await api.get("/cart/get/");
  return Array.isArray(res.data) ? res.data : [];
};

export const addToCart = async ({ product_id, quantity }) => {
  return api.post("/cart/add/", { product_id, quantity });
};

export const updateCartItem = async ({ item_id, quantity }) => {
  return api.post("/cart/update/", { item_id, quantity });
};

export const removeFromCart = async ({ item_id }) => {
  return api.post("/cart/remove/", { item_id });
};
