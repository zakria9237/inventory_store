import api from "./axios";

// GET ALL PRODUCTS
export const getProducts = async () => {
  const res = await api.get("products/");
  return res.data;
};

// GET SINGLE PRODUCT
export const getProductById = async (id) => {
  const res = await api.get(`products/${id}/`);
  return res.data;
};

// CREATE PRODUCT (Admin / Inventory Manager)
export const createProduct = async (data) => {
  const res = await api.post("products/", data);
  return res.data;
};

// UPDATE PRODUCT
export const updateProduct = async (id, data) => {
  const res = await api.put(`products/${id}/`, data);
  return res.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const res = await api.delete(`products/${id}/`);
  return res.data;
};
