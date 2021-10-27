const express = require("express");

require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./api/index");
const client = require("./db/client");
const jwt = require("jsonwebtoken");
const { rebuildDB } = require("./db/seedData");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api", apiRouter);


server.listen(process.env.SERVER_PORT || process.env.PORT, () => {
  //rebuildDB();
  client.connect();
  console.log("Server is up!");
});
