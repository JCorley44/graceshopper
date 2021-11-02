const { addCategory, getAllCategories } = require("./category");
const client = require("./client");
const bcrypt = require("bcrypt");
const { createProduct } = require("./products");
const { createUser } = require("./users");
const { addProductsToOrder } = require("./productsInOrders");

const { createOrder, getPurchaseOrders } = require("./orders");

const { createReview } = require("./reviews");

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
            order_id INTEGER REFERENCES orders(id),
            quantity INTEGER NOT NULL
        );

        CREATE TABLE reviews(
            id SERIAL PRIMARY KEY,
            product_id INT REFERENCES products(id),
            user_id INT REFERENCES users(id),
            content TEXT NOT NULL
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

async function createInitialReviews() {
  console.log("Starting to create initial reviews.");
  const reviewsToCreate = [
    { user_id: 2, product_id: 3, content: "This thing sucks." },
    {
      user_id: 1,
      product_id: 3,
      content: "Bought this as a Christmas gift for Thanos.",
    },
  ];

  const reviews = await Promise.all(
    reviewsToCreate.map((review) => createReview(review))
  );
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

      order_id: 1,
      quantity: 40,
    },
    {
      product_id: 2,

      order_id: 2,
      quantity: 50,
    },
    {
      product_id: 3,

      order_id: 3,
      quantity: 60,
    },
    {
      product_id: 4,

      order_id: 4,
      quantity: 65,
    },
    {
      product_id: 5,

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

// async function createInitialPurchaseOrders() {
//   const purchasedOrders = [
//     {
//       user_id: 1,
//       order_id: 1,
//     },
//     {
//       user_id: 2,
//       order_id: 4,
//     },
//     {
//       user_id: 3,
//       order_id: 1,
//     },
//     {
//       user_id: 4,
//       order_id: 2,
//     },
//   ];
//   try {
//     console.log("Starting purchased_orders");
//     for (let purchasedOrder of purchasedOrders) {
//       await getPurchaseOrders(purchasedOrder);
//     }
//   } catch (error) {
//     console.log("Failed to get purchase orders");
//     throw error;
//   }
// }
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
    await createInitialReviews();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB();
