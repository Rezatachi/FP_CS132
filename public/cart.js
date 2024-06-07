/**
 * Author: Abraham Belayneh
 * CS 132 Spring 2024
 *
 * This file contains the client-side JavaScript code for the cart page.
 */

(function () {
  const API_URL = "/api";
  const CART = "/cart";
  const REMOVE_CART = "/remove-from-cart";
  const CLEAR_CART = "/clear-cart";

  /**
   * Init function, fetches the cart items from the server.
   * @returns {void}
   */
  function init() {
    id("checkout-button").addEventListener("click", () => {
      id("confirmation-message").textContent =
        "Thank you for your purchase! Your order is on it's way.";
      clearCart();
      fetchCartItems();
    });
    fetchCartItems();
  }

  /**
   * Fetch the cart items from the server
   * @returns {void}
   */
  async function fetchCartItems() {
    try {
      let response = await fetch(API_URL + CART);
      response = checkStatus(response);
      const cartItems = await response.json();
      displayCartItems(cartItems);
      updateCartTotal(cartItems);
    } catch (error) {
      displayError(error);
    }
  }

  /**
   * Displays the cart items on the page.
   * @param {object[]} cartItems - array of cart item objects
   * @returns {void}
   */
  function displayCartItems(cartItems) {
    const cartList = id("cart-list");
    cartList.innerHTML = "";
    if (cartItems.length === 0) {
      const emptyCart = gen("p");
      emptyCart.textContent = "Cart is empty";
      cartList.appendChild(emptyCart);
      return;
    }
    for (let item of cartItems) {
      const cartItem = createCartItem(item);
      cartList.appendChild(cartItem);
    }
  }

  /**
   * Creates a cart item element.
   * @param {object} item - cart item object
   * @returns {HTMLElement} cart item element
   */
  function createCartItem(item) {
    const itemDiv = gen("div");
    itemDiv.classList.add("cart-item");

    const itemName = gen("h3");
    itemName.textContent = item.name;
    itemDiv.appendChild(itemName);

    const itemQuantity = gen("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;
    itemDiv.appendChild(itemQuantity);

    const itemPrice = gen("p");
    itemPrice.textContent = `Price: $${(item.price * item.quantity).toFixed(
      2
    )}`;
    itemDiv.appendChild(itemPrice);

    const deleteButton = gen("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      removeFromCart(item.id);
    });
    itemDiv.appendChild(deleteButton);
    return itemDiv;
  }

  /**
   * Removes an item from the cart. API call to remove item from cart.
   * @param {number} id - id of the item to remove
   * @returns {void}
   */
  async function removeFromCart(id) {
    try {
      let response = await fetch(API_URL + REMOVE_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          quantity: 1,
        }),
      });
      response = checkStatus(response);
      const data = await response.json();
      // update cart items
      fetchCartItems();
    } catch (error) {
      displayError(error);
    }
  }

  /**
   * Updates the total price of the cart.
   * @param {object[]} cartItems - array of cart item objects
   * @returns {void}
   */
  function updateCartTotal(cartItems) {
    let total = 0;
    for (let item of cartItems) {
      total += item.price * item.quantity;
    }
    id("cart-total").textContent = `Total: $${total.toFixed(2)}`;
  }

  /**
   * Clear Cart after the user purchases the items.
   * Since the API request is already done in the removeFromCart function,
   * we just need to update the cart items.
   */
  async function clearCart() {
    try {
      let response = await fetch(API_URL + CLEAR_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      response = checkStatus(response);
      const data = await response.json();
      updateCartTotal([]);
    } catch (error) {
      displayError(error);
    }
  }
  /**
   * Displays an error message on the page.
   * @param {string} message - error message to display
   * @returns {void}
   */
  function displayError(message) {
    const errorMessage = id("error-message");
    errorMessage.textContent = message;
  }

  init();
})();
