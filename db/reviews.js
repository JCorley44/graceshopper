const client = require("./client");

//Function for creating the review.
async function createReview({ product_id, user_id, content }) {
	console.log("Review Start", product_id, user_id, content);

	try {
		const response = await client.query(
			`
    INSERT INTO reviews (product_id, user_id, content)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
			[product_id, user_id, content]
		);
		// console.log("Hello Reviews:", response.rows);
		return response.rows;
	} catch (error) {
		throw error;
	}
}

// Get Reviews By Product id.

async function getReviewsByProductId(product_id) {
	console.log("Getting the Reviews");
	try {
		const reviews = await client.query(
			`
    SELECT * FROM reviews
    WHERE product_id = $1;
    `,
			[product_id]
		);

		return reviews.rows;
	} catch (error) {
		console.log("Error in getting the reviews.");
	}
}

//Update Review

async function editReview(reviewId, newContent) {
	console.log("Editing Review");
	try {
		const edit = await client.query(
			`
  UPDATE reviews
  SET content=$2
  WHERE id=$1;
  `,
			[reviewId, newContent]
		);

		console.log(edit.rows);
		return edit.rows;
	} catch (error) {
		console.log("Error updating Review");
		throw error;
	}
}

//Delete Review

async function deleteReview(id) {
	console.log("Start delete review");
	try {
		const remove = await client.query(
			`
    DELETE FROM reviews
    WHERE id=$1
    RETURNING *;
    `,
			[id]
		);

		return remove.rows;
	} catch (error) {
		console.log("Error in Deleting review");
		throw error;
	}
}

module.exports = {
	createReview,
	editReview,
	deleteReview,
	getReviewsByProductId,
};
