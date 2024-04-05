const totalPriceDisplay = document.querySelector(".total-price");
// Function to get cart items from localStorage
const getCartItems = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
};
// Function to handle adding a product to the cart
const addToCart = (product) => {
  const cartItems = getCartItems();
  const existingProduct = cartItems.find((item) => item.id === product.id);
  if (!existingProduct) {
    // If the product is not already in the cart, add it with quantity 1
    product.quantity = 1;
    cartItems.push(product);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
  updateCartBadge();
  // Change button text to "In Cart" after adding the product
  const buttons = document.querySelectorAll(`.product[data-id="${product.id}"] .add-to-cart`);
  buttons.forEach((button) => {
    button.textContent = "In Cart";
    button.classList.add("disabled");
    button.classList.remove("add-to-cart");
  });
};
// Function to update the cart badge with stored count
const updateCartBadge = () => {
  const cartItems = getCartItems();
  const cartBadge = document.getElementById("cart-items-count");
  if (cartBadge) {
    cartBadge.textContent = cartItems.length;
  } else {
    cartBadge.textContent = 0;
  }
};
// Call updateCartBadge when the page loads to set the initial count
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});
// Function to decrease the quantity of a product in the cart
const decreaseQuantity = (productId) => {
  const cartItems = getCartItems();
  const product = cartItems.find((item) => item.id === productId);
  if (product && product.quantity > 1) {
    // Decrease the quantity of the product in the cart
    product.quantity -= 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }
};
// Function to increase the quantity of a product in the cart
const increaseQuantity = (productId) => {
  const cartItems = getCartItems();
  const product = cartItems.find((item) => item.id === productId);
  if (product) {
    // Increase the quantity of the product in the cart
    product.quantity += 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }
};
// Function to remove an item from the cart
const removeItemFromCart = (productId) => {
  let cartItems = getCartItems();
  cartItems = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
  updateCartBadge();
  // Change button text back to "Add to Cart" after removing the product
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
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return total.toFixed(2); // Return total with two decimal places
};
// Function to render the cart
const renderCart = () => {
  const cartElement = document.querySelector(".cart-items");
  cartElement.innerHTML = "";
  const cartItems = getCartItems();
  cartItems.forEach((item) => {
    // Generate HTML for each item in the cart and append it to the cart container
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
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
    `;
    cartElement.appendChild(itemElement);
  });
  // Calculate and display the total price
  totalPriceDisplay.textContent = `Total-Price: $${calculateTotal()}`;
  // Add event listeners to quantity buttons and remove buttons
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
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      removeItemFromCart(productId);
    });
  });
};
export { getCartItems, addToCart, renderCart };
