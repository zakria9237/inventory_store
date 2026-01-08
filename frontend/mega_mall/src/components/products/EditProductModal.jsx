import { useState } from "react";
import { updateProduct } from "../../api/products.api";

const EditProductModal = ({ product, refresh, onClose }) => {
  const [form, setForm] = useState({ ...product });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProduct(product.id, form);

    refresh();     // ✅ UI update
    onClose();     // ✅ modal close
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="price" type="number" value={form.price} onChange={handleChange} />
          <input name="stock" type="number" value={form.stock} onChange={handleChange} />

          <select name="category" value={form.category} onChange={handleChange}>
            <option value="electronics">Electronics</option>
            <option value="clothes">Clothes</option>
            <option value="grocery">Grocery</option>
            <option value="other">Other</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}>Cancel</button>
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
