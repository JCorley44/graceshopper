////////////////////// DATABASE TABLES ////////////////////////

///////////////////
//PRODUCTS/////////
///////////////////

/*
 id SERIAL PRIMARY KEY
 title VARCHAR(255) UNIQUE NOT NULL
 description VARCHAR(255) NOT NULL
 price DECIMAL NOT NULL
 quantity INTEGER NOT NULL
 category_id INTEGER REFERENCES categories(id)
 */

//////////////////
//CATEGORIES//////
//////////////////

/*
id SERIAL PRIMARY KEY
name VARCHAR(255) NOT NULL
*/

//////////////////
//USERS///////////
//////////////////

/*
 id SERIAL PRIMARY KEY
 email VARCHAR(255) UNIQUE NOT NULL
 password VARCHAR(255) NOT NULL
 */

///////////////////
//ORDERS///////////
///////////////////

/*
  id SERIAL PRIMARY KEY
  user_id INTEGER REFERENCES users(id)
 */

/////////////////////
//PRODUCTS_IN_ORDERS/
/////////////////////

/*
  id SERIAL PRIMARY KEY
  product_id INTEGER REFERENCES products(id)
  price DECIMAL REFERENCES products(price)
  order_id INTEGER REFERENCES orders(id)
  quantity INTEGER NOT NULL
*/

///////////////////
//REVIEWS//////////
///////////////////

/*
product_id INT REFERENCES product(id)
user_id INT REFERENCES users(id)
comment TEXT
*/

/////////////////////////////////////////////////////////
