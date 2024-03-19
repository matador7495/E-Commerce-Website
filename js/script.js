const menu = document.querySelector("#menu-icon");
const navList = document.querySelector(".nav-list");

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
