import { useEffect, useState } from "react";
import MyOrderDetails from "./MyOrderDetails";

const MyOrderInd = (props) => {
  const [productsInOrder, setProductsInOrder] = useState([]);
  const orderId = props.orderId;
  const baseURL = props.baseURL;

  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    const resp = await fetch(`${baseURL}products_in_orders/${orderId}`, {
      method: "GET",
    });
    const info = await resp.json();
    console.log(info);
    setProductsInOrder(info);
  }

  return (
    <>
      <div>
        {productsInOrder.map((product) => {
          return (
            <div key={product.id}>
              <MyOrderDetails
                orderId={orderId}
                baseURL={baseURL}
                product={product}
              />
            </div>
          );
        })}
      </div>
    </>
  );
  // const [ordersList, setOrdersList] = useState([]);
  // const [details, setDetails] = useState([]);
  // // const [orderId, setOrderId] = useState("");
  // const baseURL = props.baseURL;
  // const userId = props.userId;
  // // const orderId = props.order.id;
  // // const { product } = props;
  // const { title, description, price } = details;
  // // console.log(ordersList);

  // useEffect(() => {
  //   fetchProductsInOrders();
  //   // fetchDetails();
  //   fetchProductsInOrdersById();
  // }, []);

  // // async function fetchDetails() {
  // //   const productId = product.product_id;
  // //   const resp = await fetch(`${baseURL}products/${productId}`, {
  // //     method: "GET",
  // //   });
  // //   const info = await resp.json();
  // //   setDetails(info);
  // // }

  // async function fetchProductsInOrders() {
  //   const resp = await fetch(`${baseURL}users/${userId}/orders`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const info = await resp.json();
  //   setOrdersList(info);
  // }

  // async function fetchProductsInOrdersById() {
  //   console.log("start", orderId);
  //   const resp = await fetch(`${baseURL}products_in_orders/${orderId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const info = await resp.json();
  //   console.log(info);
  // }

  // return (
  //   <>
  //     {ordersList.map((order) => {
  //       return (
  //         <div key={order.id}>
  //           <p>{order.product_id}</p>
  //           <p>Title{title}</p>
  //           <p>Description{description}</p>
  //           <p>Price{price}</p>
  //         </div>
  //       );
  //     })}
  //   </>
  // );
};
export default MyOrderInd;
