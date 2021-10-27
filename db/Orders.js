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

module.exports = { createOrder };
