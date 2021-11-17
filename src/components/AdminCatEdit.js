import { useEffect, useState } from "react";

function AdminCatEdit(props) {
	const [categoryName, setCategoryName] = useState("");
	const baseURL = props.baseURL;
	const categoryId = props.categoryId;
	const fetchCategories = props.fetchCategories;

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Edit was clicked...");
		const fetchURL = `${baseURL}categories/admin/edit-category/${categoryId}`;
		// console.log(fetchURL);
		const resp = await fetch(`${fetchURL}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				categoryName,
			}),
		});
		const info = await resp.json();
		console.log("info", info);
		fetchCategories();
		return info;
	};
	return (
		<>
			<div>
				<form className="adCatForm" onSubmit={handleSubmit}>
					<input
						onChange={(e) => setCategoryName(e.target.value)}
						type={"text"}
						placeholder={"Set New Category Name"}
						value={categoryName}
					></input>
					<button>Edit Category</button>
				</form>
			</div>
		</>
	);
}

export default AdminCatEdit;
