const Product = require("../models/product");
const request = require("supertest");
const express = require("express");
const router = require("../routes");

jest.mock("../models/product", () => ({
  getAllProduct: jest.fn(),
  getDetailProduct: jest.fn(),
}));

describe("Product controller test", () => {
  const app = express();
  app.use("/", router);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return all products", async () => {
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

    // Mock the `getAllProduct` method of the Product model to return the mockProducts
    jest.spyOn(Product, "getAllProduct").mockResolvedValue(mockProducts);

    // Call the getAllProduct method from the controller using supertest
    const response = await request(app).get("/products/list");

    // Assert that the response has a status of 200
    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

    for (const product of response.body) {
      expect(product).toHaveProperty("id", expect.any(Number));
      expect(product).toHaveProperty("productName", expect.any(String));
      expect(product).toHaveProperty("price", expect.any(Number));
      expect(product).toHaveProperty("description", expect.any(String));
      expect(product).toHaveProperty("stock", expect.any(Number));
      expect(product).toHaveProperty("availability", expect.any(Boolean));
      expect(product).toHaveProperty("subcategory_id", expect.any(Number));
    }
  });

  test("should return a product by productId", async () => {
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

    // Mock the `getAllProduct` method of the Product model to return the mockProducts
    jest.spyOn(Product, "getDetailProduct").mockResolvedValue(mockProduct);

    // Call the getAllProduct method from the controller using supertest
    const productId = 1;
    const response = await request(app).get(`/products/product/${productId}`);
    // Assert that the response has a status of 200
    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toEqual(true);

    for (const product of response.body) {
      expect(product).toHaveProperty("id", expect.any(Number));
      expect(product).toHaveProperty("productName", expect.any(String));
      expect(product).toHaveProperty("price", expect.any(Number));
      expect(product).toHaveProperty("description", expect.any(String));
      expect(product).toHaveProperty("stock", expect.any(Number));
      expect(product).toHaveProperty("categoryName", expect.any(String));
      expect(product).toHaveProperty("subcategoryName", expect.any(String));
    }
  });

  test("should return 404 for invalid productId", async () => {
    const mockProducts = [];
    jest.spyOn(Product, "getDetailProduct").mockResolvedValue(mockProducts);

    const invalidProductId = 999;
    const response = await request(app).get(
      `/products/product/${invalidProductId}`
    );

    expect(response.status).toBe(404);
  });
});
