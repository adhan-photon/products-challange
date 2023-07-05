const express = require("express");
const router = express.Router();
const SubcategoryController = require("../controllers/subcategoryController");

router.get("/list", SubcategoryController.getAllSubcategory);
router.get(
  "/subcategory/:subcategoryId",
  SubcategoryController.getSubcategoryBySubcategoryId
);
router.get(
  "/subcategory/:subcategoryId/details",
  SubcategoryController.getListSubcategoryAndDetailProduct
);
module.exports = router;
