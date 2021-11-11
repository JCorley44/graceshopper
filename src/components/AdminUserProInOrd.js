import { useEffect, useState } from "react";

function AdminUsersProInOrd(props) {
	// const [listOfProductsInThisOrder, setListOfProductsInThisOrder] = useState(
	// 	[]
	// );
	// const baseURL = props.baseURL;

	// useEffect(() => {
	// 	fetchProductList();
	// }, []);

	// async function fetchProductList() {
	// 	// This doesn't work because the fetch URL doesn't actually exist. Which is perfectly okay. There might be an easier way to do this. IDK. But I may end up creating that tomorrow.
	// 	const resp = await fetch(`${baseURL}products_in_orders/:orderId`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});
	// 	const info = await resp.json();
	// 	console.log("fetchProductList info:", info);
	// 	if (info !== undefined) {
	// 		setListOfProductsInThisOrder(info);
	// 	}
	// }
	return <>List of Products in Orders Here.</>;
}

export default AdminUsersProInOrd;
