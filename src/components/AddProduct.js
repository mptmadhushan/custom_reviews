import React, { useState } from "react";
import ProductService from "../services/ProductService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddProduct = () => {
  const initialProductState = {
    id: null,
    name: "",
    category: "",
    price: "",
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    // var data = {name : "BT SPEAKER 2", category : "Music", price : "2000"};
    var data = {
      name: product.name,
      category: product.category,
      price: product.price,
    };

    ProductService.create(data)
      .then((response) => {
        setProduct({
          id: response.data.id || "001",
          name: response.data.name,
          category: response.data.category,
          price: response.data.price,
        });
        setSubmitted(true);
        console.log(response);
        toast("The product added successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      <div>
        <h2 className="m-4 text-center pro-title">Add Product</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={product.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            required
            value={product.category}
            onChange={handleInputChange}
            name="category"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            required
            value={product.price}
            onChange={handleInputChange}
            name="price"
          />
        </div>
        <div className="text-center">
          <button onClick={saveProduct} className="btn btn-r">
            Submit
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProduct;
