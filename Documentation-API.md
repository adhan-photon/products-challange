# Dev Test NodeJs Server

## RESTful endpoints

### GET /categories

> Get the list categories

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  {
    "id": "cat1",
    "categoryName": "Electronics"
  },
  {
    "id": "cat2",
    "categoryName": "Clothing"
  }
]
```

---

### GET /subcategories/

> Get the list of product subcategories

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  {
    "id": "cat1",
    "categoryName": "Electronics",
    "subcategories": [
      {
        "id": "subcat1",
        "subCategoryName": "Mobile Phones",
        "products": [
          {
            "id": "prod1",
            "productName": "iPhone",
            "price": 999.99,
            "description": "The latest iPhone model with advanced features.",
            "availability": true,
            "stock": 5
          },
          {
            "id": "prod2",
            "productName": "Samsung Galaxy",
            "price": 899.99,
            "description": "High-quality Android smartphone with a stunning display.",
            "availability": true,
            "stock": 5
          },
          {
            "id": "prod3",
            "productName": "Google Pixel",
            "price": 799.99,
            "description": "Powerful smartphone with a pure Android experience.",
            "availability": false,
            "stock": 0
          }
        ]
      },
      ...
    ]
  },
 ...
]
```

---

### GET /subcategories/:categoryId

> Get the subcategories of a specific product category

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": "subcat1",
    "subCategoryName": "Men's Clothing"
  },
  {
    "id": "subcat2",
    "subCategoryName": "Women's Clothing"
  },
  {
    "id": "subcat3",
    "subCategoryName": "Kids' Clothing"
  },
  {
    "id": "subcat4",
    "subCategoryName": "Sportswear"
  }
]
```

_Response (404 - Category not found)_

```
{
  "error": "Category not found"
}
```

---

### GET /:categoryId/:subCategoryId/:productId

> Get the details of a specific product

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "categoryName": "Electronics",
  "subcategoryName": "Mobile Phones",
  "product": {
    "id": "prod2",
    "productName": "Samsung Galaxy",
    "price": 899.99,
    "description": "High-quality Android smartphone with a stunning display.",
    "availability": true,
    "stock": 5
  }
}
```

_Response (404 - Category not found)_

```
{
  "error": "Category not found"
}
```

_Response (404 - Subcategory not found)_

```
{
  "error": "Subcategory not found"
}
```

_Response (404 - Product not found)_

```
{
  "error": "Product not found"
}
```
