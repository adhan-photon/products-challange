const connection = require("../config/connection.js");
const fs = require("fs");

const dataCategories = JSON.parse(
  fs.readFileSync("./seeds/categories.json", "utf-8")
);
const dataSubCategories = JSON.parse(
  fs.readFileSync("./seeds/subCategories.json", "utf-8")
);
const dataProducts = JSON.parse(
  fs.readFileSync("./seeds/products.json", "utf-8")
);

const queryInsertCategories = "INSERT INTO categories (categoryName) VALUES ?";
const queryInsertSubCategories =
  "INSERT INTO subcategories (subCategoryName, category_id) VALUES ?";
const queryInsertProducts =
  "INSERT INTO products (productName, price, description, availability, stock, subcategory_id) VALUES ?";

connection.query(
  queryInsertCategories,
  [dataCategories.map((category) => [category.categoryName])],
  (error, res) => {
    if (error) {
      console.error("Error seeding categories:", error);
    } else {
      console.log(res, "Categories seeded successfully");
    }
  }
);

connection.query(
  queryInsertSubCategories,
  [
    dataSubCategories.map((subCategory) => [
      subCategory.subCategoryName,
      subCategory.categories_id,
    ]),
  ],
  (error, res) => {
    if (error) {
      console.error("Error seeding subcategory:", error);
    } else {
      console.log(res, "SubCategories seeded successfully");
    }
  }
);

connection.query(
  queryInsertProducts,
  [
    dataProducts.map((product) => [
      product.productName,
      product.price,
      product.description,
      product.availability,
      product.stock,
      product.subcategory_id,
    ]),
  ],
  (error, res) => {
    if (error) {
      console.error("Error seeding products:", error);
    } else {
      console.log(res, "Products seeded successfully");
    }
  }
);
