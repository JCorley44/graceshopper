import { useEffect, useState } from "react/cjs/react.development";
import MyOrderInd from "./MyOrderInd";
function MyOrders(props) {
  const [orderList, setOrderList] = useState([]);
  const user = props.user;
  const baseURL = props.baseURL;
  const userId = user.id;
  console.log(user);

  useEffect(() => {
    fetchOrdersByUser();
  }, []);

  async function fetchOrdersByUser() {
    const resp = await fetch(`${baseURL}users/${userId}/orders`, {
      method: "GET",
    });
    const info = await resp.json();
    console.log(info);
    setOrderList(info);
  }

  return (
    <div>
      {orderList.map((order) => {
        return (
          <div key={order.id}>
            <MyOrderInd orderId={order.id} baseURL={baseURL} />
          </div>
        );
      })}
    </div>
  );
  //   const [orders, setOrders] = useState([]);
  //   const [orderId, setOrderId] = useState("");
  //   const user = props.user;
  //   const userId = user.id;

  //   const baseURL = props.baseURL;
  //   // const productId = products_id;
  //   console.log(props);

  //   useEffect(() => {
  //     fetchMyOrders();
  //   }, []);

  //   async function fetchMyOrders() {
  //     console.log(userId);
  //     const resp = await fetch(`${baseURL}orders/${userId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(resp);
  //     const info = await resp.json();
  //     setOrders(info);
  //     console.log(info);
  //   }
  //   console.log(orders);

  //   return (
  //     <>
  //       <MyOrderInd
  //         orders={orders}
  //         baseURL={baseURL}
  //         userId={userId}
  //         orderId={orderId}
  //         setOrderId={setOrderId}
  //       />
  //     </>
  //   );
}

export default MyOrders;
