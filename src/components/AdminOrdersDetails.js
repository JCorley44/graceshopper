import { useEffect, useState } from "react";

function AdminOrdersDetails(props) {
	const [details, setDetails] = useState([]);
	const [userData, setUserData] = useState([]);
	const { baseURL, product, order, orderStatus } = props;
	const { title, description, price, quantity } = details;
	const userId = order.user_id;
	// console.log(props);
	// console.log(userData);

	useEffect(() => {
		fetchDetails();
		fetchUser(userId);
	}, []);

	async function fetchDetails() {
		const productId = product.product_id;
		const resp = await fetch(`${baseURL}products/${productId}`, {
			method: "GET",
		});
		const info = await resp.json();
		setDetails(info);
	}

	async function fetchUser(userId) {
		// console.log("Hi from fetch,", userId);
		const resp = await fetch(`${baseURL}users/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const info = await resp.json();
		// console.log("user", info);
		return setUserData(info);
	}

	return (
		<div>
			<p>User: {userData.username} </p>
			<p>Email: {userData.email} </p>
			<p>Order Number: {order.id}</p>
			<p>Transaction: {orderStatus}</p>
			<p>Item: {title} </p>
			<p>Description: {description} </p>
			<p>Price: {price} </p>
			<p>Quantity On Hand: {quantity} </p>
		</div>
	);
}

export default AdminOrdersDetails;
