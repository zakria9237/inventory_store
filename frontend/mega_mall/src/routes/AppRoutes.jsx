import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboards
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import InventoryDashboard from "../pages/dashboard/InventoryDashboard";
import SalesDashboard from "../pages/dashboard/SalesDashboard";

// Pages
import Products from "../pages/products/Products";
import Cart from "../pages/cart/Cart";
import MySales from "../pages/sales/MySales";
import Inventory from "../pages/inventory/Inventory";
import Notifications from "../pages/notifications/Notifications";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DEFAULT */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Navigate to="/dashboard" />
          </PrivateRoute>
        }
      />

      {/* DASHBOARD (ROLE BASED) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <RoleRoute
              roleComponentMap={{
                admin: <AdminDashboard />,
                inventory_manager: <InventoryDashboard />,
                sales_staff: <SalesDashboard />,
              }}
            />
          </PrivateRoute>
        }
      />

      {/* PRODUCTS */}
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />

      {/* ✅ CART – ONLY SALES STAFF */}
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["sales_staff"]}>
              <Cart />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* SALES */}
      <Route
        path="/sales"
        element={
          <PrivateRoute>
            <MySales />
          </PrivateRoute>
        }
      />

      {/* INVENTORY */}
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin", "inventory_manager"]}>
              <Inventory />
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* NOTIFICATIONS */}
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
