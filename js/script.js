// Import fetchData function from httpReq.js
import { fetchData } from "/utils/httpReq.js";
// Selectors
const menu = document.querySelector("#menu-icon");
const navList = document.querySelector(".nav-list");
const productsContainer = document.querySelector(".products-container");
const cartBtn = document.querySelector(".cart-button");
const cartMenu = document.querySelector(".cart-menu");
const closeBtn = document.querySelector(".close-btn");
const totalPriceDisplay = document.querySelector(".total-price");
const viewToggleButton = document.querySelector(".btn-view-toggle");
let allProducts = [];
let isAllDisplayed = false;
let displayedProductsCount = 4;
// Function to get cart items from localStorage
const getCartItems = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
};
// Function to handle adding a product to the cart
const addToCart = (product) => {
  const cartItems = getCartItems();
  // Check if there are already items in the cart stored in localStorage
  const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);
  if (existingProductIndex === -1) {
    product.quantity = 1;
    // Add the new product to the cartItems array
    cartItems.push(product);
  }
  // Store the updated cartItems array in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // Render the updated cart
  renderCart();
  // Change button text to "In Cart"
  const buttons = document.querySelectorAll(`.product[data-id="${product.id}"] .add-to-cart`);
  buttons.forEach((button) => {
    button.textContent = "In Cart";
    button.classList.add("disabled");
    button.classList.remove("add-to-cart");
  });
};
// Function to decrease the quantity of a product in the cart
const decreaseQuantity = (productId) => {
  const cartItems = getCartItems();
  const productIndex = cartItems.findIndex((item) => item.id === productId);
  if (productIndex !== -1 && cartItems[productIndex].quantity > 1) {
    cartItems[productIndex].quantity -= 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }
};
// Function to increase the quantity of a product in the cart
const increaseQuantity = (productId) => {
  const cartItems = getCartItems();
  const productIndex = cartItems.findIndex((item) => item.id === productId);
  if (productIndex !== -1) {
    cartItems[productIndex].quantity += 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }
};
// Function to remove an item from the cart
const removeItemFromCart = (productId) => {
  let cartItems = getCartItems();
  const updatedCartItems = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  renderCart();
  // Find the product button and change its text to "Add to Cart"
  const productButton = document.querySelector(`.product[data-id="${productId}"] .disabled`);
  if (productButton) {
    productButton.innerHTML = "Add To Cart <i class='ri-shopping-cart-fill'></i>";
    productButton.classList.remove("disabled");
    productButton.classList.add("add-to-cart");
  }
};
// Function to calculate the total price
const calculateTotal = () => {
  const cartItems = getCartItems();
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total.toFixed(2); // Return total with two decimal places
};
// Function to render the cart
const renderCart = () => {
  // Get the cart element
  const cartElement = document.querySelector(".cart-items");
  // Clear any existing cart items
  cartElement.innerHTML = "";
  // Get the cart items from localStorage
  const cartItems = getCartItems();
  // Loop through each item in the cart and render it
  cartItems.forEach((item) => {
    const itemElement = `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-info">
        <h3 class="item-name">${item.name}</h3>
        <span class="item-price">$${item.price}</span>
        <div class="item-actions">
          <button class="quantity-btn decrease" data-id="${item.id}"><i class="ri-subtract-line"></i></button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}"><i class="ri-add-line"></i></button>
          <button class="remove-btn" data-id="${item.id}"><i class="ri-delete-bin-line"></i></button>
        </div>
      </div>
    </div>
    `;
    cartElement.innerHTML += itemElement;
  });
  // Calculate and display the total price
  totalPriceDisplay.textContent = `Total-Price: $${calculateTotal()}`;
  const decreaseButtons = document.querySelectorAll(".decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      decreaseQuantity(button.dataset.id);
    });
  });
  const increaseButtons = document.querySelectorAll(".increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      increaseQuantity(button.dataset.id);
    });
  });
  // Add event listener to remove buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      removeItemFromCart(productId);
    });
  });
};
// Function to render products data
const renderData = (products) => {
  productsContainer.innerHTML = "";
  const cartItems = getCartItems();
  products.forEach((product) => {
    const isInCart = cartItems.some((item) => +item.id === product.id);
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
  event.preventDefault();
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
