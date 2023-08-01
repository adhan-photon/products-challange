const Subcategory = require("../models/subcategory");
const request = require("supertest");
const express = require("express");
const router = require("../routes");

jest.mock("../models/category", () => ({
  getAllSubcategory: jest.fn(),
  getSubcategoryBySubcategoryId: jest.fn(),
}));

describe("Subcategory controller test", () => {
  const app = express();
  app.use("/", router);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return all Subcategories", async () => {
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
      .spyOn(Subcategory, "getAllSubcategory")
      .mockResolvedValue(mockCategory);

    const response = await request(app).get("/subcategories/list");

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

    for (const subcategory of response.body) {
      expect(subcategory).toHaveProperty("id", expect.any(Number));
      expect(subcategory).toHaveProperty("subCategoryName", expect.any(String));
      expect(subcategory).toHaveProperty("category_id", expect.any(Number));
    }
  });

  test("should return a Subcategory by subcategoryId", async () => {
    const mockSubcategory = [
      {
        id: 1,
        productName: "product 1",
        price: 10.99,
        description: "best prod",
        stock: 3,
        availability: 1,
        subcategory_id: 1,
      },
      {
        id: 2,
        productName: "product 2",
        price: 10.99,
        description: "best prod",
        stock: 1,
        availability: 1,
        subcategory_id: 1,
      },
    ];

    jest
      .spyOn(Subcategory, "getSubcategoryBySubcategoryId")
      .mockResolvedValue(mockSubcategory);

    const subcategoryId = 1;
    const response = await request(app).get(
      `/subcategories/subcategory/${subcategoryId}`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);

    for (const subcategory of response.body) {
      expect(subcategory).toHaveProperty("id", expect.any(Number));
      expect(subcategory).toHaveProperty("productName", expect.any(String));
      expect(subcategory).toHaveProperty("price", expect.any(Number));
      expect(subcategory).toHaveProperty("description", expect.any(String));
      expect(subcategory).toHaveProperty("stock", expect.any(Number));
      expect(subcategory).toHaveProperty("availability", expect.any(Number));
    }
  });

  test("should return a detail Subcategory by subcategoryId", async () => {
    const mockSubcategory = [
      {
        id: 1,
        subCategoryName: "sub cat 1",
        products: [
          {
            id: 1,
            productName: "prod 1",
            price: 10.99,
            description: "The latest iPhone model with advanced features.",
            stock: 3,
            availability: 1,
            subcategory_id: 1,
          },
          {
            id: 2,
            productName: "prod 2",
            price: 10.99,
            description:
              "High-quality Android smartphone with a stunning display.",
            stock: 3,
            availability: 1,
            subcategory_id: 1,
          },
          {
            id: 3,
            productName: "prod 2",
            price: 1.99,
            description: "Powerful smartphone with a pure Android experience.",
            stock: 0,
            availability: 0,
            subcategory_id: 1,
          },
        ],
      },
    ];

    jest
      .spyOn(Subcategory, "getAllSubcategory")
      .mockResolvedValue(mockSubcategory);

    const subcategoryId = 1;
    const response = await request(app).get(
      `/subcategories/subcategory/${subcategoryId}/details`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toEqual(true);

    for (const subcategory of response.body) {
      expect(subcategory).toHaveProperty("id", expect.any(Number));
      expect(subcategory).toHaveProperty("subCategoryName", expect.any(String));
      expect(subcategory).toHaveProperty("products", expect.any(Array));
    }
  });

  test("should return 404 for invalid subcategoryId", async () => {
    const mockSubcategory = [];
    jest
      .spyOn(Subcategory, "getSubcategoryBySubcategoryId")
      .mockResolvedValue(mockSubcategory);

    const invalidSubcategoryId = 999;
    const response = await request(app).get(
      `/subcategories/subcategory/${invalidSubcategoryId}`
    );
    expect(response.status).toBe(404);
  });
});
