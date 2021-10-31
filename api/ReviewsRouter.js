const {
	getReviewsByProductId,
	createReview,
	editReview,
	deleteReview,
} = require("../db/reviews");

const reviewsRouter = require("express").Router();

// Retrieving reviews for a product.
reviewsRouter.get("/:productId", async (req, res) => {
	const { productId } = req.params;
	try {
		const reviews = await getReviewsByProductId(productId);
		return res.send(reviews);
	} catch (error) {
		console.log("Error in reviewsRouter get");
		throw error;
	}
});

// Create a new Review
reviewsRouter.post("/:productId", async (req, res) => {
	const product_id = req.params.productId;
	const { user_id, content } = req.body;

	try {
		const review = await createReview({ product_id, user_id, content });
		return res.send(review);
	} catch (error) {
		console.log("Error in reviewsRouter post");
		throw error;
	}
});

//Edit a Review
reviewsRouter.patch("/:productId/:reviewId", async (req, res) => {
	const reviewId = req.params.reviewId;
	const content = req.body.content;
	try {
		const review = await editReview(reviewId, content);
		return res.send(review);
	} catch (error) {
		console.log("Error in reviewsRouter patch");
		throw error;
	}
});

//Delete a Review
reviewsRouter.delete("/:productId/:reviewId", async (req, res) => {
	const reviewId = req.params.reviewId;
	try {
		const review = await deleteReview(reviewId);
		return res.send(review);
	} catch (error) {
		console.log("Error in reviewRouter Delete");
		throw error;
	}
});

module.exports = reviewsRouter;
