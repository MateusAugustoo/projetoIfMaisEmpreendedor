const header = document.getElementById('header');
function headerCompoment() {
    const container =  document.createElement('div');
    container.classList.add('flex', 'justify-between', 'align-baseline', 'mt-8', 'items-center');

    const drawerImgIcon =  document.createElement('img');
    drawerImgIcon.src = '../iconsDrawer/drawer.svg';
    drawerImgIcon.alt = 'image de drawer'
    drawerImgIcon.classList.add('ml-7', 'cursor-pointer');
    drawerImgIcon.id = 'menuButton';
    container.appendChild(drawerImgIcon);

    const title =  document.createElement('h1');
    title.textContent = 'Pizzaria Ramos';
    title.classList.add('text-3xl', 'fonteHeader', 'mx-auto', 'bg-clip-text', 'text-transparent', 'bg-gradient-to-r', 'from-orange-600', 'to-amber-400');
    container.appendChild(title);

    header.appendChild(container);
};
headerCompoment();

const menuButton = document.getElementById("menuButton");
const drawer = document.getElementById("drawer");
const closeMenu = document.getElementById("closeMenu");

menuButton.addEventListener("click", () => {
  drawer.classList.toggle("-translate-x-full");
});

closeMenu.addEventListener("click", () => {
  drawer.classList.toggle("-translate-x-full");
});
