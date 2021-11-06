const express = require("express");

require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./api/index");
const client = require("./db/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("./db/users");

const server = express();

server.use(cors());
server.use(express.json());

server.use(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.substring(7)
    : null;

  if (!token) return next();

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);
  const user = await getUserByEmail(decodedToken.id);
  console.log(user);
  delete user.password;
  req.user = user;
  console.log(req.user);
  next();
});

server.use("/api", apiRouter);

server.listen(process.env.SERVER_PORT || process.env.PORT, () => {
  // rebuildDB();
  client.connect();
  console.log("Server is up!");
});
