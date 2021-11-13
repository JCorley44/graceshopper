import { useState } from "react";

function AdminProdAdd(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [category_id, setCategory_id] = useState("");
	const baseURL = props.baseURL;

	// Handles the submit of the Add a Product form.
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log("Add");
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
		props.fetchProducts();
		return info;
	};

	return (
		<>
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
					<select onChange={(e) => setCategory_id(e.target.value)}>
						{props.categoryList.map((category) => {
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
		</>
	);
}

export default AdminProdAdd;
