const request = require("supertest");
const express = require("express");
const router = require("../routes");

describe("Category test", () => {
  const app = express();
  app.use("/", router);

  test("should return all categories", async () => {
    const response = await request(app).get("/categories/list");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("categoryName", expect.any(String));
  });

  test("should return a category by categoryId", async () => {
    const categoryId = 1;
    const response = await request(app).get(
      `/categories/category/${categoryId}`
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty(
      "subCategoryName",
      expect.any(String)
    );
    expect(response.body[0]).toHaveProperty("category_id", expect.any(Number));
  });

  test("should return 404 for invalid categoryId", async () => {
    const invalidCategoryId = 999;
    const response = await request(app).get(`/category/${invalidCategoryId}`);
    expect(response.status).toBe(404);
  });
});
