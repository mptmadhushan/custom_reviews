
import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'
const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  const [rating, setRating] = useState(3) // initial rating value

  useEffect(() => {
    retrieveProducts();
  }, []);
  const handleRating = (rate) => {
    setRating(rate)
    // other logic
  }
  // const onChangeSearchTitle = e => {
  //   const searchTitle = e.target.value;
  //   setSearchTitle(searchTitle);
  // };

  const retrieveProducts = () => {
    ProductService.getAll()
      .then(response => {
        setProducts(response.data);
        console.log(response);
      })
      .catch(e => {
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
    <div className="list row">
      {/* <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className="col-md-6 text-center">
        <h4 className="m-4">Products List</h4>

        <ul className="list-group">
          {products &&
            products.map((product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(product, index)}
                key={index}
              >
                {product.name}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProducts}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6 text-center">
        {currentProduct ? (
          <div>
            <h4 className="m-4">Product</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>
              {currentProduct.name}
            </div>
            <div>
              <label>
                <strong>Category:</strong>
              </label>
              {currentProduct.category}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>
              {currentProduct.price}
            </div>
            <div>
              <label>Rating:</label>
            <Rating onClick={handleRating} size="25" ratingValue={rating} /* Available Props */ />
            </div>
            <Link
              to={"/products/" + currentProduct.product_id}
              state={currentProduct}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
