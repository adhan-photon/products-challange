const Product = require("../models/product");
const connection = require("../config/connection");

describe("Product Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllProduct should return all product", async () => {
    const mockProducts = [
      {
        id: 1,
        productName: "product 1",
        price: 20,
        description: "the best phone",
        availability: true,
        stock: 3,
        subcategory_id: 1,
      },
      {
        id: 2,
        productName: "product 1",
        price: 30,
        description: "High-quality smartphone",
        availability: true,
        stock: 3,
        subcategory_id: 1,
      },
    ];

    const strQuery = "SELECT * FROM products";

    connection.query = jest.fn((strQuery, callback) => {
      callback(null, mockProducts);
    });

    const result = await Product.getAllProduct();

    expect(result).toEqual(mockProducts);

    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      expect.any(Function)
    );
  });

  test("getAllProduct should handle error when fetching products", async () => {
    const mockError = new Error("Failed to fetch products");

    connection.query = jest.fn((strQuery, callback) => {
      callback(mockError, null);
    });

    try {
      await Product.getAllProduct();
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(connection.query).toHaveBeenCalledWith(
      "SELECT * FROM products",
      expect.any(Function)
    );
  });

  test("getDetailProduct should return a products by productId", async () => {
    const mockProduct = [
      {
        id: 1,
        productName: "iPhone",
        price: 999.99,
        description: "The latest iPhone model with advanced features.",
        availability: 1,
        stock: 3,
        categoryName: "Electronics",
        subcategoryName: "Mobile Phones",
      },
    ];

    const strQuery = `SELECT
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
    const productId = 1;

    connection.query = jest.fn((strQuery, [productId], callback) => {
      callback(null, mockProduct);
    });

    const result = await Product.getDetailProduct(productId);

    expect(result).toEqual(mockProduct);

    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      [productId],
      expect.any(Function)
    );
  });

  test("getCategoryByCategoryId should handle error when fetching category by categoryId", async () => {
    const mockError = new Error("Failed to fetch categories");

    const strQuery = `SELECT
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
    const productId = 1;

    connection.query = jest.fn((strQuery, [productId], callback) => {
      callback(mockError, null);
    });

    try {
      await Product.getDetailProduct(productId);
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      [productId],
      expect.any(Function)
    );
  });
});
