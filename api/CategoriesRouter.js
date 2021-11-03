const categoriesRouter = require("express").Router();
const {
  getAllCategories,
  getCategoryByName,
  getCategoryById,
  addCategory,
} = require("../db/category");

//getting all categories
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.send(categories);
  } catch (error) {
    res
      .status(404)
      .send({ message: "Error retrieving all categories", error: error });
  }
});

//get single category
categoriesRouter.get("/:categoryId", async (req, res, next) => {
  try {
    const categoryId = req.params;
    const category = await getCategoryById(categoryId);
    res.send(category);
  } catch (error) {
    res
      .status(404)
      .send({ message: "Error retrieving the category", error: error });
  }
});

categoriesRouter.get("/:categoryName", async (req, res, next) => {
  try {
    const categoryName = req.params;
    const category = await getCategoryByName(categoryName);
    res.send(category);
  } catch (error) {
    throw error;
  }
});

categoriesRouter.post("/new-category", async (req, res, next) => {
  const categoryName = req.body.categoryName;
  try {
    const newCategory = await addCategory(categoryName);
    res.send(newCategory);
  } catch (error) {
    res
      .status(404)
      .send({ message: "could not create category", error: error });
  }
});

module.exports = categoriesRouter;
