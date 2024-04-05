// This script handles the login functionality
import { postData } from "/utils/httpReq.js"; // Import postData function from httpReq.js
import { setCookie } from "/utils/cookie.js"; // Import setCookie function from cookie.js
import authHandler from "/utils/authorization.js"; // Import authHandler function from authorization.js
import validateForm from "/utils/validation.js"; // Import validateForm function from validation.js
// Selectors
const inputBox = document.querySelectorAll("input"); // inputBox is a NodeList of all input elements on the page
const loginButton = document.querySelector("button"); // loginButton is the submit button of the form
// Event handler for the form submission
const submitHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  // Get the values of the input elements
  const username = inputBox[0].value;
  const password = inputBox[1].value;
  // Call the validateForm function to validate the form
  const validation = validateForm(username, password);
  // If the form is valid, proceed with the login process
  if (validation) {
    try {
      // Make an HTTP POST request to the /auth/login endpoint
      const response = await postData("auth/login", { username, password });
      // Set the user's token in a cookie
      setCookie(response.token);
      // Redirect the user to the homepage
      location.assign("/index.html");
    } catch (error) {
      console.log(error);
    }
  }
};
// Add an event listener to the submit button
loginButton.addEventListener("click", submitHandler);
// Add an event listener to the document to call the authHandler function
// when the page is loaded (DOMContentLoaded event)
document.addEventListener("DOMContentLoaded", authHandler);
