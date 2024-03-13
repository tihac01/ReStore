import { useState, useEffect } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponents";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, stateLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => stateLoading(false));
  }, []);

  if (loading)
    return <LoadingComponent message="Loading Component"></LoadingComponent>;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
