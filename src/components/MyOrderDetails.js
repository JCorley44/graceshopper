import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const MyOrderDetails = (props) => {
  const { baseURL, product, orderId } = props;
  const productId = product.product_id;
  const [productDetails, setProductDetails] = useState({});
  const { title, description, price } = productDetails;
  useEffect(() => {
    fetchProductDetails();
  }, []);

  async function fetchProductDetails() {
    const resp = await fetch(`${baseURL}products/${productId}`, {
      method: "GET",
    });
    const info = await resp.json();
    console.log(info);
    setProductDetails(info);
  }
  // rando comment
  return (
    <>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Price: {price}</p>
    </>
  );
};
export default MyOrderDetails;
