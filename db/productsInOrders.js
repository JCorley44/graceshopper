const client = require("./client");
const { getProductById } = require("./products");

async function addProductsToOrder({ product_id, order_id, quantity }) {
	const product = await getProductById(product_id);

	try {
		const resp = await client.query(
			`
        INSERT INTO products_in_orders (product_id, order_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
			[product_id, order_id, quantity]
		);
		const products_in_orders = resp.rows[0];
		return products_in_orders;
	} catch (error) {
		throw error;
	}
}

async function deleteProdctInOrders(product_id) {
	try {
		const cart = await client.query(
			`
    DELETE FROM products_in_orders
    WHERE product_id = $1
    RETURNING *;
    `,
			[product_id]
		);
		return cart.rows;
	} catch (error) {
		throw error;
	}
}

async function deleteCart(order_id) {
	try {
		const cart = await client.query(
			`
    DELETE FROM products_in_orders 
    WHERE order_id = $1
    RETURNING *;
    `,
			[order_id]
		);
		// console.log(cart.rows);
		return cart.rows;
	} catch (error) {
		throw error;
	}
}

async function getAllProductsInAnOrderByOrderId(order_id) {
	// console.log("Hi from DB your order id is:", order_id);
	try {
		const productList = await client.query(
			`
		SELECT * FROM products_in_orders
		WHERE order_id = $1
		`,
			[order_id]
		);

		return productList.rows;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	addProductsToOrder,
	deleteProdctInOrders,
	deleteCart,
	getAllProductsInAnOrderByOrderId,
};
