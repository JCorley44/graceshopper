const client = require("../db/client");
const { addProductsToOrder, deleteCart } = require("../db/productsInOrders");

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

productsInOrdersRouter.delete("/delete/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  console.log(order_id);
  const deleteOrder = await deleteCart(order_id);
  res.send(deleteOrder);
});
module.exports = productsInOrdersRouter;
