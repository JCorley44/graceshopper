const { updateOrder } = require("../db/Orders");

const ordersRouter = require("express").Router();

ordersRouter.patch("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { quantity, user_id } = req.body;
  const updatedOrder = await updateOrder({
    id: userId,
    quantity,
    user_id,
  });
  console.log(updatedOrder);
  res.send(updatedOrder);
});
module.exports = ordersRouter;
