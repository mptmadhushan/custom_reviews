import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import { Link } from 'react-router-dom';

const ProductListLevel = () => {
	const [ products, setProducts ] = useState([]);

	// useEffect(() => {
	//   retrieveProducts();
	// }, ['item']);
	useEffect(() => {
		retrieveProducts();
	}, []);
	const retrieveProducts = () => {
		console.log('item slug', window.location.pathname.replace('/products/level/', ''));
		const level = window.location.pathname.replace('/products/level/', '');
		const data = { level: level };
		ProductService.getByLevel(data)
			.then((response) => {
				const newProducts = response.data.products;
				console.log('🚀 ~ file:  newProducts', newProducts);
				const arr = JSON.parse(`${newProducts.replace(/'/g, '"')}`);

				console.log(arr);
				setProducts(arr);
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
				console.log('🚀 ~ file:  newProducts', newProducts);

				var arr = JSON.parse(`${newProducts.replace(/'/g, '"')}`);

				console.log(arr);
				setProducts(arr);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className="list row">
			<div className="col-md-12 text-center">
				<h4>Products List By Level</h4>
				<div className="row text-center" style={{marginLeft:'7vw'}}>
					<Link to={'/products/level/low'} className="nav-link btn-r m-3">
						Low
					</Link>{' '}
					<Link to={'/products/level/Mid'} className="nav-link btn-r m-3">
						Mid
					</Link>{' '}
					<Link to={'/products/level/high'} className="nav-link btn-r m-3">
						High
					</Link>
				</div>

				{/* <div className="row">
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={refreshList('low')}
        >
        low
        </button> <button
          className="m-3 btn btn-sm btn-warning"
          // onClick={refreshList('mid')}
        >
          mid
        </button>
        
        </div> */}
				<ul className="list-group">
					{products &&
						products.map((product, index) => (
							<li className="list-group-item " key={index}>
								{product}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default ProductListLevel;
