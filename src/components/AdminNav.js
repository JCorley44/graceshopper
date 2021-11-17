import { Link } from "react-router-dom";

function AdminNav() {
	return (
		<div>
			<Link to="/admin/categories">
				<button>Categories</button>
			</Link>

			<Link to="/admin/products">
				<button>Products</button>
			</Link>

			<Link to="/admin/users">
				<button>Users</button>
			</Link>

			<Link to="/admin/orders">
				<button>Orders</button>
			</Link>
		</div>
	);
}

export default AdminNav;
