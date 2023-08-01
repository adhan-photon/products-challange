const Subcategory = require("../models/subcategory");
const connection = require("../config/connection");

describe("Subcategory Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllSubcategory should return all subcategory", async () => {
    const mockSubcategory = [
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

    const strQuery = "SELECT * FROM subcategories";

    connection.query = jest.fn((strQuery, callback) => {
      callback(null, mockSubcategory);
    });

    const result = await Subcategory.getAllSubcategory();

    expect(result).toEqual(mockSubcategory);

    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      expect.any(Function)
    );
  });

  test("getAllSubcategory should handle error when fetching subcategory", async () => {
    const mockError = new Error("Failed to fetch categories");
    const strQuery = "SELECT * FROM subcategories";

    connection.query = jest.fn((strQuery, callback) => {
      callback(mockError, null);
    });

    try {
      await Subcategory.getAllSubcategory();
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      expect.any(Function)
    );
  });

  test("getCategoryByCategoryId should return a category by categoryId", async () => {
    const mockSubcategory = [
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

    const strQuery = `SELECT * FROM products WHERE subcategory_id = ?`;
    const subcategoriesId = 1;

    connection.query = jest.fn((strQuery, [subcategoriesId], callback) => {
      callback(null, mockSubcategory);
    });

    const result = await Subcategory.getSubcategoryBySubcategoryId(
      subcategoriesId
    );

    expect(result).toEqual(mockSubcategory);

    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      [subcategoriesId],
      expect.any(Function)
    );
  });

  test("getCategoryByCategoryId should handle error when fetching category by categoryId", async () => {
    const mockError = new Error("Failed to fetch categories");

    const strQuery = `SELECT * FROM products WHERE subcategory_id = ?`;
    const subcategoriesId = 1;

    connection.query = jest.fn((strQuery, [subcategoriesId], callback) => {
      callback(mockError, null);
    });

    try {
      await Subcategory.getSubcategoryBySubcategoryId(subcategoriesId);
    } catch (error) {
      expect(error).toBe(mockError);
    }

    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      [subcategoriesId],
      expect.any(Function)
    );
  });
});
