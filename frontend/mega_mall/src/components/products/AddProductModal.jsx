import { useState } from "react";
import { createProduct } from "../../api/products.api";

const AddProductModal = ({ isOpen, onClose, refresh }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
      });

      refresh();       // ✅ UI update
      onClose();       // ✅ modal close
      setForm({ name: "", price: "", stock: "", category: "" });
    } catch (err) {
      console.error(err.response?.data);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="name" onChange={handleChange} value={form.name} placeholder="Name" required />
          <input name="price" type="number" onChange={handleChange} value={form.price} placeholder="Price" required />
          <input name="stock" type="number" onChange={handleChange} value={form.stock} placeholder="Stock" required />

          <select name="category" onChange={handleChange} value={form.category} required>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothes">Clothes</option>
            <option value="grocery">Grocery</option>
            <option value="other">Other</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}>Cancel</button>
            <button disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
