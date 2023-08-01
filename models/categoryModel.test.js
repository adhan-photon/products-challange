const Category = require("../models/category");
const connection = require("../config/connection");

describe("Category Model", () => {
  beforeEach(() => {
    // Clear all mock implementations before each test
    jest.clearAllMocks();
  });

  test("getAllCategory should return all categories", async () => {
    // Mock the data that will be returned from the database
    const mockCategories = [
      {
        id: 1,
        categoryName: "Category1",
      },
      {
        id: 2,
        categoryName: "Category2",
      },
    ];
    const strQuery = "SELECT * FROM categories";

    // Mock the implementation of connection.query to return the mockCategories
    connection.query = jest.fn((strQuery, callback) => {
      callback(null, mockCategories);
    });

    // Call the getAllCategory method from the model
    const result = await Category.getAllCategory();

    // Assert that the result matches the mockCategories
    expect(result).toEqual(mockCategories);

    // Assert that the connection.query method was called with the correct query
    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      expect.any(Function)
    );
  });

  test("getAllCategory should handle error when fetching categories", async () => {
    // Mock the error that will be returned from the database
    const mockError = new Error("Failed to fetch categories");
    const strQuery = "SELECT * FROM categories";

    // Mock the implementation of connection.query to return the error
    connection.query = jest.fn((strQuery, callback) => {
      callback(mockError, null);
    });

    // Call the getAllCategory method from the model
    try {
      await Category.getAllCategory();
    } catch (error) {
      // Assert that an error is thrown with the correct message
      expect(error).toBe(mockError);
    }

    // // Assert that the connection.query method was called with the correct query
    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      expect.any(Function)
    );
  });

  test("getCategoryByCategoryId should return a category by categoryId", async () => {
    // Mock the data that will be returned from the database
    const mockCategories = [
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

    // Mock the implementation of connection.query to return the mockCategories
    const strQuery = `SELECT * FROM subcategories WHERE category_id = ?`;
    const categoryId = 1;

    connection.query = jest.fn((strQuery, [categoryId], callback) => {
      callback(null, mockCategories);
    });

    // Call the getAllCategory method from the model
    const result = await Category.getCategoryByCategoryId(categoryId);

    // Assert that the result matches the mockCategories
    expect(result).toEqual(mockCategories);

    // Assert that the connection.query method was called with the correct query
    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      [categoryId],
      expect.any(Function)
    );
  });

  test("getCategoryByCategoryId should handle error when fetching category by categoryId", async () => {
    // Mock the error that will be returned from the database
    const mockError = new Error("Failed to fetch categories");

    // Mock the implementation of connection.query to return the error
    const strQuery = `SELECT * FROM subcategories WHERE category_id = ?`;
    const categoryId = 1;

    connection.query = jest.fn((strQuery, [categoryId], callback) => {
      callback(mockError, null);
    });

    // Call the getAllCategory method from the model
    try {
      await Category.getCategoryByCategoryId(categoryId);
    } catch (error) {
      // Assert that an error is thrown with the correct message
      expect(error).toBe(mockError);
    }

    // // Assert that the connection.query method was called with the correct query
    expect(connection.query).toHaveBeenCalledWith(
      strQuery,
      [categoryId],
      expect.any(Function)
    );
  });
});
