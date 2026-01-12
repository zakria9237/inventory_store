// src/App.jsx
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import CartProvider from "./context/CartContext";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const Layout = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <AppRoutes />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
