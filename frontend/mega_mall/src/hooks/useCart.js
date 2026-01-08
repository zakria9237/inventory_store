import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () => useContext(CartContext) || {}; // Safe fallback

export default useCart;
