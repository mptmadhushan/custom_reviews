import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";
const ProductListLevel = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    retrieveProducts();
  }, []);

  //get products by level
  const retrieveProducts = () => {
    console.log(
      "item slug",
      window.location.pathname.replace("/products/level/", "")
    );
    const level = window.location.pathname.replace("/products/level/", "");
    const data = { level: level };
    ProductService.getByLevel(data)
      .then((response) => {
        const newProducts = response.data.products;

        var myArray = newProducts.split("|");
        console.log("🚀 api resp -->", myArray);
        setProducts(myArray);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = (item) => {
    const data = { level: item };
    ProductService.getByLevel(data)
      .then((response) => {
        const newProducts = response.data.products;
        console.log("🚀 ~ file:  newProducts", newProducts);

        var myArray = newProducts.split("|");
        console.log("🚀 api resp -->", myArray);
        setProducts(myArray);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="">
      <div></div>
      <div className="text-center">
        <h2 className="m-4 text-center pro-title">Products List By Level</h2>
        <div className="pro-container">
          <Link
            onClick={() => refreshList("low")}
            to={"/products/level/low"}
            className="nav-link btn-r m-3"
          >
            Low
          </Link>
          <Link
            onClick={() => refreshList("mid")}
            to={"/products/level/Mid"}
            className="nav-link btn-r m-3"
          >
            Mid
          </Link>
          <Link
            onClick={() => refreshList("high")}
            to={"/products/level/high"}
            className="nav-link btn-r m-3"
          >
            High
          </Link>
        </div>
        <div className="text-center pro-container">
          {/* <ul className="list-group"> */}
          {products &&
            products.map((product, index) => (
              <div className="pro-card-2">
                <img
                  src="https://descriptive.audio/wp-content/uploads/2021/07/best-speaker-brands-sony.jpg"
                  style={{ width: "280px", height: "280px" }}
                  alt="product"
                />
                <p style={{ marginTop: "10px" }}>{product}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListLevel;
