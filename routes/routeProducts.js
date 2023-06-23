const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productContoller");

router.get("/list", ProductController.getAllProduct);
router.get("/product/:productId", ProductController.getDetailProduct);

module.exports = router;
