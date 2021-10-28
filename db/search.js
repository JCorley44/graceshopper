const client = require("./client");

async function serverSearch() {
  const resp = await client.query(
    `
    SELECT * FROM products
    WHERE title LIKE $1;
    `
  );
  console.log(resp.rows[0]);
}
console.time("serverSearch");
serverSearch();
console.timeEnd("serverSearch");
