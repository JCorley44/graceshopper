import { Link } from "react-router-dom";

function Navbar(props) {
  const handleLogout = () => {
    localStorage.removeItem("token");

    props.setUser(null);
  };
  return (
    <div>
      <h1>Welcome to Nu Silk Road</h1>
      <Link to="/">Home</Link> |{" "}
      {!props.user && (
        <>
          <Link to="/sign-in">Sign In</Link> |
          <Link to="/register">Register</Link> |
        </>
      )}
      {props.user && (
        <>
          <Link onClick={handleLogout} to="/">
            Log Out
          </Link>
        </>
      )}
      | <Link to="/my-orders">My Orders</Link>
    </div>
  );
}

export default Navbar;
