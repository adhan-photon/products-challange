const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

router.get("/list", CategoryController.getAllCategory);
router.get("/category/:categoryId", CategoryController.getCategoryByCategoryId);

module.exports = router;
