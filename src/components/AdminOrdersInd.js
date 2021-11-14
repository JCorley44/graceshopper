import { useEffect, useState } from "react";
import AdminOrdersDetails from "./AdminOrdersDetails";

function AdminOrdersInd(props) {
	const [products, setProducts] = useState([]);
	const baseURL = props.baseURL;
	const orderId = props.order.id;

	useEffect(() => {
		fetchProducts();
	}, []);

	async function fetchProducts() {
		// console.log("Hello from fetch products", props.order);
		const resp = await fetch(`${baseURL}products_in_orders/${orderId}`, {
			method: "GET",
		});
		const info = await resp.json();
		// console.log("info", info);
		setProducts(info);
	}

	return (
		<div>
			{products.map((product) => {
				return (
					<div key={product.id}>
						<AdminOrdersDetails
							baseURL={baseURL}
							product={product}
							order={props.order}
							orderStatus={props.orderStatus}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default AdminOrdersInd;
