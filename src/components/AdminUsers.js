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
      <div>
        {allUsers.map((user) => {
          return (
            <div key={user.id}>
              <h3>{user.username}</h3>
              <p>{user.email}</p>
              <AdminUserOrders userId={user.id} baseURL={baseURL} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AdminUsers;
