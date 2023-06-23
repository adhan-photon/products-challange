const express = require("express");
const router = express.Router();
const SubcategoryController = require("../controllers/subcategoryController");

router.get("/list", SubcategoryController.getAllSubcategory);
router.get(
  "/subcategory/:subcategoriesId",
  SubcategoryController.getSubcategoryBySubcategoryId
);
router.get(
  "/subcategory/:subcategoriesId/details",
  SubcategoryController.getListSubcategoryAndDetailProduct
);
module.exports = router;
