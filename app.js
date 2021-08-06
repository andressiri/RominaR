//To know the browser's url bar height.
const getBrowserBarHeight = () => {
  const varClientHeight = document.querySelector(".video-header").offsetHeight;
  const varInnerHeight = window.innerHeight;
  return varClientHeight - varInnerHeight;
};

//Burguer Menu for handheld devices.
const burguerMenuSlide = () => {
  const burguer = document.querySelector(".burguer");
  const nav = document.querySelector(".burguer-menu");
  const burguerMenuItems = document.querySelectorAll(".burguer-menu-item");

  //Toggle Burguer Menu.
  burguer.addEventListener("click", () => {
    nav.classList.toggle("burguer-menu-active");

    //Animate Burguer Menu Items.
    burguerMenuItems.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = "";
      } else {
        item.style.animation = `burguerMenuFade 0.5s ease forwards ${index / 25 + 0.5}s`;
      }
    });
  });
};
//Gallery optional show more or less buttons.
const optionalGalleries = () => {
  const showMore = document.getElementById("show-more-label");
  const showLess = document.getElementById("show-less-label");
  const hiddenElements = document.querySelectorAll(".optional-hide");
  let index = 1; //This variable is related to the number of optional galleries.

  showMore.addEventListener("click", () => {
    const showLessIsHidden = !(showLess.classList.contains("optonal-show"));
    if (showLessIsHidden) {
      showLess.classList.add('optional-show');
    };
    if (index < 4) {
      document.getElementById(`optional-gallery-div${index}`).classList.add("optional-show");
      index++;
      if (index === 4) {
        showMore.classList.add("optional-hide");      
      };
    };
  });
  
  showLess.addEventListener("click", () => {
    hiddenElements.forEach((elem) => {
      elem.classList.remove("optional-show");
    });
    showMore.classList.remove("optional-hide");
    index = 1;
  });
};

//To handle viewport resizing when using mobile devices keyboard.
const handleKeyboardViewportResizing = () => {
  const keyboardActivation = document.querySelectorAll(".keyboard-activation");
  let fixSize = true;

  document.addEventListener("click", (event) => {
    const fixViewportHeight = window.innerHeight;

    keyboardActivation.forEach(async (item) => {
      const viewportMeta = document.querySelector("meta[name=viewport]");
      if (item.contains(event.target) && fixSize) {
        await setTimeout(() => {
          viewportMeta.setAttribute("content", `height=${fixViewportHeight}px, width=device-width, initial-scale=1.0`);
          fixSize = false;
        }, 90); //Timeout to handle transitions.
      } else if (viewportMeta.getAttribute("content") !== `width=device-width, initial-scale=1.0` && !event.target.classList.contains("keyboard-activation")) {
        await setTimeout(() => {
          viewportMeta.setAttribute("content", `width=device-width, initial-scale=1.0`);
          fixSize = true;
        }, 250); //Timeout to handle transitions.
      }
    });
  });
};

//Contact Autofill with activities cards.
const contactAutofill = () => {
  const activities = document.querySelectorAll(".contact-autofill");

  activities.forEach((activity) => {
    activity.addEventListener('click', () => {
      let activityText = '';
      switch (activity.id) {
        case "imagen-activity-anchor":
          activityText = "Asesoramiento de Imagen";
          break;
        case "guardarropas-activity-anchor":
          activityText = "Organización de Guardarropas";
          break;
        case "colorimetria-activity-anchor":
          activityText = "Colorimetría";
          break;
        case "shopper-activity-anchor":
          activityText = "Personal Shopper";
          break;
        case "eventos-activity-anchor":
          activityText = "Asesoramiento para Eventos";
          break;
        case "novias-activity-anchor":
          activityText = "Asesoramiento para Novias";
          break;
      };
      document.getElementById("topic").value = `${activityText}`;
      document.getElementById("topic-text").value = `Hola! Quisiera contactarte por la actividad de ${activityText}. Gracias!`;
    });
  });
};

//Navbar section visible display.
const navbarLinks = document.querySelectorAll(".section-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const sectionID = entry.target.getAttribute("id");
      const selectedLinks = document.querySelectorAll(`.navbar a[href="#${sectionID}"]`
      );

      if (entry.isIntersecting) {
        const removeLinks = document.querySelectorAll(".selected");
        removeLinks.forEach((itemRemove) => {
          itemRemove.classList.remove("selected");
        });
        selectedLinks.forEach((select) => {
          select.classList.add("selected");
        });
      }
    });
  },
  { rootMargin: "-45% 0% -55% 0%" }
);

navbarLinks.forEach((link) => {
  const hash = link.getAttribute("href");
  const target = document.querySelector(hash);
  if (target) {
    observer.observe(target);
  }
});

//To work around browser's url bar in mobile devices.
const browserBarHeight = getBrowserBarHeight();
document.documentElement.style.setProperty(
  "--browser-bar-height",
  `${browserBarHeight}px`
);

//Call functions.
burguerMenuSlide();
optionalGalleries();
handleKeyboardViewportResizing();
contactAutofill();



