/**
 * Author: Abraham Belayneh
 * CS 132 Spring 2024
 *
 * This file contains the client-side JavaScript code for the FAQ page.
 */

(function () {
  // constants
  const API_URL = "/api";
  const FAQ = "/faqs";

  /**
   * Init function to be called when the page is loaded
   * @returns {void}
   */
  function init() {
    // get the faq data
    getFaqData();
  }

  /**
   * Get the faq data from the server
   * @returns {void}
   */
  async function getFaqData() {
    try {
      let response = await fetch(API_URL + FAQ);
      response = checkStatus(response);
      const data = await response.json();
      displayFaqData(data);
    } catch (error) {
      console.error("Error fetching faq data: ", error);
    }
  }

  /**
   * Display the faq data on the page
   * @param {Array} data - the faq data
   * @returns {void}
   */
  function displayFaqData(data) {
    const faqList = id("faq-list");
    data.forEach((faq) => {
      const faqCard = createFaqCard(faq);
      faqList.appendChild(faqCard);
    });
  }

  /**
   * Create a faq card
   * @param {Object} faq - the faq object
   * @returns {HTMLElement} - the faq card
   */
  function createFaqCard(faq) {
    const faqCard = document.createElement("div");
    faqCard.classList.add("faq-item");
    const question = document.createElement("h3");
    question.textContent = faq.question;
    question.classList.add("faq-question");
    const answer = document.createElement("p");
    answer.textContent = faq.answer;
    answer.classList.add("faq-answer");
    faqCard.appendChild(question);
    faqCard.appendChild(answer);
    return faqCard;
  }

  init();
})();
