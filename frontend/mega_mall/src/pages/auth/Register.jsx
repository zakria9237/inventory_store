import { useState } from "react";
import { registerUser } from "../../api/auth.api";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
    role: "sales_staff", // ✅ default role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Account created successfully. Please login.");
    } catch (err) {
      alert(
        err.response?.data?.password ||
        err.response?.data?.non_field_errors ||
        err.response?.data?.role ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 border p-6 rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="w-full border p-2"
          placeholder="Username"
          required
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full border p-2"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full border p-2"
          placeholder="Confirm Password"
          required
          value={form.password2}
          onChange={(e) =>
            setForm({ ...form, password2: e.target.value })
          }
        />

        {/* ✅ CORRECT ROLE SELECT */}
        <select
          className="w-full border p-2"
          value={form.role}
          required
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="sales_staff">Sales Staff</option>
          <option value="inventory_manager">Inventory Manager</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
