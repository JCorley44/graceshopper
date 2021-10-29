const usersRouter = require("./UsersRouter");
const productsRouter = require("./ProductsRouter");
const categoriesRouter = require("./CategoriesRouter");
const ordersRouter = require("./OrdersRouter");

const productsInOrdersRouter = require("./ProductsInOrdersRouter");

const reviewsRouter = require("./ReviewsRouter");
const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.get("health", (req, res) => {
  res.send({ message: "Healthy!" });
});

module.exports = apiRouter;
