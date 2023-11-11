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


function handleItemClick(itemId) {
  const items = document.querySelectorAll('.button');

  items.forEach(item => {
    const isCurrentItem = item.id === itemId;
    const svgElement = item.querySelector('svg');
    const pathElements = svgElement ? svgElement.querySelectorAll('path') : [];

    item.classList.toggle('bg-white', isCurrentItem);
    item.classList.toggle('shadow', isCurrentItem);
    item.classList.toggle('rounded-[40px]', isCurrentItem);
    item.classList.toggle('left-0', isCurrentItem);
    item.classList.toggle('top-0', isCurrentItem);
    item.classList.toggle('absolute', isCurrentItem);

    pathElements.forEach(pathElement => {
      pathElement.setAttribute('stroke', isCurrentItem ? '#D95A11' : 'white');
    });
  });
}

