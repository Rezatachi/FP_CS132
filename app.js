const express = require("express");
const path = require("path");
const app = express();

// SERVER CODES
const SERVER_ERROR = 500;
const SERVER_SUCCESS = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

// import product.js
const products = require("./productData");
const faqs = require("./faqData");

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// backend cart for user
let cart = [];
// backend customer feedback for server
let feedback = [];

// GET ENDPOINTS
/**
 * Returns all products from the products array.
 * Example: GET /products
 * Response: products array
 * Returns server error if products array is empty.
 */
app.get("/api/products", (req, res) => {
  try {
    res.type("json");
    res.send(JSON.stringify(products));
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

/**
 * Returns a single product by id.
 * Example: GET /products/1
 * Response: product object
 * Returns server error if product is not found.
 */
app.get("/api/products/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(BAD_REQUEST).send("Invalid id");
    }
    const product = products.find((product) => product.id === id);
    if (!product) {
      res.status(NOT_FOUND).send("Product not found");
    } else {
      res.type("json").send(product);
    }
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

/**
 * Returns products that are priced between two values.
 * Example: GET /products/price?min=10&max=20
 * Response: products array
 * Returns server error if products array is empty.
 */
app.get("/api/filter/price", (req, res) => {
  try {
    const min = parseFloat(req.query.min);
    const max = parseFloat(req.query.max);
    if (isNaN(min) || isNaN(max)) {
      return res.status(BAD_REQUEST).send("Invalid price range");
    }
    const filteredProducts = products.filter(
      (product) => product.price >= min && product.price <= max
    );
    if (filteredProducts.length === 0) {
      return res.status(NOT_FOUND).send("No products found");
    } else {
      return res.type("json").send(filteredProducts);
    }
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

/**
 * Returns all products in the cart.
 * Example: GET /cart
 * Response: cart array
 *
 */
app.get("/api/cart", (req, res) => {
  try {
    res.type("json").send(cart);
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

/**
 * Returns all FAQs from the faqs array.
 * Example: GET /faqs
 * Response: faqs array
 * Returns server error if faqs array is empty.
 **/
app.get("/api/faqs", (req, res) => {
  try {
    res.type("json").send(faqs);
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

/**
 * Returns all feedback from the feedback array.
 * Example: GET /feedback
 * Response: feedback array
 * Returns server error if feedback array is empty.
 * This is for admin use only.
 */
app.get("/api/feedback", (req, res) => {
  try {
    res.type("json").send(feedback);
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

// POST ENDPOINTS
/**
 * Add to cart and reduce stock of product
 * Example: POST /add-to-cart
 * Request: { id: 1, quantity: 1 }
 * Response: 200 OK
 * Returns server error if product is not found.
 */
app.post("/api/add-to-cart", (req, res) => {
  try {
    const { id, quantity } = req.body;
    const product = products.find((product) => product.id === id);
    if (!product) {
      res.status(NOT_FOUND).send("Product not found");
    } else if (product.stock < quantity) {
      res.status(NOT_FOUND).send({ message: "Not enough stock" });
    } else {
      product.stock -= quantity;
      // if product is already in cart, increase quantity
      const cartItem = cart.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.push({ id, name: product.name, price: product.price, quantity });
      }

      res
        .status(SERVER_SUCCESS)
        .send({ message: "Added to cart", stock: product.stock });
    }
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

/**
 * Remove from cart and increase stock of product
 * Example: POST /remove-from-cart
 * Request: { id: 1, quantity: 1 }
 * Response: 200 OK
 * Returns server error if product is not found.
 */
app.post("/api/remove-from-cart", (req, res) => {
  try {
    const { id, quantity } = req.body;
    const product = products.find((product) => product.id === id);
    if (!product) {
      res.status(NOT_FOUND).send("Product not found");
    } else {
      product.stock += quantity;
      const cartItem = cart.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity -= quantity;
        if (cartItem.quantity <= 0) {
          cart = cart.filter((item) => item.id !== id);
        }
      }
      res
        .status(SERVER_SUCCESS)
        .send({ message: "Removed from cart", stock: product.stock });
    }
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

/**
 * Clear entire cart when user purchases items
 * Example: POST /clear-cart
 * Response: 200 OK
 * Returns server error if cart is not found.
 */
app.post("/api/clear-cart", (req, res) => {
  try {
    cart = [];
    res.status(SERVER_SUCCESS).send({ message: "Cart cleared" });
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

/**
 * Add feedback to the server
 * Example: POST /add-feedback
 * Request: { name: 'John Doe', feedback: 'Great website!' }
 * Response: 200 OK
 */
app.post("/api/add-feedback", (req, res) => {
  try {
    const { name, email, message } = req.body;
    feedback.push({ name, email, message });
    res.status(SERVER_SUCCESS).send({ message: "Feedback sent" });
  } catch (error) {
    res.status(SERVER_ERROR).send("Server error");
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
