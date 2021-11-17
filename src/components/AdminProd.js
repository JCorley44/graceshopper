import { useEffect, useState } from "react";
import AdminProdAdd from "./AdminProdAdd";
import AdminProdEd from "./AdminProdEd";
import AdminProdInfo from "./AdminProdInfo";

function AdminProd(props) {

  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_id, setCategory_id] = useState("");
  // const [category, setCategory] = useState("");
  const baseURL = props.baseURL;

	

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Populates List of Products.
  async function fetchProducts() {
    const resp = await fetch(`${baseURL}products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await resp.json();
    // console.log(info);
    setProductsList(info);
  }

  // Populates list of categories displayed in the drop down select menu for adding a product.
  async function fetchCategories() {
    const resp = await fetch(`${baseURL}categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await resp.json();
    // console.log(info);
    setCategoryList(info);
    // console.log(categoryList);
  }


	async function fetchCategory(categoryId) {
		// console.log("Hello from fetch.", categoryId);
		const resp = await fetch(`${baseURL}categories/${categoryId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		// console.log(resp);
		const info = await resp.json();
		// console.log(info);
		setCategoryName(info.name);
	}

	return (
		<>
			Products Management
			<div>
				<div>
					{productsList.map((product) => {
						// fetchCategory(product.category_id);

						// console.log("Hello from productList.map", product.category_id);
						return (
							<div key={product.id}>
								<AdminProdInfo
									product={product}
									categoryName={categoryName}
									setCategoryName={setCategoryName}
									fetchCategory={fetchCategory}
								/>
								<AdminProdEd
									product={product}
									categoryList={categoryList}
									fetchProducts={fetchProducts}
									baseURL={baseURL}
									categoryName={categoryName}
									setCategoryName={setCategoryName}
									fetchCategory={fetchCategory}
								/>
							</div>
						);
					})}
				</div>
				<AdminProdAdd
					categoryList={categoryList}
					fetchProducts={fetchProducts}
					baseURL={baseURL}
				/>
			</div>
		</>
	);

}

export default AdminProd;
