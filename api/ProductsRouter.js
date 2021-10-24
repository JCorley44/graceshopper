const {
  getAllProducts,
  updateProducts,
  getProductById,
} = require("../db/products");

const productsRouter = require("express").Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(404).send({ message: "Error retrieving all products" });
  }
});

productsRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(404).send({ message: "Error retrieving this product" });
  }
});

productsRouter.patch("/:productId", async (req, res) => {
  const { productId } = req.params;
  const { title, description, price, quantity, category_id } = req.body;
  const updatedProduct = await updateProducts({
    id: productId,
    title,
    description,
    price,
    quantity,
    category_id,
  });
  console.log(updatedProduct);
  res.send(updatedProduct);
});

module.exports = productsRouter;
