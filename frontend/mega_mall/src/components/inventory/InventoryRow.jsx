import { useState } from "react";
import { updateInventory } from "../../api/inventory.api";

const InventoryRow = ({ item }) => {
  const [qty, setQty] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  const changeQty = async (delta) => {
    if (loading) return;
    if (qty + delta < 0) return;

    const oldQty = qty;

    // 🔥 instant UI update
    setQty(qty + delta);
    setLoading(true);

    try {
      await updateInventory(item.product, delta);
    } catch (error) {
      // rollback if backend fails
      setQty(oldQty);
      alert("Inventory update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-3 font-medium">{item.product_name}</td>

      <td className="p-3 text-center text-lg font-bold">
        {qty}
      </td>

      <td className="p-3 text-center">
        {qty <= 5 ? (
          <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">
            Low Stock
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
            OK
          </span>
        )}
      </td>

      <td className="p-3 text-center">
        {new Date(item.updated_at).toLocaleString()}
      </td>

      <td className="p-3">
        <div className="flex justify-center gap-3">
          <button
            disabled={loading}
            onClick={() => changeQty(-1)}
            className="w-9 h-9 rounded-full bg-red-500 text-white text-xl
                       hover:bg-red-600 active:scale-95 transition"
          >
            −
          </button>

          <button
            disabled={loading}
            onClick={() => changeQty(1)}
            className="w-9 h-9 rounded-full bg-green-500 text-white text-xl
                       hover:bg-green-600 active:scale-95 transition"
          >
            +
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryRow;
