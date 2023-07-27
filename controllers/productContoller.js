const Product = require("../models/product");

class ProductController {
  static getAllProduct(req, res) {
    Product.getAllProduct()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getDetailProduct(req, res) {
    Product.getDetailProduct(+req.params.productId)
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

module.exports = ProductController;
