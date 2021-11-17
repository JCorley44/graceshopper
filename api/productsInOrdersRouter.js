const client = require("../db/client");
const {
  addProductsToOrder,
  deleteCart,
  getAllProductsInAnOrderByOrderId,
} = require("../db/productsInOrders");
const { updateOrder } = require("../db/orders");
const productsInOrdersRouter = require("express").Router();

productsInOrdersRouter.post("/", async (req, res, next) => {
  const { product_id, order_id, quantity } = req.body;
  if (!product_id || !order_id || !quantity) {
    return next({ error: "Missing input field" });
  }
  const addProduct = await addProductsToOrder({
    product_id,

    order_id,
    quantity,
  });
  res.send(addProduct);
});

productsInOrdersRouter.patch("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const quantity = req.body;
  // console.log(quantity);
  try {
    const update = await updateOrder(orderId, quantity);
    return res.send(update);
  } catch (error) {
    res.status(404).send({ message: "Error with update" });
    throw error;
  }
});

productsInOrdersRouter.delete("/delete/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  // console.log(order_id);
  const deleteOrder = await deleteCart(orderId);
  res.send(deleteOrder);
});

productsInOrdersRouter.get("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  console.log("Hi from API/pro in ord. Your order id is:", orderId);
  try {
    const getProducts = await getAllProductsInAnOrderByOrderId(orderId);
    res.send(getProducts);
  } catch (error) {
    res
      .status(404)
      .send({ message: "Could not retrieve products", error: error });
  }
});

module.exports = productsInOrdersRouter;
