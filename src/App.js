import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";
import ProductsListLevel from "./components/ProductsListLevel";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/products" className="navbar-brand">
          custom_reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products/level/low"} className="nav-link">
              Products By Level
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ProductsList/>} />
          <Route path="/products" element={<ProductsList/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/products/:id" element={<Product/>} />
          <Route path="/products/level/:level" element={<ProductsListLevel/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
