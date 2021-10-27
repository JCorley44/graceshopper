const express = require("express");
const apiRouter = require("./api");
const { rebuildDB } = require("./db/seedData");

const server = express();
server.use("/api", apiRouter);
server.listen(process.env.SERVER_PORT || process.env.PORT, () => {
  rebuildDB();
  //client.connect();
  console.log("Server is up!");
});
