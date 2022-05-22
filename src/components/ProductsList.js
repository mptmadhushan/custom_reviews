import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const [rating, setRating] = useState(3); // initial rating value

  useEffect(() => {
    retrieveProducts();
  }, []);
  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };
  // const onChangeSearchTitle = e => {
  //   const searchTitle = e.target.value;
  //   setSearchTitle(searchTitle);
  // };

  const retrieveProducts = () => {
    ProductService.getAll()
      .then((response) => {
        setProducts(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const refreshList = () => {
  //   retrieveProducts();
  //   setCurrentProduct(null);
  //   setCurrentIndex(-1);
  // };

  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };

  // const removeAllProducts = () => {
  //   ProductService.removeAll()
  //     .then(response => {
  //       console.log(response.data);
  //       refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const findByTitle = () => {
  //   ProductService.findByTitle(searchTitle)
  //     .then(response => {
  //       setProducts(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  return (
    <div className="">
      <h2 className="m-4 text-center pro-title">Products List</h2>
      <div className="text-center pro-container">
        {/* <ul className="list-group"> */}
        {products &&
          products.map((product, index) => (
            <div className="pro-card">
              <img
                onClick={() => setActiveProduct(product, index)}
                src="https://descriptive.audio/wp-content/uploads/2021/07/best-speaker-brands-sony.jpg"
                style={{ objectFit: "cover", width: "280px", height: "280px" }}
                alt="product"
              />
              <div className="text-left">
                <p style={{ marginTop: "10px" }}>{product.name}</p>
                <p style={{ marginTop: "10px" }}>{product.category}</p>
                <p style={{ marginTop: "10px" }}>Rs .{product.price}</p>
                <Rating
                  onClick={handleRating}
                  size="25"
                  ratingValue={product.rating} /* Available Props */
                />
              </div>
              <Link
                to={"/products/" + product.product_id}
                state={product}
                className="badge badge-succuss"
              >
                Edit
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
