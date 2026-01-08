import { createContext, useState, useEffect } from "react";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../api/cart.api";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // ALWAYS ARRAY
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Cart load failed", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) loadCart();
    else {
      setCart([]);
      setLoading(false);
    }
  }, []);

  const addItem = async (product_id, quantity = 1) => {
    await addToCart({ product_id, quantity });
    loadCart();
  };

  const updateItem = async (item_id, quantity) => {
    await updateCartItem({ item_id, quantity });
    loadCart();
  };

  const removeItem = async (item_id) => {
    await removeFromCart({ item_id });
    loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        updateItem,
        removeItem,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
