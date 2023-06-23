const express = require("express");
const router = express.Router();
const routeCategories = require("./routeCategories");
const routeSubcategories = require("./routeSubcategories");
const routeProducts = require("./routeProducts");

router.use("/categories", routeCategories);
router.use("/subcategories", routeSubcategories);
router.use("/products", routeProducts);

module.exports = router;
