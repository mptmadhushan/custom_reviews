import http from "../http-common";

const getAll = () => {
  return http.get("/get");
};

const getByLevel = (data) => {
  return http.post("/level", data);
};

// const get = id => {
//   return http.get(`/products/${id}`);
// };

const create = (data) => {
  return http.post("/insert", data);
};

const update = (data) => {
  return http.patch("/update", data);
};

const remove = (id) => {
  return http.delete("/delete", { product_id: id });
};

// const removeAll = () => {
//   return http.delete(`/products`);
// };

// const findByTitle = title => {
//   return http.get(`/products?title=${title}`);
// };

const ProductService = {
  getAll,
  // get,
  create,
  update,
  remove,
  // removeAll,
  // findByTitle,
  getByLevel,
};

export default ProductService;
