////////////////////// DATABASE TABLES ////////////////////////

///////////////////
//PRODUCTS/////////
///////////////////

/*
 id SERIAL PRIMARY KEY
 title VARCHAR(255) UNIQUE NOT NULL
 description VARCHAR(255) NOT NULL
 price DECIMAL NOT NULL
 quantity INTEGER NOT NULL
 category_id INTEGER REFERENCES categories(id)
 */

//////////////////
//CATEGORIES//////
//////////////////

/*
id SERIAL PRIMARY KEY
name VARCHAR(255) NOT NULL
*/

//////////////////
//USERS///////////
//////////////////

/*
 id SERIAL PRIMARY KEY
 email VARCHAR(255) UNIQUE NOT NULL
 password VARCHAR(255) NOT NULL
 */

///////////////////
//ORDERS///////////
///////////////////

/*
  id SERIAL PRIMARY KEY
  user_id INTEGER REFERENCES users(id)
 */

/////////////////////
//PRODUCTS_IN_ORDERS/
/////////////////////

/*
  id SERIAL PRIMARY KEY
  product_id INTEGER REFERENCES products(id)
  price DECIMAL REFERENCES products(price)
  order_id INTEGER REFERENCES orders(id)
  quantity INTEGER NOT NULL
*/

///////////////////
//REVIEWS//////////
///////////////////

/*
product_id INT REFERENCES product(id)
user_id INT REFERENCES users(id)
comment TEXT
*/

/////////////////////////////////////////////////////////

//////////////////// API ///////////////////////////////

/*
If any routes send an error.

{
  error: "There is blah blah blah here."
}
*/

// /api/products/ GET
// Sends back all products.

req.body = {};

{
	data: [
		{
			id: 1,
			title: "Samsung TV",
			description: "50 inch Samsung TV",
			price: 30,
			quantity: 1400,
			category_id: 24,
		},
	];
}

// /api/products/:productId GET
// Sends Back one product by the id
api.get("/", async (req, res, next) => {
	try {
		const products = await getAllProducts();
		res.send(products);
	} catch (error) {
		throw error;
	}
});

req.body = {
	id: 1,
};

{
	data: [
		{
			id: 1,
			title: "Samsung TV",
			description: "50 inch Samsung TV",
			price: 30,
			quantity: 1400,
			category_id: 24,
		},
	];
}

// /api/products-update/:productId PATCH
// requires

req.body = {
	id: 1,
	name: "asdfasdf",
	description: "Updated property",
	price: 30,
	quantity: 1400,
	category_id: 24,
};

// Sends Back

{
	data: [
		{
			id: 1,
			title: "Samsung TV",
			description: "500 inch Samsung TV",
			price: 30,
			quantity: 1400,
			category_id: 24,
		},
	];
}

// /api/products/:productId PATCH
// requires

req.body = {
	title: "Samsung TV",
	description: "500 inch Samsung TV",
	price: 30,
	quantity: 1400,
	category_id: 24,
};

// Sends Back

{
	data: [
		{
			id: 1,
			title: "Samsung TV",
			description: "500 inch Samsung TV",
			price: 30,
			quantity: 1400,
			category_id: 24,
		},
	];
}

// api/categories/ GET
// Sends back
{
	data: [{}, {}, {}];
}

// api/categories/ POST
// Required

req.body = {
	name: "Category name",
};

// Sends back

{
	data: [{}, {}, {}];
}

// api/categories/:categoryId

{
	data: [
		{
			id: "id",
			name: "name",
		},
	];
}

// api/users/ GET
// Sends back
{
	data: [{}, {}, {}];
}

// api/users/ POST

// Requires
req.body = {
	email: "email",
	password: "password",
};

// Sends back

{
	data: [
		{
			id: "id",
			email: "email",
			password: "password",
		},
	];
}

// api/users/:userId PATCH

// Requires
req.body = {
	email: "email",
	password: "password",
};

// Sends back
{
	data: [
		{
			id: "id",
			email: "email",
			password: "password",
		},
	];
}

// api/users/:userId DELETE

// Requires
req.body = {
	email: "email",
	password: "password",
};

// api/orders/ GET

// Sends back
{
	data: [{}, {}, {}];
}

// api/orders/ POST
// Requires
req.body = {
	userId: "user id",
};

// Sends back

{
	data: [{}, {}, {}];
}

// api/products_in_orders/:orderId GET
// Sends Back

{
	data: [
		{
			id: "id",
			product_id: "product id",
			price: "price",
			order_id: "order id",
			quantity: "quantity",
		},
	];
}

//
