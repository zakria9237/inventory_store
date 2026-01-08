const CartSummary = ({ total }) => (
  <div className="border p-4 rounded shadow mt-4">
    <h3 className="font-bold text-lg">Cart Summary</h3>
    <p className="mt-2">Total Amount: Rs {total ?? 0}</p>
  </div>
);

export default CartSummary;
