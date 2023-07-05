const request = require("supertest");
const express = require("express");
const router = require("../routes");
const productContoller = require("../controllers/productContoller");
describe("Products test", () => {
  const app = express();
  app.use("/", router);

  test("should return all products", async () => {
    const response = await request(app).get("/products/list");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("productName", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("stock", expect.any(Number));
    expect(response.body[0]).toHaveProperty("availability", expect.any(Number));
    expect(response.body[0]).toHaveProperty(
      "subcategory_id",
      expect.any(Number)
    );
  });

  test("should return a product by productId", async () => {
    const productId = 1;
    const response = await request(app).get(`/products/product/${productId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("productName", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("stock", expect.any(Number));
    expect(response.body[0]).toHaveProperty("categoryName", expect.any(String));
    expect(response.body[0]).toHaveProperty(
      "subcategoryName",
      expect.any(String)
    );
  });

  test("should return 404 for invalid categoryId", async () => {
    const invalidCategoryId = 999;
    const response = await request(app).get(`/category/${invalidCategoryId}`);
    expect(response.status).toBe(404);
  });
});
