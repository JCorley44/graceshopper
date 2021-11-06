import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import MyOrders from "./components/MyOrders";
import { useEffect, useState } from "react";
import ProductsPage from "./components/ProductsPage";
import MyCart from "./components/MyCart";

const baseURL = `http://localhost:3000/api/`;

function App() {
  const [user, setUser] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setUser(null);
    }
    const fetchUser = async () => {
      const response = await fetch(`${baseURL}users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await response.json();
      setUser({ id: info.id, username: info.username, token });
    };
    fetchUser();
  }, [token]);

  // Random comment.
  return (
    <div className="App">
      <Navbar
        user={user}
        setUser={setUser}
        baseURL={baseURL}
        setSearchedProducts={setSearchedProducts}
      />
      <Route exact path="/">
        <Home user={user} />
      </Route>
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
        />
      </Route>
      <Route path="/my-orders">
        <MyOrders />
      </Route>
      <Route path="/search-results">
        <ProductsPage searchedProducts={searchedProducts} />
      </Route>
      <Route path="/my-cart">
        <MyCart />
      </Route>
    </div>
  );
}

export default App;
