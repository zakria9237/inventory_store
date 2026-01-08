import api from "./axios";

// LOGIN
export const loginUser = (data) => {
  return api.post("/users/login/", data);
};

// REGISTER
export const registerUser = (data) => {
  return api.post("/users/register/", data);
};

// GET CURRENT USER
export const getMe = () => {
  return api.get("/users/me/");
};
