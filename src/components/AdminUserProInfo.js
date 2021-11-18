import { useEffect, useState } from "react";

function AdminProInfo(props) {
	const [listOfProducts, setListOfProducts] = useState({});
	const baseURL = props.baseURL;
	const productId = props.productId;
	const { title, description, price, quantity } = listOfProducts;

	useEffect(() => {
		fetchProductInfo();
	}, []);

	async function fetchProductInfo() {
		const fetchURL = `${baseURL}products/${productId}`;
		const resp = await fetch(`${fetchURL}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const info = await resp.json();
		setListOfProducts(info);
		// console.log(info);
	}

	return (
		<div className="adUserOrdItems">
			<p>{title}</p>
			<p>{description}</p>
			<p>Price: {price}</p>
			<p>Quantity: {quantity}</p>
		</div>
	);
}

export default AdminProInfo;
