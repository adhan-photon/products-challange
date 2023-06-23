const connection = require("../config/connection");

class Product {
  static getAllProduct() {
    return new Promise((resolve, reject) => {
      const strQuery = `SELECT * FROM products`;
      connection.query(strQuery, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getDetailProduct(productId) {
    return new Promise((resolve, reject) => {
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
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Product;
