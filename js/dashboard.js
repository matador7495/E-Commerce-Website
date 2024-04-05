// This script renders a list of users from the JSONplaceholder API
// on the dashboard page after the user is authorized.
import authHandler from "/utils/authorization.js";
import { getData } from "/utils/httpReq.js";
// Select the main content container in the dashboard page
const mainContent = document.getElementById("container");
// Select the logout button
const logoutButton = document.getElementById("logout");
// This function renders a list of users by creating HTML elements
// and adding them to the main content container.
const renderUsers = (users) => {
  // Empty the contents of the main content container
  mainContent.innerHTML = "";
  // Loop through each user and create a card for it
  users.forEach((user) => {
    // Create a string of HTML that represents a user card
    const JSX = `
      <div class="card">
        <h3><i class="ri-hashtag"></i>${user.id}</h3>
        <div>
          <p><i class="ri-user-3-line"></i> Name:</p>
          <span>${user.name.firstname} ${user.name.lastname}</span>
        </div>
        <div>
          <p><i class="ri-attachment-line"></i> Username:</p>
          <span>${user.username}</span>
        </div>
        <div>
          <p><i class="ri-mail-line"></i> Email:</p>
          <span>${user.email}</span>
        </div>
        <div>
          <p><i class="ri-phone-line"></i> Phone:</p>
          <span>${user.phone}</span>
        </div>
        <div>
          <p><i class="ri-map-2-line"></i> Address:</p>
          <span>${user.address.city} , ${user.address.street} , ${user.address.zipcode}</span>
        </div>       
      </div>    
    `;
    // Add the HTML string to the main content container
    mainContent.innerHTML += JSX;
  });
};
// This function is called when the DOM is loaded.
// It is responsible for checking if the user is authorized, making a request
// to the JSONplaceholder API, and rendering the list of users
const init = async () => {
  // Check if the user is authorized
  authHandler();
  // Make a GET request to the JSONplaceholder API for users
  const users = await getData("users");
  // Render the list of users
  renderUsers(users);
};
// This function is called when the logout button is clicked.
// It is responsible for clearing the user's authorization cookie
// and redirecting the user to the index page
const logoutHandler = () => {
  // Clear the authorization cookie
  document.cookie = "token=; max-age=0; path=/; SameSite=Lax";
  // Redirect the user to the index page
  location.assign("/index.html");
};
// Wait for the DOM to be loaded before calling init()
document.addEventListener("DOMContentLoaded", init);
// Add an event listener to the logout button
logoutButton.addEventListener("click", logoutHandler);
