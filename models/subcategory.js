const connection = require("../config/connection");

class Subcategory {
  static getAllSubcategory() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM subcategories`;
      connection.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getSubcategoryBySubcategoryId(subcategoriesId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM products WHERE subcategory_id = ?`;
      connection.query(query, [subcategoriesId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Subcategory;
