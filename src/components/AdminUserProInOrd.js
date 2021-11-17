import { useEffect, useState } from "react";
import AdminProInfo from "./AdminUserProInfo";

function AdminUsersProInOrd(props) {
  const [listOfProductByIds, setListOfProductByIds] = useState([]);

  const baseURL = props.baseURL;
  const orderId = props.orderId;

  useEffect(() => {
    fetchProductList();
  }, []);

  async function fetchProductList() {
    const fetchURL = `${baseURL}products_in_orders/${orderId}`;
    const resp = await fetch(`${fetchURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await resp.json();
    // console.log("fetchProductList info:", info);
    if (info !== undefined) {
      setListOfProductByIds(info);
      // console.log(listOfProductByIds);
    }
  }

  return (
    <>
      Items in This Order:
      <div>
        {listOfProductByIds.map((product) => {
          return (
            <div key={product.id}>
              <AdminProInfo baseURL={baseURL} productId={product.product_id} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AdminUsersProInOrd;
