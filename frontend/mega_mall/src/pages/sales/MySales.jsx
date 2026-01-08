import { useEffect, useState } from "react";
import { getMySales } from "../../api/sales.api";
import Loader from "../../components/common/Loader";

const MySales = () => {
  const [sales, setSales] = useState(null);

  useEffect(() => {
    const loadSales = async () => {
      try {
        const data = await getMySales();
        setSales(data);
      } catch (err) {
        console.error("Sales load failed", err);
        setSales([]);
      }
    };
    loadSales();
  }, []);

  if (!sales) return <Loader />;
  if (sales.length === 0) return <p className="p-6">No sales yet</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Sales</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="border p-2">{sale.id}</td>
              <td className="border p-2">{sale.product.name}</td>
              <td className="border p-2">{sale.quantity}</td>
              <td className="border p-2">{sale.total_price}</td>
              <td className="border p-2">
                {new Date(sale.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySales;
