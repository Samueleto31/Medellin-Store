import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

export const Produclist = () => {
  const [products, setProducts] = useState([]);
  const totalProducts = products.length;
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * productsPerPage; // = 2 * 6 = 12
  const firstIndex = lastIndex - productsPerPage; // = 12 - 6 = 6

  const getProducts = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const products = await data.json();

    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container-products">
        {products
          .map((product) => (
            <div className="card-product" key={product.id}>
              <figure className="container-img">
                <img src={product.image} alt={product.title} />
              </figure>

              <div className="info-product">
                <h3>{product.title}</h3>
                <p className="price">$ {product.price}</p>
                <button>Añadir al carrito</button>
              </div>
            </div>
          ))
          .slice(firstIndex, lastIndex)}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={totalProducts}
      />
    </>
  );
};
