const express = require("express");

require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./api/index");
const client = require("./db/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("./db/users");
// const { rebuildDB } = require("./db/seedData");

const server = express();

server.use(cors());
server.use(express.json());

server.use(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.substring(7)
    : null;

  if (!token) return next();

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("index.js line 25", decodedToken);
  const user = await getUserByEmail(decodedToken.id);
  if (user != undefined) {
    // console.log("index.js line 28", user);
    delete user.password;
    req.user = user;
    // console.log("index.js line 31", user);
    // console.log(req.user);
    next();
  }
});

server.use("/api", apiRouter);

server.listen(process.env.REACT_APP_SERVER_PORT || process.env.PORT, () => {
  client.connect();
  // rebuildDB();
  console.log("Server is up!");
});
