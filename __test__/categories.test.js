const Category = require("../models/category");
const request = require("supertest");
const express = require("express");
const router = require("../routes");

jest.mock("../models/category", () => ({
  getAllCategory: jest.fn(),
  getCategoryByCategoryId: jest.fn(),
}));

describe("Category Controller test", () => {
  const app = express();
  app.use("/", router);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return all categories", async () => {
    const mockCategory = [
      {
        id: 1,
        categoryName: "Category1",
      },
      {
        id: 2,
        categoryName: "Category2",
      },
    ];

    jest.spyOn(Category, "getAllCategory").mockResolvedValue(mockCategory);

    const response = await request(app).get("/categories/list");

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

    for (const category of response.body) {
      expect(category).toHaveProperty("id", expect.any(Number));
      expect(category).toHaveProperty("categoryName", expect.any(String));
    }
  });

  test("should return a category by categoryId", async () => {
    const mockCategory = [
      {
        id: 1,
        subCategoryName: "sub cat 1",
        category_id: 1,
      },
      {
        id: 2,
        subCategoryName: "sub cat 2",
        category_id: 1,
      },
    ];

    jest
      .spyOn(Category, "getCategoryByCategoryId")
      .mockResolvedValue(mockCategory);

    const categoryId = 1;
    const response = await request(app).get(
      `/categories/category/${categoryId}`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);

    for (const category of response.body) {
      expect(category).toHaveProperty("id", expect.any(Number));
      expect(category).toHaveProperty("subCategoryName", expect.any(String));
      expect(category).toHaveProperty("category_id", expect.any(Number));
    }
  });

  test("should return 404 for invalid categoryId", async () => {
    const mockCategory = [];
    jest
      .spyOn(Category, "getCategoryByCategoryId")
      .mockResolvedValue(mockCategory);

    const invalidCategoryId = 999;
    const response = await request(app).get(
      `/categories/category/${invalidCategoryId}`
    );

    expect(response.status).toBe(404);
  });
});
