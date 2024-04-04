// Import fetchData function from httpReq.js
import { fetchData } from "/utils/httpReq.js";
// Import functions from cart.js
import { getCartItems, addToCart, renderCart } from "./cart.js";
// Selectors
const menu = document.querySelector("#menu-icon");
const navList = document.querySelector(".nav-list");
const productsContainer = document.querySelector(".products-container");
const cartBtn = document.querySelector(".cart-button");
const cartMenu = document.querySelector(".cart-menu");
const closeBtn = document.querySelector(".close-btn");
const viewToggleButton = document.querySelector(".btn-view-toggle");
let allProducts = [];
let isAllDisplayed = false;
let displayedProductsCount = 4;
// Function to render products data
const renderData = (products) => {
  productsContainer.innerHTML = "";
  const cartItems = getCartItems();
  products.forEach((product) => {
    const isInCart = cartItems.some((item) => +item.id === product.id);
    // Generate HTML for each product and append it to the products container
    const JSX = `
    <div class="product" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <h3>${product.name}</h3>
      <div class="product-rating">
        <a href="#"><i class="ri-star-fill"> ${product.rate}/5</i></a>
      </div>
      <div class="product-info">
        <div class="product-buy">
          <button class="${isInCart ? "disabled" : "add-to-cart"}">
            ${isInCart ? "In Cart" : "Add To Cart <i class='ri-shopping-cart-fill'></i>"}
          </button>
        </div>
        <div class="product-price">
          <h6>$ ${product.price}</h6>
        </div>
      </div>
    </div>
    `;
    productsContainer.innerHTML += JSX;
  });
};
// Event listener for View All / Collapse Products button
viewToggleButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isAllDisplayed) {
    // Display all products
    renderData(allProducts);
    viewToggleButton.textContent = "Collapse Products";
  } else {
    // Display default number of products
    renderData(allProducts.slice(0, displayedProductsCount));
    viewToggleButton.textContent = "More Products";
  }
  isAllDisplayed = !isAllDisplayed;
});
// Initialize the application
const init = async () => {
  allProducts = await fetchData();
  renderData(allProducts.slice(0, displayedProductsCount));
  renderCart();
};
// Event listeners
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("click", (event) => {
  // Add product to cart when "Add to Cart" button is clicked
  if (event.target.classList.contains("add-to-cart") && !event.target.classList.contains("disabled")) {
    const productElement = event.target.closest(".product");
    const product = {
      id: productElement.dataset.id,
      name: productElement.querySelector("h3").textContent,
      price: parseFloat(productElement.querySelector(".product-price h6").textContent.replace("$", "")),
      image: productElement.querySelector(".product-image img").attributes[0].textContent,
    };
    addToCart(product);
  }
});
cartBtn.addEventListener("click", (event) => {
  // Toggle cart menu visibility when cart button is clicked
  event.preventDefault();
  cartMenu.classList.toggle("show");
});
closeBtn.addEventListener("click", () => {
  // Close cart menu when close button is clicked
  cartMenu.classList.remove("show");
});
// AOS event
menu.onclick = () => {
  // Toggle mobile menu icon and navigation menu visibility
  menu.classList.toggle("ri-menu-line");
  menu.classList.toggle("ri-close-line");
  navList.classList.toggle("open");
};
window.onscroll = () => {
  // Close mobile navigation menu when scrolling
  menu.classList.add("ri-menu-line");
  menu.classList.remove("ri-close-line");
  navList.classList.remove("open");
};
