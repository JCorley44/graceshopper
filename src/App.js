import "./index.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import MyOrders from "./components/MyOrders";
import { useEffect, useState } from "react";
import ProductsPage from "./components/ProductsPage";
import MyCart from "./components/MyCart";
import Admin from "./components/Admin";

const baseURL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/`;

function App() {
  const [user, setUser] = useState(null);
  const [userAdmin, setUserAdmin] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setUser(null);
    }
    setToken(token);
    const fetchUser = async () => {
      const response = await fetch(`${baseURL}users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await response.json();
      setUser(info);
    };
    fetchUser();
  }, [token]);

  // Random comment.
  return (
    <div className="App">
      <Navbar
        user={user}
        setUser={setUser}
        userAdmin={userAdmin}
        setUserAdmin={setUserAdmin}
        baseURL={baseURL}
        setSearchedProducts={setSearchedProducts}
      />
      <Route exact path="/">
        <Home user={user} baseURL={baseURL} />
      </Route>{" "}
      <Route path="/register">
        <Register
          user={user}
          setUser={setUser}
          baseURL={baseURL}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </Route>
      <Route path="/sign-in">
        <SignIn
          user={user}
          setUser={setUser}
          baseURL={baseURL}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUserAdmin={setUserAdmin}
        />
      </Route>
      <Route path="/my-orders">
        <MyOrders user={user} baseURL={baseURL} />
      </Route>
      <Route path="/search-results">
        <ProductsPage searchedProducts={searchedProducts} baseURL={baseURL} />
      </Route>
      <Route path="/my-cart">
        <MyCart baseURL={baseURL} user={user} token={token} />
      </Route>
      <Route path="/admin">
        <Admin baseURL={baseURL} token={token} />
      </Route>
    </div>
  );
}

export default App;
