const express = require("express");
const { rebuildDB } = require("./db/seedData");

const server = express();

server.listen(process.env.SERVER_PORT || process.env.PORT, () => {
  rebuildDB();
  //client.connect();
  console.log("Server is up!");
});
