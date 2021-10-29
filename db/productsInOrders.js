const client = require("./client");
const { getProductById } = require("./products");

async function addProductsToOrder({ product_id, price, order_id, quantity }) {
  const product = await getProductById(product_id);

  console.log(price);
  try {
    const resp = await client.query(
      `
        INSERT INTO products_in_orders (product_id, price, order_id, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [product_id, price, order_id, quantity]
    );
    const products_in_orders = resp.rows[0];
    return products_in_orders;
  } catch (error) {
    throw error;
  }
}
addProductsToOrder({
  product_id: 1,
  order_id: 1,
  price: 100.0,
  quantity: 1,
}).then(console.log);

module.exports = { addProductsToOrder };
