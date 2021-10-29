const { addProductsToOrder } = require("../db/productsInOrders");

const productsInOrdersRouter = require("express").Router();

productsInOrdersRouter.post("/", async (req, res, next) => {
  const { product_id, price, order_id, quantity } = req.body;
  if (!product_id || !price || !order_id || !quantity) {
    return next({ error: "Missing input field" });
  }
  const addProduct = await addProductsToOrder({
    product_id,
    price,
    order_id,
    quantity,
  });
  res.send(addProduct);
});
module.exports = productsInOrdersRouter;
