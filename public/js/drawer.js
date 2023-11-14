const body = document.body;
const menuButton = document.getElementById("menuButton");
const drawer = document.getElementById("drawer");
const closeMenu = document.getElementById("closeMenu");

menuButton.addEventListener("click", () => {
  drawer.classList.toggle("-translate-x-full");
});

closeMenu.addEventListener("click", () => {
  drawer.classList.toggle("-translate-x-full");
});

