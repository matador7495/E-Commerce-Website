//import
import { fetchData } from "/utils/httpReq.js";
//selector
const menu = document.querySelector("#menu-icon");
const navList = document.querySelector(".nav-list");
const productsContainer = document.querySelector(".products-container");
const cartBtn = document.querySelector(".cart-button");
const cartMenu = document.querySelector(".cart-menu");
const closeBtn = document.querySelector(".close-btn");
//function
const renderData = async (products) => {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const JSX = `
    <div class="product">
      <div class="product-image">
        <img src="${product.image}" />
      </div>
      <h3>${product.name}</h3>
      <div class="product-rating">
        <a href="#"><i class="ri-star-fill"> ${product.rate}/5</i></a>
      </div>
      <div class="product-info">
        <div class="product-buy">
          <a href="#">
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
};
const init = async () => {
  const allProducts = await fetchData();
  renderData(allProducts);
};
const toggleCartMenu = () => {
  cartMenu.classList.toggle("show");
};
// Event
document.addEventListener("DOMContentLoaded", init);
cartBtn.addEventListener("click", toggleCartMenu);
closeBtn.addEventListener("click", toggleCartMenu);
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
