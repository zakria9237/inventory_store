import api from "./axios";

export const getInventory = async () => {
  const res = await api.get("/inventory/list/");
  return Array.isArray(res.data) ? res.data : [];
};

export const updateInventory = async (product_id, quantity) => {
  const res = await api.post("/inventory/update/", {
    product_id,
    quantity,
  });
  return res.data;
};