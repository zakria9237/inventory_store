import { useEffect, useState } from "react";
import { getProducts } from "../../api/products.api";
import ProductList from "../../components/products/ProductList";
import Loader from "../../components/common/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load products", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* refresh function child ko pass ho raha hai */}
      <ProductList
        products={products}
        refresh={loadProducts}
      />
    </div>
  );
};

export default Products;
