import { useEffect, useState } from "react";

function RelatedProducts(props) {
  const [relatedItemList, setRelatedItemList] = useState([]);
  const baseURL = props.baseURL;
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(e) {
    console.log(baseURL);
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
  //console.log(relatedItemList);
  return (
    <>
      <div>
        {relatedItemList.map((product) => {
          return (
            <div key={product.id}>
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
