const Category = require("../models/category");

class CategoryController {
  static getAllCategory(req, res) {
    Category.getAllCategory()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getCategoryByCategoryId(req, res) {
    Category.getCategoryByCategoryId(+req.params.categoryId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = CategoryController;
