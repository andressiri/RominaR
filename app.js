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
      }
    });
  });


};

burguerMenuSlide();
