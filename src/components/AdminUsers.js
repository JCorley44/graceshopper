import { useEffect, useState } from "react";
import AdminUserOrders from "./AdminUserOrders";

function AdminUsers(props) {
	const [allUsers, setAllUsers] = useState([]);
	const baseURL = props.baseURL;
	const token = props.token;

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		const resp = await fetch(`${baseURL}users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const info = await resp.json();
		// console.log(info);
		setAllUsers(info);
	}

	return (
		<>
			<div className="adContainer">
				{allUsers.map((user) => {
					return (
						<div className="userCard" key={user.id}>
							<div className="userInfo">
								<h3> Username: {user.username}</h3>
								<p>Email: {user.email}</p>
							</div>

							<AdminUserOrders userId={user.id} baseURL={baseURL} />
						</div>
					);
				})}
			</div>
		</>
	);
}

export default AdminUsers;
