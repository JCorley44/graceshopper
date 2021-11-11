const client = require("./client");

async function getAllCategories() {
	try {
		const { rows } = await client.query(`
      SELECT * FROM categories;
    `);
		return rows;
	} catch (error) {
		throw error;
	}
}

async function addCategory(categoryName) {
	try {
		const {
			rows: [category],
		} = await client.query(
			`
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *;
    `,
			[categoryName]
		);
		return category;
	} catch (error) {
		throw error;
	}
}

async function getCategoryByName(categoryName) {
	try {
		const {
			rows: [category],
		} = await client.query(
			`
      SELECT * FROM categories
      WHERE name=$1;
    `,
			[categoryName]
		);
		return category;
	} catch (error) {
		throw error;
	}
}

async function getCategoryById(id) {
	try {
		const {
			rows: [category],
		} = await client.query(
			`
    SELECT * FROM categories
    WHERE id=$1;
    `,
			[id]
		);
		return category;
	} catch (error) {
		throw error;
	}
}

async function deleteCategoryById(id) {
	// console.log("Hi from DB categories. Your cetegory id is:", id);
	try {
		const {
			rows: [deletedCategory],
		} = await client.query(
			`
    DELETE FROM categories
    WHERE id=$1
    RETURNING *;
    `,
			[id]
		);
		return deletedCategory;
	} catch (error) {
		throw error;
	}
}

async function updateCategory({ categoryId, categoryName }) {
	const details = { categoryId, categoryName };
	const id = details.categoryId;
	const catName = details.categoryName;
	// console.log("Hi from DB categories. Your cetegory id is:", id);
	try {
		const update = await client.query(
			`
    UPDATE categories
    SET name = $2
    WHERE id = $1
    `,
			[id, catName]
		);

		return update.rows;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getAllCategories,
	addCategory,
	getCategoryByName,
	getCategoryById,
	deleteCategoryById,
	updateCategory,
};
