const express = require("express");
const path = require("path");
const data = require("./mock-data.json");
const app = express();
const port = 8080;
const connection = require("./config/connection.js");
const router = require("./routes");
// app.use("/", express.static(path.join(__dirname, "static")));
app.set("json spaces", 2);
// app.use("/", router);
// Define an endpoint to get the list categories
app.get("/categories/list", (req, res) => {
  const strQuery = `SELECT * FROM categories`;
  connection.query(strQuery, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    res.json(result);
  });
});

app.get("/categories/category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const strQuery = `SELECT * FROM subcategories WHERE category_id = ?`;
  connection.query(strQuery, [categoryId], (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    res.json(result);
  });
});

// Define an endpoint to get the list subcategories
app.get("/subcategories/list", (req, res) => {
  const query = `SELECT * FROM subcategories`;
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    res.json(result);
  });
});

app.get("/subcategories/subcategory/:subcategoryId", (req, res) => {
  const subcategoriesId = req.params.subcategoryId;

  const query = `SELECT * FROM products WHERE subcategory_id = ?`;
  connection.query(query, [subcategoriesId], (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    res.json(result);
  });
});

// Define an endpoint to get the list product
app.get("/products/list", (req, res) => {
  const query = `SELECT * FROM products`;
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    res.json(result);
  });
});

// Define an endpoint to get the subcategories of a specific category
app.get("/subcategories/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  const query = "SELECT * FROM subcategories WHERE category_id = ?";
  connection.query(query, [categoryId], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(res, "res");
    res.json(result);
  });
});

// Define an Endpoint to get the details of a specific product
app.get("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const query = `SELECT
    products.id,
    products.productName,
    products.price,
    products.description,
    products.availability ,
    products.stock,
    categories.categoryName,
    subcategories.subcategoryName
  FROM
    products
  LEFT JOIN subcategories on products.subcategory_id = subcategories.id
  LEFT JOIN categories on subcategories.category_id = categories.id
  WHERE
    products.id = ?
`;
  connection.query(query, [productId], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
