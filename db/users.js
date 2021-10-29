const client = require("./client");
const bcrypt = require("bcrypt");

// Create User Function

async function createUser({ email, username, password }) {
	try {
		const SALT_COUNT = 10;
		const hashedpassword = await bcrypt.hash(password, SALT_COUNT);
		const {
			rows: [user],
		} = await client.query(
			`
        INSERT INTO users(email, username, password)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
			[email, username, hashedpassword]
		);
		console.log(user);

		delete user.password;

		return user;
	} catch (error) {
		console.log("error creating user");
		throw error;
	}
}

// Get user by username

async function getUserByUsername(username) {
	console.log("Start get user by username");
	try {
		const user = await client.query(
			`
        SELECT * FROM users
        WHERE username=$1;
        `,
			[username]
		);

		return user.rows[0];
	} catch (error) {
		console.log("Error getting user by username");
		throw error;
	}
}

// Get user by email

async function getUserByEmail(email) {
	try {
		const user = await client.query(
			`
        SELECT *
		FROM users
        WHERE email=$1;
        `,
			[email]
		);
		console.log("Line 63 in getuserbyemail", user.rows[0]);

		return user.rows[0];
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

// This is a function to get all the users. We might not need this one but I guess we have it if we do.
async function getAllUsers() {
	try {
		const {
			rows: [users],
		} = await client.query(`
        SELECT * FROM users;
        `);
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
		const hashedpassword = user.password;
		try {
			const isMatch = await bcrypt.compare(password, hashedpassword);
			console.log(isMatch);
			return isMatch;
		} catch (error) {
			console.log("Error in verifyUser");
			throw error;
		}
	}
}

module.exports = {
	createUser,
	getAllUsers,
	getUserByEmail,
	getUserById,
	getUserByUsername,
	verifyUser,
};
