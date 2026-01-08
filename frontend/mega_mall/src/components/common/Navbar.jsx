import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useEffect, useState } from "react";
import { getNotifications } from "../../api/notifications.api";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user) return;
    getNotifications().then((data) => {
      setUnread(data.filter((n) => !n.is_read).length);
    });
  }, [user]);

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Inventory System
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/products">Products</Link>

        {user?.role === "sales_staff" && (
          <Link to="/cart">
            Cart ({cart?.items?.length || 0})
          </Link>
        )}

        {(user?.role === "inventory_manager" || user?.role === "admin") && (
          <Link to="/inventory">Inventory</Link>
        )}

        <Link to="/sales">Sales</Link>

        {/* 🔔 NOTIFICATION BELL */}
        <Link to="/notifications" className="relative">
          🔔
          {unread > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 rounded-full">
              {unread}
            </span>
          )}
        </Link>

        <span className="text-sm text-gray-300">{user?.username}</span>

        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
