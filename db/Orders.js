const client = require("./client");

async function createOrder(userId) {
  try {
    const { rows: userOrder } = await client.query(
      `
      INSERT INTO orders (user_id)
      VALUES ($1)
      RETURNING *
    `,
      [userId]
    );
    return userOrder;
  } catch (error) {
    throw error;
  }
}

async function updateOrder(id, user_id) {
  try {
    const resp = await client.query(
      `
    UPDATE orders
    SET user_id=$2
    WHERE id=$1;
    `,
      [id, user_id]
    );

    const order = resp.rows[0];
    return order;
  } catch (error) {
    throw error;
  }
}
module.exports = { createOrder, updateOrder };
