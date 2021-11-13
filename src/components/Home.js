import RelatedProducts from "./RelatedProducts";
import "../index.css";

function Home(props) {
  console.log(props.user);
  return (
    <div>
      {props.user ? (
        <h2>Welcome {props.user.username}!</h2>
      ) : (
        <h2>Welcome Stranger!</h2>
      )}
      <div id="main">
        <div id="related-products">
          {" "}
          Related Products
          <RelatedProducts />
        </div>
        <div id="featured-products"> Featured Products</div>
        <div id="user-hist"> User History</div>
      </div>
    </div>
  );
}

export default Home;
