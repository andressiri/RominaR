const getBrowserBarHeight = () => {
  const varClientHeight = document.querySelector(".video-header").offsetHeight;
  const varInnerHeight = window.innerHeight;
  return varClientHeight - varInnerHeight;
};

const burguerMenuSlide = () => {
  const burguer = document.querySelector(".burguer");
  const nav = document.querySelector(".burguer-menu");
  const burguerMenuItems = document.querySelectorAll(".burguer-menu-item");

  //Toggle Burguer Menu
  burguer.addEventListener('click', () => {
    nav.classList.toggle("burguer-menu-active");

    //Animate Burguer Menu Items
    burguerMenuItems.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = "";
      } else {
        item.style.animation = `burguerMenuFade 0.5s ease forwards ${index/25 + 0.5}s`;
      };
    });
  });
};
//To work around browser's url bar in mobile devices.
const browserBarHeight = getBrowserBarHeight();
document.documentElement.style.setProperty('--browser-bar-height', `${browserBarHeight}px`);
//Call functions.
burguerMenuSlide();
