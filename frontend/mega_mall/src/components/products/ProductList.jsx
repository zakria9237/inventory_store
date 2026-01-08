import { useState } from "react";
import ProductCard from "./ProductCard";
import { useAuth } from "../../hooks/useAuth";
import AddProductModal from "./AddProductModal";

const ProductList = ({ products, refresh }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("✅ ProductList rendered, user:", user);

  return (
    <div>
      {/* Add Product Button for Inventory Manager */}
      {user?.role === "inventory_manager" && (
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </button>
      )}

      {/* Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refresh={refresh}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} refresh={refresh} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
