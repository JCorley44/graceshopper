const express = require("express");
const client = require("./db/client");

const server = express();

server.listen(process.env.SERVER_PORT || process.env.PORT, () => {
  client.connect();
  console.log("Server is up!");
});
