const connection = require("../config/connection");

class Category {
  static getAllCategory() {
    return new Promise((resolve, reject) => {
      const strQuery = `SELECT * FROM categories`;
      connection.query(strQuery, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getCategoryByCategoryId(categoryId) {
    return new Promise((resolve, reject) => {
      const strQuery = `SELECT * FROM subcategories WHERE category_id = ?`;
      connection.query(strQuery, [categoryId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Category;
