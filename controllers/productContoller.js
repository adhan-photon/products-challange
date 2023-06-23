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
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = ProductController;
