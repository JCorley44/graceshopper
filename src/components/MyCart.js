import { useEffect, useState } from "react";

const MyCart = (props) => {
  const [cart, setCart] = useState([]);
  const baseURL = props.baseURL;

  useEffect(() => {
    async function createCart() {
      const resp = await fetch(`${baseURL}orders/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      });
      const info = await resp.json();
      setCart(info);
    }
    createCart();
  }, []);

  console.log(cart);
  return <> My Cart </>;
};

export default MyCart;
