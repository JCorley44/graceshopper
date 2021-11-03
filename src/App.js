import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import MyOrders from "./components/MyOrders";
import { useEffect, useState } from "react";

const baseURL = `http://localhost:3000/api/`;

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function fetchUser() {
    const token = localStorage.getItem("token");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/register">
        <Register user={user} setUser={setUser} />
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Route path="/my-orders">
        <MyOrders />
      </Route>
    </div>
  );
}

export default App;
