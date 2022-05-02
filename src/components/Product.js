import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ProductDataService from "../services/ProductService";

const Product = props => {
  const { id }= useParams();
  let navigate = useNavigate();

 
  const initialProductState = {
    id: null,
    name: "",
    category: "",
    price: ""
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getProduct(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updatePublished = status => {
    var data ={product_id : "3", name : "BT SPEAKER test up", category : "Music up", price : "9000"}
    // var data = {
    //   id: currentProduct.id,
    //   title: currentProduct.title,
    //   description: currentProduct.description,
    //   published: status
    // };

    ProductDataService.update(data)
      .then(response => {
        setCurrentProduct({ ...currentProduct, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateProduct = () => {
    ProductDataService.update(currentProduct.id, currentProduct)
      .then(response => {
        console.log(response.data);
        setMessage("The product was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.id)
      .then(response => {
        console.log(response.data);
        navigate("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentProduct.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>

            
          </form>

          {/* {currentProduct.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )} */}

          <button className="badge badge-danger mr-2" onClick={deleteProduct}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProduct}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

export default Product;
