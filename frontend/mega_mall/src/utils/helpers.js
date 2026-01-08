// src/utils/helpers.js
export const formatCurrency = (amount) => {
  return `Rs ${amount}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
