/* eslint-disable no-cond-assign */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDataService from '../services/ProductService';
import { Rating } from 'react-simple-star-rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Product = (props) => {
	const { id } = useParams();
	let navigate = useNavigate();
  const level =window.location.pathname.replace('/products/','')
  console.log("🚀 ~ file: Product.js ~ line 12 ~ Product ~ level", level)

	const initialProductState = {
		id: level,
		name: '',
		category: '',
		price: ''
	};

	const [ currentProduct, setCurrentProduct ] = useState(initialProductState);
	const [ message, setMessage ] = useState('');
	const [ rating, setRating ] = useState(3); // initial rating value

	// const getProduct = id => {
	//   ProductDataService.get(id)
	//     .then(response => {
	//       setCurrentProduct(response.data);
	//       console.log(response.data);
	//     })
	//     .catch(e => {
	//       console.log(e);
	//     });
	// };
	const handleRating = (rate) => {
		setRating(rate);
	};
	useEffect(
		() => {
			// if (id)
			// getProduct(id);
		},
		[ id ]
	);

	//set current product details
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCurrentProduct({ ...currentProduct, [name]: value });
	};
	const notify = () => toast('Wow so easy!');
	const updateProduct = (status) => {
		// var data ={product_id : "3", name : "BT SPEAKER test up", category : "Music up", price : "9000"}
		var data = {
			product_id: level,
			name: currentProduct.name,
			category: currentProduct.category,
			price: currentProduct.price
		};
		if (currentProduct.name === '' && currentProduct.category === '' && currentProduct.price === '') {
      setMessage('Please fill all the fields');
      console.log('Please fill all the fields');
      toast.error('Please fill all the fields!')
      // toast.error(' Please fill all the fields', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   });
		} else {
			ProductDataService.update(data)
				.then((response) => {
					setCurrentProduct({ ...currentProduct, published: status });
					console.log(response.data);
					setMessage('The product was updated successfully!');
          toast('The product was updated successfully!')
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	// const updateProduct = () => {
	//   ProductDataService.update(currentProduct.id, currentProduct)
	//     .then(response => {
	//       console.log(response.data);
	//       setMessage("The product was updated successfully!");
	//     })
	//     .catch(e => {
	//       console.log(e);
	//     });
	// };

	const deleteProduct = () => {
		ProductDataService.remove(currentProduct.id)
			.then((response) => {
				console.log(response.data);
				navigate('/products');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div>
			{currentProduct ? (
				<div className="edit-form ">
					<h4 className="text-center m-4">Product</h4>
					<form>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								required
								value={currentProduct.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="category">Category</label>
							<input
								type="text"
								className="form-control"
								id="category"
								required
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
								required
								name="price"
								value={currentProduct.price}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group text-center">
							{/* <label htmlFor="price">Rating</label> */}
							<Rating onClick={handleRating} size="35" ratingValue={rating} /* Available Props */ />
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

					<button className="badge btn-r badge-danger mr-2" onClick={deleteProduct}>
						Delete
					</button>

					<button type="submit" className="badge badge-success btn-r" onClick={updateProduct}>
						Update
					</button>
          <ToastContainer />
					{/* <p>{message}</p> */}
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
