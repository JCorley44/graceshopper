import { useEffect, useState } from "react";
import AdminCatEdit from "./AdminCatEdit";

function AdminCat(props) {
	const [categoriesList, setCategoriesList] = useState([]);
	const [newCategory, setNewCategory] = useState("");
	const baseURL = props.baseURL;
	const token = props.token;

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

	const handleDelete = async (categoryId) => {
		console.log("Delete was clicked");
		console.log(categoryId);
		const resp = await fetch(
			`${baseURL}categories/admin/delete-category/${categoryId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const info = await resp.json();
		console.log(info);
		fetchCategories();
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
								<button onClick={(e) => handleDelete(category.id)}>
									Delete Category
								</button>
								<AdminCatEdit
									categoryId={category.id}
									baseURL={props.baseURL}
									fetchCategories={fetchCategories}
								/>
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
