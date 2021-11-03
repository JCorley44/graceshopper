import "../homeStyles";
import { homeStyles } from "../homeStyles";
import RelatedProducts from "./RelatedProducts";
const baseURL = `http://localhost:3000/api/`;

function Home() {
  return (
    <div>
      Currently on Home Page
      <div id="main" style={homeStyles.main}>
        <div id="related-products" style={homeStyles.relatedProducts}>
          {" "}
          related products
          <RelatedProducts />
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
