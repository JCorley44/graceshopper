const { addCategory, getAllCategories } = require("./Category");
const client = require("./client");

async function dropTables() {
  try {
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
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id)
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
async function initialGetAllCategories() {
  try {
    await getAllCategories();
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialCategory();
    await initialGetAllCategories();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

// rebuildDB();

module.exports = {
  rebuildDB,
};
