import { useEffect, useState } from "react";
import AdminProdEd from "./AdminProdEd";

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

	// This was an attempt to get the Category name displaying instead of the Category ID. Hit a roadblock here with the API returning a 404. Line 91 which is also commented out is where this function was being called.
	// async function fetchCategory(categoryId) {
	// 	console.log(categoryId);
	// 	const resp = await fetch(`${baseURL}categories/${categoryId}`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});
	// 	console.log(resp);
	// 	// const info = await resp.json();
	// 	// console.log(info);
	// }

	// Handles the submit of the Add a Product form.
	const handleSubmit = async (e) => {
		e.preventDefault();
		const resp = await fetch(`${baseURL}products/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				description,
				price,
				quantity,
				category_id,
			}),
		});
		const info = await resp.json();
		// console.log("info", info);
		fetchProducts();
		return info;
	};

	//Sets the Category id based on the selected category in the Create Product form.
	const handleSelect = (e) => {
		setCategory_id(e.target.value);
	};

	return (
		<>
			Products Management
			<div>
				<div>
					{productsList.map((product) => {
						// fetchCategory(product.category_id);
						// console.log(product);
						return (
							<div key={product.id}>
								<h3>{product.title}</h3>
								<p>Product Description: {product.description}</p>
								<p>Price: {product.price}</p>
								<p>On Hand: {product.quantity}</p>
								<p>Category: {product.category_id}</p>
								<AdminProdEd
									product={product}
									categoryList={categoryList}
									fetchProducts={fetchProducts}
									baseURL={baseURL}
								/>
							</div>
						);
					})}
				</div>
				<div>
					<h3>Add a New Product</h3>
					<form onSubmit={handleSubmit}>
						<input
							onChange={(e) => setTitle(e.target.value)}
							type={"text"}
							placeholder={"Product Title"}
							value={title}
						></input>
						<input
							onChange={(e) => setDescription(e.target.value)}
							type={"text"}
							placeholder={"Product Description"}
							value={description}
						></input>
						<input
							onChange={(e) => setPrice(e.target.value)}
							type={"text"}
							placeholder={"Price"}
							value={price}
						></input>
						<input
							onChange={(e) => setQuantity(e.target.value)}
							type={"text"}
							placeholder={"Quantity On Hand"}
							value={quantity}
						></input>
						<select value={categoryList} onChange={handleSelect}>
							{categoryList.map((category) => {
								// console.log(category);
								return (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								);
							})}
						</select>
						<button>Submit</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default AdminProd;
