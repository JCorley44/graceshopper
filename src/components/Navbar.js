import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../index.css";

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
    props.setUserAdmin(false);
    return history.push("/");
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
  // console.log(allProducts);

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
    props.setSearchedProducts(filteredSearch);
    history.push("/search-results");
  };
  return (
    <div className="navbar">
      <div>
        <img
          src="
          https://th.bing.com/th/id/R.35981308b75b7604a88687c94f923ef3?rik=vN1ucLyXS2Y3PQ&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f16300000%2ftheres-alot-of-them-its-so-cool-pikachu-vs-raichu-16366712-100-100.gif&ehk=5D6CKi62EyfLqHXRniR7D0jK8sycyita7zO8UT2SCTE%3d&risl=&pid=ImgRaw&r=0"
        ></img>
      </div>
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
      <div className="navlink">
        {" "}
        <Link to="/">Home</Link> |{" "}
        {!props.user && (
          <>
            {" "}
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
        | <Link to="/my-cart">My Cart</Link> |{" "}
        <Link to="/my-orders">My Orders</Link>
        {props.userAdmin && (
          <>
            | <Link to="/admin">Admin Page</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
