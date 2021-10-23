require("dotenv").config();
const { Client } = require("pg");
const { DB_PASS } = process.env;

const CONNECTION_STRING = {
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: DB_PASS,
  database: "graceshopper",
};

const client = new Client(CONNECTION_STRING);
module.exports = client;
