import { useEffect, useState } from "react";

function AdminCat(props) {
	const [categoriesList, setCategoriesList] = useState([]);
	const [newCategory, setNewCategory] = useState("");
	const baseURL = props.baseURL;

	useEffect(() => {
		fetchCategories();
	}, []);

	async function fetchCategories() {
		const resp = await fetch(`${baseURL}categories`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const info = await resp.json();
		// console.log(info);
		setCategoriesList(info);
	}

	const handleDelete = async (e) => {
		// const resp = await fetch(``)
		console.log("Delete was clicked");
	};

	const handleEdit = async (e) => {
		console.log("Edit was clicked...");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(newCategory);
		const resp = await fetch(`${baseURL}categories/new-category`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				categoryName: newCategory,
			}),
		});
		const info = await resp.json();
		// console.log("info", info);
		fetchCategories();
		return info;
	};

	// console.log(newCategory);

	return (
		<>
			Categories Management
			<div>
				<div>
					{categoriesList.map((category) => {
						return (
							<div key={category.id}>
								<h3>{category.name}</h3>
								<button onClick={handleEdit}>Edit Category</button>
								<button onClick={handleDelete}>Delete Category</button>
							</div>
						);
					})}
				</div>
				<div>
					<h3>Add a New Category</h3>
					<form onSubmit={handleSubmit}>
						<input
							onChange={(e) => setNewCategory(e.target.value)}
							type={"text"}
							placeholder={"Create a New Category"}
							value={newCategory}
						></input>
						<button>Submit</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default AdminCat;
