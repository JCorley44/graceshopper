const { addCategory, getAllCategories } = require("./Category");
const client = require("./client");
const bcrypt = require("bcrypt");
const { createProduct } = require("./products");
const { createUser } = require("./users");
const { addProductsToOrder } = require("./productsInOrders");
const { createOrder } = require("./Orders");

async function dropTables() {
	try {
		console.log("dropping tables");
		await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products_in_orders;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS categories;
        `);
	} catch (error) {
		console.log("Error dropping tables");
		throw error;
	}
}

async function createTables() {
	try {
		console.log("creating tables");
		await client.query(`

        CREATE TABLE categories(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL,
            price DECIMAL NOT NULL,
            quantity INTEGER NOT NULL,
            category_id INTEGER REFERENCES categories(id)
        );

        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
		      	username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );

        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          is_purchase BOOLEAN DEFAULT false
        );

        CREATE TABLE products_in_orders(
            id SERIAL PRIMARY KEY,
            product_id INTEGER REFERENCES products(id),
            price DECIMAL,
            order_id INTEGER REFERENCES orders(id),
            quantity INTEGER NOT NULL
        );

        CREATE TABLE reviews(
            product_id INT REFERENCES products(id),
            user_id INT REFERENCES users(id),
            comment TEXT
        );

        `);
	} catch (error) {
		console.log("Error creating tables");
		throw error;
	}
}

async function createInitialCategory() {
	const categories = ["anime", "auto", "model kits", "coding", "sports"];

	try {
		for (let category of categories) {
			await addCategory(category);
		}
	} catch (error) {
		throw error;
	}
}

async function createInitialUsers() {
	console.log("Start Create Initial Users");
	const users = [
		{
			email: "webslinger@email.com",
			username: "Perter Parker",
			password: "spidersense",
		},
		{
			email: "iamironman@email.com",
			username: "Tony Stark",
			password: "iloveyou3000",
		},
		{
			email: "worldbreakerhulk@email.com",
			username: "Bruce Banner",
			password: "alwaysangry",
		},
		{
			email: "godofthunder@email.com",
			username: "Thor Odinson",
			password: "asgardian",
		},
		{
			email: "firstavenger@email.com",
			username: "Steve Rogers",
			password: "hailhydra",
		},
	];

	try {
		for (let user of users) {
			await createUser(user);
		}
	} catch (error) {
		console.log("Error creating initial users");
		throw error;
	}
}

async function createInitialProducts() {
	try {
		console.log("Starting to create products!");
		const productsToCreate = [
			{
				title: "tv",
				description: "50 inch tv",
				price: 100,
				quantity: 50,
				category_id: 1,
			},
			{
				title: "chair",
				description: "rocking chair",
				price: 100,
				quantity: 50,
				category_id: 2,
			},
			{
				title: "vacumm",
				description: "large vacuum cleaner",
				price: 100,
				quantity: 50,
				category_id: 3,
			},
			{
				title: "bed",
				description: "day bed",
				price: 100,
				quantity: 50,
				category_id: 4,
			},
			{
				title: "dog kennel",
				description: "large dog kennel",
				price: 100,
				quantity: 50,
				category_id: 1,
			},
		];
		const products = await Promise.all(
			productsToCreate.map((product) => createProduct(product))
		);
		return products;
	} catch (error) {
		throw error;
	}
}

async function initialGetAllCategories() {
	try {
		await getAllCategories();
	} catch (error) {
		throw error;
	}
}
async function createInitialOrders() {
	console.log("Starting to create initial orders");
	const orders = [
		{
			user_id: 1,
			is_purchase: true,
		},
		{
			user_id: 2,
			is_purchase: false,
		},
		{
			user_id: 3,
			is_purchase: true,
		},
		{
			user_id: 4,
			is_purchase: false,
		},
	];
	try {
		for (let order of orders) {
			await createOrder(order);
		}
	} catch (error) {
		console.log("Error creating orders!");
		throw error;
	}
}

async function createInitialProductsInOrders() {
	const productsInOrders = [
		{
			product_id: 1,
			price: 100.0,
			order_id: 1,
			quantity: 40,
		},
		{
			product_id: 2,
			price: 125.0,
			order_id: 2,
			quantity: 50,
		},
		{
			product_id: 3,
			price: 150.0,
			order_id: 3,
			quantity: 60,
		},
		{
			product_id: 4,
			price: 175.0,
			order_id: 4,
			quantity: 65,
		},
		{
			product_id: 5,
			price: 200.0,
			order_id: 1,
			quantity: 70,
		},
	];
	try {
		console.log("starting to create products_in_orders");
		for (let productInOrder of productsInOrders) {
			await addProductsToOrder(productInOrder);
		}
	} catch (error) {
		console.log("failed to create products_in_orders");
		throw error;
	}
}
async function rebuildDB() {
	try {
		await dropTables();
		await createTables();
		await initialGetAllCategories();
		await createInitialCategory();
		await createInitialProducts();
		await createInitialUsers();
		await createInitialOrders();
		await createInitialProductsInOrders();
	} catch (error) {
		console.log("Error during rebuildDB");
		throw error;
	}
}

rebuildDB();
