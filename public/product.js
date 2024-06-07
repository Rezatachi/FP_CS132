/**
 * Author: Abraham Belayneh
 * CS 132 Spring 2024
 *
 * This file contains the client-side JavaScript code for the product details page.
 */

(function () {
  const API_URL = "/api";
  const PRODUCTS = "/products";
  const ADD_TO_CART = "/add-to-cart";
  /**
   * Init function, fetches the product details based on the ID from the URL.
   * @returns {void}
   */
  function init() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    if (productId) {
      fetchProduct(productId);
    } else {
      displayError("Product ID not found");
    }
  }

  /**
   * Fetch the product details from the server
   * @param {string} productId - product ID
   * @returns {void}
   */
  async function fetchProduct(productId) {
    try {
      let response = await fetch(API_URL + PRODUCTS + "/" + productId);
      response = checkStatus(response);
      const product = await response.json();
      displayProduct(product);
    } catch (error) {
      displayError(error);
    }
  }

  /**
   * Displays the product details on the page.
   * The HTML page will already have the HTML laid out for the product details.
   * @param {object} product - product object
   * @returns {void}
   */
  function displayProduct(product) {
    id("product-name").textContent = product.name;
    id("product-image").src = product.image;
    id("product-image").alt = product.name;
    id("product-price").textContent = "$" + product.price.toFixed(2);
    id("product-description").textContent = product.description;
    id("product-stock").textContent = "Stock: " + product.stock;
    id("add-to-cart").addEventListener("click", () => {
      addToCart(product);
    });
  }

  /**
   * Add to cart function, adds the product to the cart.
   * @param {object} product - product object
   * @returns {void}
   */
  async function addToCart(product) {
    try {
      let response = await fetch(API_URL + ADD_TO_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.id,
          quantity: 1,
        }),
      });
      response = checkStatus(response);
      const data = await response.json();
      console.log(data);
      // update stock
      id("product-stock").textContent = "Stock: " + data.stock;
      displayMessage(data.message);
    } catch (error) {
      displayError(error);
    }
  }

  /**
   * Displays an error message on the page.
   * Display the error message in the div with the id "error-message"
   * @param {string} message - error message to display
   * @returns {void}
   */
  function displayError(message) {
    const addToCart = id("add-to-cart");
    addToCart.classList.add("hidden");
    const errorMessage = id("error-message");
    errorMessage.textContent = message;
  }

  /**
   * Displays a success message on the page.
   * Display the success message in the div with the id "success-message"
   * @param {string} message - success message to display
   * @returns {void}
   */
  function displayMessage(message) {
    const successMessage = id("success-message");
    successMessage.textContent = message;
  }
  init();
})();
