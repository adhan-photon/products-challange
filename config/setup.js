const connection = require("./connection.js");

const queryCategoriesTable = `
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(255) NOT NULL
)
`;

const querySubcategoriesTable = `
CREATE TABLE IF NOT EXISTS subcategories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subCategoryName VARCHAR(255) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
)
`;

const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    availability BOOLEAN NOT NULL,
    subcategory_id INT,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
)
`;

const createTable = async () => {
  try {
    // Create table Categories
    await new Promise((resolve, reject) => {
      connection.query(queryCategoriesTable, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log(res, "Success creating table Categories");
          resolve();
        }
      });
    });

    // Create table Subcategories
    await new Promise((resolve, reject) => {
      connection.query(querySubcategoriesTable, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log(res, "Success creating table Subcategories");
          resolve();
        }
      });
    });

    // Create table Products
    await new Promise((resolve, reject) => {
      connection.query(createProductsTable, (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log(res, "Success creating table Products");
          resolve();
        }
      });
    });

    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
createTable();
