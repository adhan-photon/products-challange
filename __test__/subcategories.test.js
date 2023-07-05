const request = require("supertest");
const express = require("express");
const router = require("../routes");

describe("Subcategories test", () => {
  const app = express();
  app.use("/", router);

  test("should return all Subcategories", async () => {
    const response = await request(app).get("/subcategories/list");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty(
      "subCategoryName",
      expect.any(String)
    );
    expect(response.body[0]).toHaveProperty("category_id", expect.any(Number));
  });

  test("should return a Subcategory by subcategoryId", async () => {
    const subcategoryId = 1;
    const response = await request(app).get(
      `/subcategories/subcategory/${subcategoryId}`
    );
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

  test("should return a detail Subcategory by subcategoryId", async () => {
    const subcategoryId = 1;
    const response = await request(app).get(
      `/subcategories/subcategory/${subcategoryId}/details`
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty(
      "subCategoryName",
      expect.any(String)
    );
    expect(response.body[0]).toHaveProperty("products", expect.any(Array));
  });

  test("should return 404 for invalid subcategoryId", async () => {
    const invalidSubcategoryId = 999;
    const response = await request(app).get(
      `/category/${invalidSubcategoryId}`
    );
    expect(response.status).toBe(404);
  });
});
