import { useEffect, useState } from "react";

function AdminOrders(props) {
	const [allOrders, setAllOrders] = useState([]);
	const baseURL = props.baseURL;

	useEffect(() => {
		fetchOrders();
	}, []);

	async function fetchOrders() {
		const resp = await fetch(`${baseURL}orders`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const info = await resp.json();
		console.log(info);
		setAllOrders(info);
	}

	return (
		<>
			<div>
				{allOrders.map((order) => {
					return <div key={order.id}> </div>;
				})}
			</div>
		</>
	);
}

export default AdminOrders;
