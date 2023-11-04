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
    if (item.id === itemId) {
      item.classList.add('bg-white', 'shadow', 'rounded-[40px]', 'left-0', 'top-0', 'absolute');

      const svgElement = item.querySelector('svg');

      if (svgElement) {
        const pathElements = svgElement.querySelectorAll('path');

        pathElements.forEach(pathElement => {
          pathElement.setAttribute('stroke', '#D95A11')
        })
      }
    } else {
      item.classList.remove('bg-white', 'shadow', 'rounded-[40px]', 'left-0', 'top-0', 'absolute');

      const svgElement = item.querySelector('svg');

      if (svgElement) {
        const pathElements = svgElement.querySelectorAll('path');

        pathElements.forEach(pathElement => {
          pathElement.setAttribute('stroke', 'white')
        })
      }
    }
  });
}

