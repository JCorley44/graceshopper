import { useEffect, useState } from "react";
const baseURL = `http://localhost:3000/api/`;

function RelatedProducts() {
  const [relatedItemList, setRelatedItemList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(e) {
    const resp = await fetch(`${baseURL}products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await resp.json();
    console.log(info);
    setRelatedItemList(info);
  }
  console.log(relatedItemList);
  return (
    <>
      <div>
        {relatedItemList.map((product) => {
          return (
            <div>
              <h4>{product.title}</h4>
              <h5>{product.price}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RelatedProducts;
