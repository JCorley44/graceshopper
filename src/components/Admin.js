import "../admin.css";
import { Route } from "react-router";
import AdminCat from "./AdminCat";
import AdminNav from "./AdminNav";
import AdminOrders from "./AdminOrders";
import AdminProd from "./AdminProd";
import AdminUsers from "./AdminUsers";

function Admin(props) {
	return (
		<>
			<h1>Admin Portal</h1>
			<div>
				<AdminNav />
				<Route path="/admin/categories">
					<AdminCat baseURL={props.baseURL} token={props.token} />
				</Route>
				<Route path="/admin/products">
					<AdminProd baseURL={props.baseURL} />
				</Route>
				<Route path="/admin/users">
					<AdminUsers baseURL={props.baseURL} token={props.token} />
				</Route>
				<Route path="/admin/orders">
					<AdminOrders baseURL={props.baseURL} />
				</Route>
			</div>
		</>
	);
}

export default Admin;
