import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState("");

  const history = useHistory();

  //handling logging out
  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setUser(null);
  };

  const getAllProducts = async () => {
    const resp = await fetch(`${props.baseURL}products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await resp.json();
    setAllProducts(info);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  console.log(allProducts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //write fetch request to search for products
    function searchedMatches(product) {
      if (
        product.title.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      ) {
        return true;
      }
    }

    const filteredSearch = allProducts.filter((product) =>
      searchedMatches(product, search)
    );
    //have the array of related products to search
    console.log(filteredSearch);
  };
  return (
    <div>
      <h1>Welcome to Nu Silk Road</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type={"text"}
          placeholder={"What are ya looking for?"}
          value={search}
        ></input>
        <button>Search</button>
      </form>
      <Link to="/">Home</Link> |{" "}
      {!props.user && (
        <>
          <Link to="/sign-in">Sign In</Link> |
          <Link to="/register">Register</Link>
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
