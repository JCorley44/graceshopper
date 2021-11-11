import { Link } from "react-router-dom";

function AdminNav() {
	return (
		<div>
			<Link to="/admin/categories">Categories</Link>|{" "}
			<Link to="/admin/products">Products</Link>|{" "}
			<Link to="/admin/users">Users</Link>|{" "}
			<Link to="/admin/orders">Orders</Link>
		</div>
	);
}

export default AdminNav;
