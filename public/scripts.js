/**
 * Author: Abraham Belayneh
 * CS 132 Spring 2024
 *
 * This file contains the client-side JavaScript code for the product list page.
 */

(function () {
  // CONSTANTS for API
  const API_URL = "/api";
  const PRODUCTS = "/products";
  const FILTER = "/filter";
  const PRICE = "/price";

  /**
   * Init function, fetches all products from the server. Gets LocalStorage cart items.
   * Sets event listeners for filter and cart buttons.
   * @returns {void}
   */
  function init() {
    id("filter-button").addEventListener("click", filterByPriceRange);
    fetchProducts();
  }

  /**
   * Filter products by price range.
   * @returns {void}
   *
   */
  async function filterByPriceRange() {
    const minPrice = parseFloat(id("min-price").value);
    const maxPrice = parseFloat(id("max-price").value);
    try {
      let response = await fetch(
        API_URL + FILTER + PRICE + `?min=${minPrice}&max=${maxPrice}`
      );
      response = checkStatus(response);
      const data = await response.json();
      clearError();
      displayProducts(data);
    } catch (error) {
      displayError(error);
    }
  }

  /**
   * Fetches all products from the server.
   * @returns {void}
   */
  async function fetchProducts() {
    try {
      let response = await fetch(API_URL + PRODUCTS);
      response = checkStatus(response);
      const data = await response.json();
      clearError();
      displayProducts(data);
    } catch (error) {
      displayError(error);
    }
  }

  /**
   * Displays all products on the page.
   * @param {object[]} products - array of product objects
   * @returns {void}
   */
  function displayProducts(products) {
    // display products
    const productList = id("product-list");
    productList.innerHTML = "";
    for (let product of products) {
      const productCard = createProductCard(product);
      productList.appendChild(productCard);
    }
  }

  /**
   * Helper function for creating a product card.
   * @param {object} product - product object
   * @returns {object} product card element
   */
  function createProductCard(product) {
    const productDiv = gen("div");
    productDiv.classList.add("product-item");
    productDiv.dataset.id = product.id;
    const productName = gen("h3");
    productName.textContent = product.name;
    productDiv.appendChild(productName);
    const productPrice = gen("p");
    productPrice.textContent = `$${product.price}`;
    productDiv.appendChild(productPrice);
    const productDescription = gen("p");
    productDescription.textContent = product.description;
    const viewMore = gen("p");
    viewMore.textContent = "View Details";
    viewMore.classList.add("view-more");
    productDiv.appendChild(productDescription);
    productDiv.appendChild(viewMore);
    // give the entire div the event listener. many modern websites do this
    productDiv.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });
    return productDiv;
  }

  /**
   * Displays an error message on the page.
   * Display the error message in the div with the id "error-message"
   * @param {string} message - error message to display
   * @returns {void}
   */
  function displayError(message) {
    const errorMessage = id("error-message");
    errorMessage.textContent = message;
  }

  /**
   * Clear the error message on the page.
   */
  function clearError() {
    id("error-message").textContent = "";
  }

  init();
})();
