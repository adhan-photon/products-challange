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
    Subcategories.getSubcategoryBySubcategoryId(+req.params.subcategoryId)
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
        console.log(subcategories, "subcategories");
        const subcategoryId = +req.params.subcategoryId;
        const subcategory = subcategories.find(
          (sub) => sub.id === subcategoryId
        );
        if (subcategory) {
          return Subcategories.getSubcategoryBySubcategoryId(
            subcategoryId
          ).then((products) => {
            const result = [
              {
                id: subcategory.id,
                subCategoryName: subcategory.subCategoryName,
                subcategoryId: subcategory.subcategoryId,
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
