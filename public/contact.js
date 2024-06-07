/**
 * Author: Abraham Belayneh
 * CS 132 Spring 2024
 *
 * This file contains the client-side JavaScript code for the contact page.
 */

(function () {
  // Constants
  const API_URL = "/api";
  const ADD_FEEDBACK = "/add-feedback";

  /**
   * Init event listener for submit button
   * @returns {void}
   */
  function init() {
    id("submitBtn").addEventListener("click", submitForm);
  }

  /**
   * Submit form data
   * @param {Event} e - submit button click event
   * @returns {void}
   */
  function submitForm(e) {
    // prevent default form submission
    e.preventDefault();
    const name = id("name").value;
    const email = id("email").value;
    const message = id("message").value;

    if (name === "" || email === "" || message === "") {
      return;
    } else {
      sendFeedback(name, email, message);
    }
  }

  /**
   * Send feedback to server
   * @param {string} name - name of user
   * @param {string} email - email of user
   * @param {string} message - message from user
   * @returns {void}
   */
  async function sendFeedback(name, email, message) {
    try {
      let response = await fetch(API_URL + ADD_FEEDBACK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });
      response = checkStatus(response);
      const data = await response.json();
      displayMessage("Feedback submitted successfully!");
    } catch (error) {
      displayError("Failed to submit feedback. Please try again later.");
    }
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
