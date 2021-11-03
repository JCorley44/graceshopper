const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const categoriesRouter = require("./categoriesRouter");
const ordersRouter = require("./ordersRouter");

const productsInOrdersRouter = require("./productsInOrdersRouter");

const reviewsRouter = require("./reviewsRouter");
const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/products_in_orders", productsInOrdersRouter);
apiRouter.get("health", (req, res) => {
  res.send({ message: "Healthy!" });
});

module.exports = apiRouter;
