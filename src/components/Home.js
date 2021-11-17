import "../homeStyles";
import { homeStyles } from "../homeStyles";
import RelatedProducts from "./RelatedProducts";

function Home(props) {
  const baseURL = props.baseURL;

  return (
    <div>
      {props.user ? (
        <h2>Welcome {props.user.username}!</h2>
      ) : (
        <h2>Welcome Stranger!</h2>
      )}
      <div id="main" style={homeStyles.main}>
        <div id="related-products" style={homeStyles.relatedProducts}>
          {" "}
          related products
          <RelatedProducts baseURL={baseURL} />
        </div>
        <div id="featured-products" style={homeStyles.featuredProducts}>
          {" "}
          featured products
        </div>
        <div id="user-hist" style={homeStyles.userHistory}>
          {" "}
          user history
        </div>
      </div>
    </div>
  );
}

export default Home;
