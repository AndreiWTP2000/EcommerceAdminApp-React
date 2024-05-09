import { Link, Outlet } from "react-router-dom";
import ProductCard from "../products-pages/ProductCard";
import { useEffect, useState } from "react";
const ProductsView = () => {
  const [products, setProducts] = useState(null);
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:8000/products");
      const products = await data.json();
      setProducts(products);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [products]);
  return (
    <div className="my-5">
      <Link to="/products/new-item">
        <button type="button" className="btn btn-light btn-lg">
          Add New Product
        </button>
      </Link>

      {products &&
        products
          .sort((a, b) => b.id - a.id)
          .map((product) => <ProductCard key={product.id} product={product} />)}
      <Outlet />
    </div>
  );
};

export default ProductsView;
