import { useEffect, useState } from "react";
import { getInventory } from "../../api/inventory.api";
import InventoryRow from "../../components/inventory/InventoryRow";
import Loader from "../../components/common/Loader";

const Inventory = () => {
  const [items, setItems] = useState(null);

  const loadInventory = async () => {
    const data = await getInventory();
    setItems(data);
  };

  useEffect(() => {
    loadInventory();
  }, []);

  if (!items) return <Loader />;
  if (items.length === 0) return <p className="p-6">No inventory found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Updated</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <InventoryRow
              key={item.id}
              item={item}
              refresh={loadInventory}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
