import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./products.module.css";
import Loader from "../Loader/Loader"
import { producturl } from "../../Api/endPoints";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    axios.get(`${producturl}/products`)
      .then((res) => {
        setProducts(res.data);
        // isLoading(false)
      })
      .catch((err) => {
        console.log(err);
        // isLoading(false)
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {products.map((singleProduct) => {
            return (
              <ProductCard product={singleProduct} key={singleProduct.id} />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;

