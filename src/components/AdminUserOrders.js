import { useEffect, useState } from "react";
import AdminUsersProInOrd from "./AdminUserProInOrd";

function AdminUserOrders(props) {
	const [ordersForUser, setOrdersForUser] = useState([]);
	const baseURL = props.baseURL;

	useEffect(() => {
		fetchOrdersForUsers();
	}, []);

	async function fetchOrdersForUsers() {
		const userId = props.userId;
		const resp = await fetch(`${baseURL}users/${userId}/orders`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const info = await resp.json();
		console.log("fetchOrdersforUser info:", info);
		if (info !== undefined) {
			setOrdersForUser(info);
		}
	}

	return (
		<div>
			{ordersForUser.map((order) => {
				let orderStatus = "";
				if (order.is_purchase === true) {
					orderStatus = "Completed";
				} else {
					orderStatus = "Pending";
				}
				return (
					<div key={order.id}>
						<h3>Order: {order.id}</h3>
						<p>User: {order.user_id}</p>
						<p>Transaction: {orderStatus}</p>
						<AdminUsersProInOrd orderId={order.id} baseURL={baseURL} />
					</div>
				);
			})}
		</div>
	);
}

export default AdminUserOrders;
