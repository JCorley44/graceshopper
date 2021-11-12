import { useEffect, useState } from "react";

function AdminProdInfo(props) {
	const product = props.product;
	const categoryId = product.category_id;
	// console.log(categoryId);
	// console.log(product);

	//Gets the Category Name using the Category Id provided.
	useEffect(() => {
		props.fetchCategory(categoryId);
	}, []);

	return (
		<>
			<h3>{product.title}</h3>
			<p>Product Description: {product.description}</p>
			<p>Price: {product.price}</p>
			<p>On Hand: {product.quantity}</p>
			<p>Category: {props.categoryName}</p>
		</>
	);
}

export default AdminProdInfo;
