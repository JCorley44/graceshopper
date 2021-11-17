const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const {

 

	createUser,
	getUserByEmail,
	verifyUser,
	getAllUsers,
	getOrdersByUserId,
	getSingleOrderByUserId,
	getUserById,

} = require("../db/users");

const usersRouter = require("express").Router();

// User Register
usersRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (password.length < 8) {
      return res.status(401).send("Password is too short!");
    }
    const user = await createUser({ username, email, password });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );
    //console.log(token);
    // Instead of dividing the package being sent into "user" and "token" I am adding token to user and sending it as one thing. This will not interfere with the createUser function populating the database because that was already run on line 21 above. And it solves the problem with the error we were getting Monday night. -WM.
    user.token = token;
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(409).send("User name already exist!");
  }
});

// Log In Function.
// Calls the verifyUser function. The first if statement handles the problem of an email address not being in the DB
// The second if statement handles the problem of a password not being valid.
// If both the email and the password are valid, user is defined and the token is created.
usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const isMatch = await verifyUser(email, password);
    //console.log(isMatch);
    if (isMatch === undefined) {
      res.status(402).send({ message: "The email entered is not valid." });
    }

    if (isMatch === true) {
      const user = await getUserByEmail(email);
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      console.log("user at line 30 /login", user);
      user.token = token;
      user.message = "User is successfully logged in";
      return res.send(user);
    } else {
      return res
        .status(401)
        .send({ message: "Password entered is not valid." });
    }
  } catch (error) {
    console.log("error in logging in");
    throw error;
  }
});

usersRouter.get("/:userId", async (req, res) => {
	const userId = req.params.userId;
	// console.log("Hi from router,", userId);
	try {
		const user = await getUserById(userId);
		return res.send(user);
	} catch (error) {
		return res.status(404).send({ message: "Cannot get that user." });
	}
});

// GET /users/me
// This is intended to use with the fetch user function in app.js on the front end.
// It might look a little circular but this worked in previous projects.
usersRouter.get("/me", (req, res) => {
  if (req.user) {
    // console.log("me", req.user);
    return res.send(req.user);
  } else {
    return res.status(401).send("You are not logged in.");
  }
});

// Get all Users
usersRouter.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    return res.send(allUsers);
  } catch (error) {
    console.log("Error in get all users router.");
    throw error;
  }
});

// User Profile Page
usersRouter.get("/profile", async (req, res) => {
  if (req.user) {
    return res.send(req.user);
  } else {
    return res.status(401).send({ message: "You are not logged in." });
  }
});

// Get All the Orders for One User.
usersRouter.get("/:userId/orders", async (req, res) => {
  const id = req.params.userId;
  try {
    const orders = await getOrdersByUserId(id);
    return res.send(orders);
  } catch (error) {
    console.log("Error in /:userId/orders");
    throw error;
  }
});

// Get One Order for One User
usersRouter.get("/:userId/:orderId", async (req, res) => {
  const { userId, orderId } = req.params;
  try {
    const order = getSingleOrderByUserId(userId, orderId);
    return res.send(order);
  } catch (error) {
    console.log("Error in /:usersId/:orderId");
    throw error;
  }
});

module.exports = usersRouter;
