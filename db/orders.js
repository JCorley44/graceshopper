const client = require("./client");

async function createOrder({ user_id, is_purchase }) {
  try {
    const { rows: userOrder } = await client.query(
      `
      INSERT INTO orders (user_id, is_purchase)
      VALUES ($1, $2)
      RETURNING *
    `,
      [user_id, is_purchase]
    );
    return userOrder;
  } catch (error) {
    throw error;
  }
}

async function updateOrder({ id, quantity }) {
  // console.log("Updating Order");
  try {
    const update = await client.query(
      `
    UPDATE products_in_orders
    SET quantity = $2
    WHERE id = $1
    RETURNING *;
    `,
      [id, quantity]
    );
    console.log(update.rows);
    return update.rows;
  } catch (error) {
    console.log("Error updating order");
    throw error;
  }
}

async function completeOrder(id) {
  try {
    const resp = await client.query(
      `
    UPDATE orders
    SET is_purchase = true
    WHERE id=$1
    RETURNING *;
    `,
      [id]
    );

    const order = resp.rows[0];
    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const resp = await client.query(`
    SELECT * FROM orders
    `);
    const info = resp.rows;
    // console.log("hello");
    return info;
  } catch (error) {
    throw error;
  }
}

async function getPurchaseOrders(user_id) {
  try {
    const resp = await client.query(
      `
    SELECT * FROM orders
    WHERE is_purchase = true AND user_id = $1;
    `,
      [user_id]
    );
    const orders = resp.rows;
    for (let order of orders) {
      const resp = await client.query(
        `
      SELECT title FROM  products LEFT JOIN products_in_orders ON "order_id" = $1;
      `,
        [order.id]
      );
      const products = resp.rows;
      orders.products = products;
    }
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getUserCart(user_id) {
  console.log("db function");
  try {
    const resp = await client.query(
      `
    SELECT * FROM orders
    WHERE is_purchase = false AND user_id = $1;
    `,
      [user_id]
    );
    const cart = resp.rows[0];
    const info = await client.query(
      `
    SELECT name FROM products LEFT JOIN products_in_orders ON "order_id" = $1;
    `,
      [cart.id]
    );
    const products = info.rows;
    cart.products = products;
    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  completeOrder,
  getPurchaseOrders,
  getUserCart,
  getAllOrders,
  updateOrder,
};
