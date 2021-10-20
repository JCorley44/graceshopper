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
//USERS///////////
//////////////////

/*
 id SERIAL PRIMARY KEY
 email VARCHAR(255) UNIQUE NOT NULL
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
  quantity_of_products
*/
