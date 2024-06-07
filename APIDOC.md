# Eco-Friendly Store API Documentation
*This API provides endpoints for managing eco-friendly products and user shopping carts.*

## Get All Products
**Request TYPE:** GET

**Returned Data Format**: JSON

**Description:** This request retrieves all eco-friendly products available in the store.

**Supported Parameters**: none

**Example Request:** GET /api/products

**Example Response:**

```json
[
    {
        "id": 1,
        "name": "Reusable Bamboo Straws",
        "price": 9.99,
        "stock": 50
    },
    {
        "id": 2,
        "name": "Organic Cotton Tote Bag",
        "price": 14.99,
        "stock": 30
    }
]
```

**Error Handling:**
- **200 OK**: Returns an array of products.
- **500 Internal Server Error**: If an error occurs on the server.

## Get Product By Id
**Request TYPE:** GET

**Returned Data Format**: JSON

**Description:** This request retrieves the product with specific id.

**Supported Parameters**: id

**Example Request:** GET /api/products/2

**Example Response:**

```json
[
    {
        "id": 2,
        "name": "Organic Cotton Tote Bag",
        "price": 14.99,
        "stock": 30
    }
]
```

**Error Handling:**
- **200 OK**: Returns the product with the given id
- **400 Bad Request**: If the id is not a number
- **404 Not Found** If there is no product with the given id
- **500 Internal Server Error**: If an error occurs on the server.

## Get Products by Price Range

**Request TYPE:** GET

**Returned Data Format:** JSON

**Description:** This request retrieves all products that are priced between two specified values.

**Supported Parameters:**

min (Number): The minimum price of the products to be retrieved.
max (Number): The maximum price of the products to be retrieved.
**Example Request:** GET /api/products/price?min=10&max=20

**Example Response:**

```json

[
    {
        "id": 2,
        "name": "Organic Cotton Tote Bag",
        "price": 14.99,
        "description": "Durable and eco-friendly tote bag made from 100% organic cotton.",
        "stock": 30
    },
    {
        "id": 5,
        "name": "Beeswax Food Wraps",
        "price": 12.99,
        "description": "Reusable beeswax wraps to keep your food fresh without plastic.",
        "stock": 40
    },
    {
        "id": 8,
        "name": "Reusable Produce Bags",
        "price": 10.99,
        "description": "Set of 5 reusable mesh bags for fruits and vegetables.",
        "stock": 80
    }
]
```

**Error Handling:**

-- **200 OK:** Returns an array of products matching the specified price range.
-- **400 Bad Request:** If the min or max parameters are not numbers.
-- **404 Not Found:** If no products are found within the specified price range.
-- **500 Internal Server Error:** If an error occurs on the server.

## GET FAQ Questions and Answers

**Request TYPE:** GET

**Returned Data Format:** Text

**Description:** This request retrieves the top questions users have asked

**Supported Parameters**: none

**Example Request:** GET /api/faqs

**Example Response:**
```json
[
    {
    id: 1,
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase.",
  },
  {
    id: 2,
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide.",
  },
  {
    id: 3,
    question: "How can I track my order?",
    answer:
      "You can track your order through the link sent to your email after purchase.",
  },
  {
    id: 4,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    id: 5,
    question: "How can I contact customer service?",
    answer:
      "You can contact us via the contact form on our website or by calling our customer service number.",
  },
]
```
**Error Handling:**
- **200 OK**: Returns an array of products.
- **500 Internal Server Error**: If an error occurs on the server.


## Get Cart
**Request TYPE:** GET

**Returned Data Format**: JSON

**Description:** This request retrieves the user's shopping cart.

**Supported Parameters**: none

**Example Request:** GET /api/cart

**Example Response:**

```json
[
    {
        "productId": 1,
        "quantity": 2
    }
]
```

**Error Handling:**
- **200 OK**: Returns an array of cart items.
- **500 Internal Server Error**: If an error occurs on the server.

## Add Product to Cart
**Request TYPE:** POST

**Returned Data Format**: Status Code

**Description:** This request adds a product to the user's shopping cart.

**Supported Parameters**: productId (Integer), quantity (Integer)

**Example Request:** POST /api/add-to-cart

**Example Request Body:**

```json
{
    "productId": 1,
    "quantity": 2
}
```

**Example Response:**

```
200 OK
```

**Error Handling:**
- **200 OK**: Returns success if the product is added to the cart.
- **400 Bad Request**: If the request body is invalid.
- **404 Not Found**: If the product with the specified ID is not found.
- **500 Internal Server Error**: If an error occurs on the server.


## Clear Cart
**Request TYPE:** POST

**Description:** This request clears all items from the user's shopping cart.

**Example Request:** POST /api/clear-cart

**Returned Data Format:** JSON

**Example Request:**
```json
{
    "message": "Cart cleared"
}
```

**Error Handling**:
- **200 OK:** Returns a success message if the cart is cleared successfully.
- **500 Internal Server Error:** If an error occurs on the server.

## Remove Item from Cart
**Request TYPE**: POST

**Description**: This request removes a specific item from the user's shopping cart.

**Example Request:** POST /api/remove-cart/3

**Supported Parameters:** productId (Integer)

```json
{
    "message": "Item removed from cart"
}
```

**Error Handling:**
- **200 OK:** Returns a success message if the item is removed from the cart successfully.
- **400 Bad Request:** If the request body is invalid.
- **404 Not Found:** If the product with the specified ID is not found in the cart.
- **500 Internal Server Error:** If an error occurs on the server.