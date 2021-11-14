import { useEffect, useState } from "react";
import AdminOrdersInd from "./AdminOrdersInd";

function AdminOrders(props) {
	const [allOrders, setAllOrders] = useState([]);
	const baseURL = props.baseURL;

	useEffect(() => {
		fetchOrders();
	}, []);

	async function fetchOrders() {
		// console.log("Hello from adminOrders");
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
					let orderStatus = "";
					if (order.is_purchase === true) {
						orderStatus = "Completed";
					} else {
						orderStatus = "Pending";
					}

					// console.log(order.user_id);

					return (
						<div key={order.id}>
							<AdminOrdersInd
								baseURL={baseURL}
								order={order}
								orderStatus={orderStatus}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default AdminOrders;
