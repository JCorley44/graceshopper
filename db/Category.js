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

module.exports = {
  getAllCategories,
  addCategory,
  getCategoryByName,
  getCategoryById,
};
