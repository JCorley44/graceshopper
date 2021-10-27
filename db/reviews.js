const client = require("./client");

async function createReview({ product_id, user_id, comment }) {
  try {
    const response = await client.query(
      `
    INSERT INTO reviews
    ("product_id", "user_id", comment)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
      [product_id, user_id, comment]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReview,
};
