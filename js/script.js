//import
import { fetchData } from "/utils/httpReq.js";
//selector
const menu = document.querySelector("#menu-icon");
const navList = document.querySelector(".nav-list");
const productsContainer = document.querySelector(".products-container");
const cartBtn = document.querySelector(".cart-button");
const cartMenu = document.querySelector(".cart-menu");
const closeBtn = document.querySelector(".close-btn");
// Function to handle adding a product to the cart
const addToCart = (product) => {
  // Check if there are already items in the cart stored in localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // Add the new product to the cartItems array
  cartItems.push(product);
  // Store the updated cartItems array in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // Render the updated cart
  renderCart();
};
// Function to render the cart
const renderCart = () => {
  // Get the cart element
  const cartElement = document.querySelector(".cart-items");
  // Clear any existing cart items
  cartElement.innerHTML = "";
  // Get the cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // Loop through each item in the cart and render it
  cartItems.forEach((item) => {
    // const itemElement = document.createElement("div");
    // itemElement.classList.add("cart-item");
    // itemElement.innerHTML = `
    //   <img src="${item.image}" alt="${item.name}">
    //   <div class="item-info">
    //     <h4 class="item-name">${item.name}</h4>
    //     <p class="item-price">$${item.price}</p>
    //   </div>
    // `;
    const itemElement = `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-info">
        <h3 class="item-name">${item.name}</h3>
        <span class="item-price">$${item.price}</span>
        <div class="item-actions">
          <button class="quantity-btn decrease"><i class="ri-subtract-line"></i></button>
          <span class="item-quantity">1</span>
          <button class="quantity-btn increase"><i class="ri-add-line"></i></button>
          <button class="remove-btn"><i class="ri-delete-bin-line"></i></button>
        </div>
      </div>
    </div>
    `;
    // cartElement.appendChild(itemElement);
    cartElement.innerHTML += itemElement;
  });
};
// Function to add event listeners to the "Add to cart" buttons
const addToCartButtons = () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Prevent default behavior of the link
      event.preventDefault();
      // Find the parent product element
      const productElement = event.target.closest(".product");
      // Extract product information from the product element
      const product = {
        id: productElement.dataset.id,
        name: productElement.querySelector("h3").textContent,
        price: parseFloat(productElement.querySelector(".product-price h6").textContent.replace("$", "")),
        image: productElement.querySelector(".product-image img").attributes[0].textContent,
      };
      // Add the product to the cart
      addToCart(product);
    });
  });
};
//renderData function
const renderData = async (products) => {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const JSX = `
    <div class="product" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" />
      </div>
      <h3>${product.name}</h3>
      <div class="product-rating">
        <a href="#"><i class="ri-star-fill"> ${product.rate}/5</i></a>
      </div>
      <div class="product-info">
        <div class="product-buy">
          <a href="#" class="add-to-cart">
            Add to cart
            <i class="ri-shopping-cart-fill"></i>
          </a>
        </div>
        <div class="product-price">
          <h6>$ ${product.price}</h6>
        </div>
      </div>
    </div> 
    `;
    productsContainer.innerHTML += JSX;
  });
  // Call the function to add event listeners to the "Add to cart" buttons
  addToCartButtons();
};
//init function
const init = async () => {
  const allProducts = await fetchData();
  renderData(allProducts);
  renderCart(); // Call renderCart to display cart items when the page loads
};
// Event listeners
document.addEventListener("DOMContentLoaded", init);
cartBtn.addEventListener("click", () => {
  cartMenu.classList.toggle("show");
});
closeBtn.addEventListener("click", () => {
  cartMenu.classList.remove("show");
});
//AOS event
menu.onclick = () => {
  menu.classList.toggle("ri-menu-line");
  menu.classList.toggle("ri-close-line");
  navList.classList.toggle("open");
};
window.onscroll = () => {
  menu.classList.add("ri-menu-line");
  menu.classList.remove("ri-close-line");
  navList.classList.remove("open");
};
