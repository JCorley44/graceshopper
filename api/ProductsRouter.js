const {
  getAllProducts,
  updateProducts,
  getProductById,
  createProduct,
} = require("../db/products");

const productsRouter = require("express").Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    console.log(products);
    res.send(products);
  } catch (error) {
    res.status(404).send({ message: "Error retrieving all products" });
  }
});

productsRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await getProductById(productId);
    console.log(product);
    res.send(product);
  } catch (error) {
    res.status(404).send({ message: "Error retrieving this product" });
  }
});

productsRouter.post("/", async (req, res, next) => {
  const { title, description, price, quantity, category_id } = req.body;
  if (!title || !description || !price || !quantity || !category_id) {
    return next({ error: "Missing input field" });
  }
  const newProduct = await createProduct({
    title,
    description,
    price,
    quantity,
    category_id,
  });
  res.send(newProduct);
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
