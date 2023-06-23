const Subcategories = require("../models/subcategory");

class SubcategoriesController {
  static getAllSubcategory(req, res) {
    Subcategories.getAllSubcategory()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getSubcategoryBySubcategoryId(req, res) {
    Subcategories.getSubcategoryBySubcategoryId(+req.params.subcategoriesId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getListSubcategoryAndDetailProduct(req, res) {
    Subcategories.getAllSubcategory()
      .then((subcategories) => {
        const subcategoryId = +req.params.subcategoriesId;
        const subcategory = subcategories.find(
          (sub) => sub.id === subcategoryId
        );
        if (subcategory) {
          return Subcategories.getSubcategoryBySubcategoryId(
            subcategoryId
          ).then((products) => {
            const result = [
              {
                subcategories,
                products,
              },
            ];
            return result;
          });
        } else {
          throw new Error("Subcategory not found");
        }
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = SubcategoriesController;
