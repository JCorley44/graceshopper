const { updateOrder, getAllOrders, completeOrder } = require("../db/orders");
const { deleteProdctInOrders } = require("../db/productsInOrders");

const ordersRouter = require("express").Router();

ordersRouter.get("/", async (req, res) => {
  try {
    const orders = await getAllOrders();
    console.log(orders);
    return res.send(orders);
  } catch (error) {
    res.status(404).send({ message: "Error retrieving this order" });
    throw error;
  }
});

ordersRouter.patch("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  const updatedOrder = await completeOrder(orderId);
  console.log(updatedOrder);
  return res.send(updatedOrder);
});

ordersRouter.patch("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const quantity = req.body;
  try {
    const update = await updateOrder(orderId, quantity);
    return res.send(update);
  } catch (error) {
    res.status(404).send({ message: "Error with update" });
    throw error;
  }
});

ordersRouter.delete("/delete/:product_id", async (req, res) => {
  const { product_id } = req.params;
  const deleteProduct = await deleteProdctInOrders(product_id);
  console.log(deleteProduct);
  return res.send(deleteProduct);
});
module.exports = ordersRouter;
