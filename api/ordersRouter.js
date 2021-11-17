const {
  getAllOrders,
  completeOrder,
  getPurchaseOrders,
  getUserCart,
} = require("../db/orders");
const { deleteProdctInOrders } = require("../db/productsInOrders");

const ordersRouter = require("express").Router();

ordersRouter.get("/", async (req, res) => {
  try {
    const orders = await getAllOrders();
    // console.log(orders);
    return res.send(orders);
  } catch (error) {
    res.status(404).send({ message: "Error retrieving this order" });
    throw error;
  }
});

ordersRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const purchaseOrder = await getPurchaseOrders(userId);
    // console.log(purchaseOrder);
    return res.send(purchaseOrder);
  } catch (error) {
    res.status(404).send({ message: "Error getting purchase orders" });
    throw error;
  }
});

ordersRouter.get("/cart", async (req, res, next) => {
  console.log("api route");
  if (!req.user) next();
  try {
    const userId = req.user.id;
    const resp = await getUserCart(userId);
    res.send(resp);
  } catch (error) {
    throw error;
  }
});

ordersRouter.patch("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  const updatedOrder = await completeOrder(orderId);
  // console.log(updatedOrder);
  return res.send(updatedOrder);
});

ordersRouter.delete("/delete/:product_id", async (req, res) => {
  const { product_id } = req.params;
  const deleteProduct = await deleteProdctInOrders(product_id);
  // console.log(deleteProduct);
  return res.send(deleteProduct);
});
module.exports = ordersRouter;
