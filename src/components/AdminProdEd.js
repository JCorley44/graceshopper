import { useState } from "react";

function AdminProdEd(props) {

	const [title, setTitle] = useState(props.product.title);
	const [description, setDescription] = useState(props.product.description);
	const [price, setPrice] = useState(props.product.price);
	const [quantity, setQuantity] = useState(props.product.quantity);
	const [category_id, setCategory_id] = useState(props.product.category_id);
	const baseURL = props.baseURL;
	const productId = props.product.id;
	// console.log(props);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log("Handle Submit Fired", category_id);
		const resp = await fetch(`${baseURL}products/${productId}`, {
			method: "PATCH",
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
		// console.log("Should have fetched", info);
		props.fetchCategory(info.category_id);
		return info;
	};

	return (
		<>
			<div>
				<h3>Edit Product: {props.product.title}</h3>
				<form onSubmit={handleSubmit}>
					<input
						onChange={(e) => setTitle(e.target.value)}
						type={"text"}
						value={title}
					></input>
					<input
						onChange={(e) => setDescription(e.target.value)}
						type={"text"}
						value={description}
					></input>
					<input
						onChange={(e) => setPrice(e.target.value)}
						type={"text"}
						value={price}
					></input>
					<input
						onChange={(e) => setQuantity(e.target.value)}
						type={"text"}
						value={quantity}
					></input>
					<select onChange={(e) => setCategory_id(e.target.value)}>
						{props.categoryList.map((category) => {
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
		</>
	);

}

export default AdminProdEd;
