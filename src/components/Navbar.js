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
    props.setSearchedProducts(filteredSearch);
    history.push("/search-results");
  };
  return (
    <div className="navbar">
      <div>
        <img
          id="img"
          src="https://th.bing.com/th/id/R.7b6b26b2f436501b395f6113672a4205?rik=9bTKdt3ND%2f6hUg&riu=http%3a%2f%2fi4.glitter-graphics.org%2fpub%2f1263%2f1263854zlo6cy5mpf.gif&ehk=iZsJW%2fhvCeOiPnYomxmSkfbYO7j2mP1xOUckLuzj3og%3d&risl=&pid=ImgRaw&r=0"
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
        | <Link to="/my-cart">My Cart</Link> |{" "}
        <Link to="/my-orders">My Orders</Link>
      </div>
    </div>
  );
}

export default Navbar;
