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
createProduct({
  title: "tv",
  description: "50 inch tv",
  price: "$100",
  quantity: 50,
  category_id: 12,
});
module.exports = {
  createProduct,
};
