import { useState } from "react";
import { deleteProduct } from "../../api/products.api";
import EditProductModal from "./EditProductModal";
import { useAuth } from "../../hooks/useAuth";
import useCart from "../../hooks/useCart"; // CartContext hook

const ProductCard = ({ product, refresh }) => {
  const { user } = useAuth();
  const { addItem } = useCart(); // addItem function from context
  const [edit, setEdit] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete product?")) return;
    await deleteProduct(product.id);
    refresh(); // instant refresh
  };

  const handleAddToCart = () => {
    addItem(product.id, 1); // product_id and quantity
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="border p-4 rounded shadow-md hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700">Price: ${product.price}</p>
      <p className="text-gray-700">Stock: {product.stock}</p>
      <p className="text-gray-700">Category: {product.category}</p>

      {/* Inventory Manager Buttons */}
      {user?.role === "inventory_manager" && (
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => setEdit(true)} 
            className="bg-yellow-400 text-black px-3 py-1 rounded"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}

      {/* Sales Staff Add to Cart Button */}
      {user?.role === "sales_staff" && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {edit && (
        <EditProductModal
          product={product}
          refresh={refresh}
          onClose={() => setEdit(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
