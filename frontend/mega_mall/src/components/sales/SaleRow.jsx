const SaleRow = ({ sale }) => {
  return (
    <tr className="border-b">
      <td className="p-2">{sale.id}</td>
      <td className="p-2">{sale.total_amount}</td>
      <td className="p-2">{sale.created_at}</td>
    </tr>
  );
};

export default SaleRow;
