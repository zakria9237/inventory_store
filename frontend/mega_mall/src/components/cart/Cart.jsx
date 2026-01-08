import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { checkoutCart } from "../../api/sales.api";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

const Cart = () => {
  const cartHook = useCart(); // Safe context
  const cart = Array.isArray(cartHook.cart) ? cartHook.cart : [];
  const refreshCart = cartHook.refreshCart || (() => {});
  const loading = cartHook.loading ?? false;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = cart.reduce(
      (acc, item) => acc + ((item?.price || 0) * (item?.quantity || 0)),
      0
    );
    setTotal(sum);
  }, [cart]);

  const handleCheckout = async () => {
    if (!Array.isArray(cart) || cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await checkoutCart();
      alert("Order placed successfully");
      refreshCart();
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout failed");
    }
  };

  if (loading) return <p className="p-6">Loading cart...</p>;
  if (!Array.isArray(cart)) return <p className="p-6">Error loading cart.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <CartSummary total={total} />
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
