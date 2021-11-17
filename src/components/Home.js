import RelatedProducts from "./RelatedProducts";
import "../index.css";
import { homeStyles } from "../homeStyles";

function Home(props) {
  const baseURL = props.baseURL;

  return (
    <div className="Home">
      {props.user ? (
        <h2>Welcome {props.user.username}!</h2>
      ) : (
        <h2>Welcome Stranger!</h2>
      )}
      <div id="main">
        <div id="related-products">
          {" "}
          Related Products
          <RelatedProducts baseURL={baseURL} />
        </div>
        <div id="featured-products"> Featured Products</div>
        <div id="user-hist"> User History</div>
      </div>
    </div>
  );
}

export default Home;
