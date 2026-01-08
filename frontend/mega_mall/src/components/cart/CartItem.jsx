import useCart from "../../hooks/useCart";

const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useCart() || {};

  if (!item) return null;

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <p className="font-semibold">{item.product || "Unknown Product"}</p>
        <p>Rs {item.price ?? 0}</p>
      </div>

      <input
        type="number"
        value={item.quantity ?? 1}
        min="1"
        onChange={(e) => updateItem?.(item.id, Number(e.target.value))}
        className="w-16 border px-2"
      />

      <button
        onClick={() => removeItem?.(item.id)}
        className="text-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
