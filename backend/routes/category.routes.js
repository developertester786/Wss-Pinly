const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const categoryController = require("../controllers/category.controller");

router.get(
  "/",
  authenticate,
  categoryController.getCategories
);

router.get(
  "/:id",
  authenticate,
  categoryController.getCategory
);

router.post(
  "/",
  authenticate,
  categoryController.createCategory
);

router.put(
  "/:id",
  authenticate,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authenticate,
  categoryController.deleteCategory
);

module.exports = router;