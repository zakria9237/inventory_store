import { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../../api/cart.api";
import { checkoutCart } from "../../api/sales.api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadCart = async () => {
    const data = await getCart();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await checkoutCart();      // 🔥 SALE CREATE HOTI HAI
      setItems([]);              // cart clear
      navigate("/sales");        // My Sales page
    } catch (err) {
      alert("Checkout failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0)
    return <p className="p-6">Cart is empty</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Cart</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            <p className="font-semibold">{item.product}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: {item.subtotal}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                updateCartItem({
                  item_id: item.id,
                  quantity: item.quantity + 1,
                }).then(loadCart)
              }
              className="px-2 bg-green-500 text-white"
            >
              +
            </button>

            <button
              onClick={() =>
                removeFromCart({ item_id: item.id }).then(loadCart)
              }
              className="px-2 bg-red-500 text-white"
            >
              X
            </button>
          </div>
        </div>
      ))}

      {/* ✅ CHECKOUT BUTTON */}
      <div className="mt-6 text-right">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded"
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
