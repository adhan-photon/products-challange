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
        if (!data.length) {
          res.status(404).json("Whoops!");
        } else {
          res.json(data);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = CategoryController;
