const client = require("./client");

async function createProduct({
  title,
  description,
  price,
  quantity,
  category_id,
}) {
  try {
    const resp = await client.query(
      `
        INSERT INTO products
        (title, description, price, quantity, category_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [title, description, price, quantity, category_id]
    );
    console.log(resp);
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}

//the error might have been here. please be careful when creating data. be sure to look at the tables for the
//datatypes for any input data
createProduct({
  title: "tv",
  description: "50 inch tv",
  price: 100,
  quantity: 50,
  category_id: 5,
}).then(console.log);

async function getAllProducts() {
  try {
    const resp = await client.query(`
    SELECT * FROM products
    `);
    const info = resp.rows;
    console.log(info);
    return info;
  } catch (error) {
    throw error;
  }
}

async function updateProducts({
  id,
  title,
  description,
  price,
  quantity,
  category_id,
}) {
  try {
    if (title) {
      await client.query(
        `
    UPDATE products
    SET title=$2
    WHERE id=$1;
    `,
        [id, title]
      );
    }
    if (description) {
      await client.query(
        `
    UPDATE products
    SET description=$2
    WHERE id=$1;
    `,
        [id, description]
      );
    }
    if (price) {
      await client.query(
        `
    UPDATE products
    SET price=$2
    WHERE id=$1;
    `,
        [id, price]
      );
    }
    if (quantity) {
      await client.query(
        `
    UPDATE products
    SET quantity=$2
    WHERE id=$1;
    `,
        [id, quantity]
      );
    }
    if (category_id) {
      await client.query(
        `
    UPDATE products
    SET category_id=$2
    WHERE id=$1;
    `,
        [id, category_id]
      );
    }
    const {
      rows: [product],
    } = await client.query(
      `
  SELECT * FROM products WHERE id=$1
  `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const resp = await client.query(
      `
  SELECT * FROM products WHERE id=$1
  `,
      [id]
    );
    const info = resp.rows[0];
    console.log(info);
    return info;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createProduct,
  getAllProducts,
  updateProducts,
  getProductById,
};
