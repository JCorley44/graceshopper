const client = require("./client");
const bcrypt = require("bcrypt");

// Create Admin
async function makeUserAdmin(id) {
  try {
    const admin = client.query(
      `
		UPDATE users
		SET is_admin = true
		WHERE id = $1
		RETURNING *;
		`,
      [id]
    );

    return admin;
  } catch (error) {
    console.log("Error in setting user to admin");
    throw error;
  }
}

// Create User Function

async function createUser({ email, username, password }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(email, username, password)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [email, username, hashedPassword]
    );
    //console.log(user);
    //console.log(hashedPassword);
    delete user.password;
    // console.log(user);
    return user;
  } catch (error) {
    console.log("error creating user");
    throw error;
  }
}

// Get user by username

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
		SELECT * FROM users
		WHERE username=$1
		`,
      [username]
    );
  } catch (error) {
    console.log("Error getting user by username");
    throw error;
  }
}

// Get user by email

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE email=$1
        `,
      [email]
    );
    // console.log(user);

    return user;
  } catch (error) {
    console.log("error getting user by email");
    throw error;
  }
}

// Get user by id.

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE id=$1
        `,
      [id]
    );

    return user;
  } catch (error) {
    console.log("error getting user by id");
    throw error;
  }
}

// This is a function to get all the users.
async function getAllUsers() {
  try {
    const users = await client.query(`
        SELECT * FROM users;
        `);
    return users.rows;
  } catch (error) {
    console.log("error in getting all users");
    throw error;
  }
}

// Verify User.
// This function is called by the usersRouter.post login function.
// Email and password are passed in. getUserByEmail is called to get the hashed password from the DB.
// Password is compared to hashedpassword and returns true or false.
// This value is passed back to the login function.
async function verifyUser(email, password) {
  console.log("Start of verifyUser");
  const user = await getUserByEmail(email);
  if (user === undefined) {
    return undefined;
  }
  if (user === false) {
    return false;
  } else {
    const hashedPassword = user.password;
    // console.log(user);
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      //console.log(isMatch);
      return isMatch;
    } catch (error) {
      console.log("Error in verifyUser");
      throw error;
    }
  }
}

async function getOrdersByUserId(id) {
  // console.log("Hi from db/users. The passed in id is:", id);
  try {
    const { rows: orders } = await client.query(
      `
		SELECT * FROM orders
		WHERE user_id =($1);
		`,
      [id]
    );
    // console.log(orders);
    return orders;
  } catch (error) {
    console.log("Error in get Orders By User Id");
    throw error;
  }
}

async function getSingleOrderByUserId(userId, orderId) {
  try {
    const order = await client.query(
      `
    SELECT * FROM orders
    WHERE user_id = $1 AND id = $2;
    `,
      [userId, orderId]
    );

    return order.rows;
  } catch (error) {
    console.log("Error getting an order for a user.");
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getOrdersByUserId,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getSingleOrderByUserId,
  makeUserAdmin,
  verifyUser,
};
