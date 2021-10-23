const client = require("./client");

// Create User Function

async function createUser({ email, password }) {
	try {
		const SALT_COUNT = 10;
		const hashedpassword = await bcrypt.hash(password, SALT_COUNT);
		const {
			rows: [user],
		} = await client.query(
			`
        INSERT INTO users(email, password)
        VALUES($1, $2)
        ON CONFLICT (email) DO NOTHING
        RETURNING *;
        `,
			[email, hashedpassword]
		);

		delete user.password;

		return user;
	} catch (error) {
		console.log("error creating user");
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

// This is a function to get all the users. We might not need this one but I gues we have it if we do.
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

// Get user
async function getUser({ email, password }) {
	try {
		const user = await getUserByEmail(email);
		const hashedpassword = user.password;
		const isMatch = await bcrypt.compare(password, hashedpassword);
		if (isMatch) {
			delete user.password;
			return user;
		}
	} catch (error) {
		console.log("error in get user");
		throw error;
	}
}

module.exports = {
	createUser,
	getUser,
	getUserById,
	getUserByEmail,
	getAllUsers,
};
