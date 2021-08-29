//Burguer Menu for handheld devices.
const burguerMenuSlide = () => {
  const burguer = document.querySelector(".burguer");
  const burguerMenu = document.querySelector(".burguer-menu");
  const burguerMenuItems = document.querySelectorAll(".burguer-menu-item");

  //Toggle Burguer Menu.
  burguer.addEventListener("click", () => {
    burguerMenu.classList.toggle("burguer-menu-active");

    //Animate Burguer Menu Items.
    burguerMenuItems.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = "";
      } else {
        item.style.animation = `burguerMenuFade 0.5s ease forwards ${index / 25 + 0.5}s`;
      }
    });

    //Burguer tap animation.
    burguer.classList.toggle("burguer-active");
  });
};

//Optional Galleries - buttons for showing more or less.
const optionalGalleries = () => {
  const showMore = document.getElementById("show-more-label");
  const showLess = document.getElementById("show-less-label");
  const hiddenElements = document.querySelectorAll(".optional-hide");
  let aux = 1; //This variable is related to the number of optional galleries.

  showMore.addEventListener("click", () => {
    const showLessIsHidden = !(showLess.classList.contains("optonal-show"));
    if (showLessIsHidden) {
      showLess.classList.add('optional-show');
    };
    if (aux < 4) { //< 4 - In order to show just 3 extra galleries
      document.getElementById(`optional-gallery-div${aux}`).classList.add("optional-show");
      aux++;
      if (aux === 4) {
        showMore.classList.add("optional-hide");      
      };
    };
  });
  
  showLess.addEventListener("click", () => {
    hiddenElements.forEach((elem) => {
      elem.classList.remove("optional-show");
    });
    showMore.classList.remove("optional-hide");
    aux = 1;
  });
};

//To handle viewport resizing when using mobile devices keyboard.
const handleKeyboardViewportResizing = () => {
  const keyboardActivation = document.querySelectorAll(".keyboard-activation");
  let fixSize = true;

  document.addEventListener("click", async (event) => {
    const viewportMeta = document.querySelector("meta[name=viewport]");
    const targetKeyboardActivation = event.target.closest(".keyboard-activation");

    if (!targetKeyboardActivation && viewportMeta.getAttribute("content") == `width=device-width, initial-scale=1.0`) {
      return;//When keyboard is not being activated nor active don't waste resourses.
    } else if (!targetKeyboardActivation) {//When the keyboard is closed.
      const awaitClosingKeyboard = async function () {
        await setTimeout(() => {
          viewportMeta.setAttribute("content", `width=device-width, initial-scale=1.0`);
          fixSize = true;
        }, 250); //Timeout to handle transitions.
      };  
      awaitClosingKeyboard();  
    } else {//When keyboard is activated or active.      
      keyboardActivation.forEach(async (item) => {
        const fixViewportHeight = window.innerHeight;      
        if (item.contains(event.target) && fixSize) {
          await setTimeout(() => {
            viewportMeta.setAttribute("content", `height=${fixViewportHeight}px, width=device-width, initial-scale=1.0`);
            fixSize = false;
          }, 90); //Timeout to handle transitions.
        } 
      });
    };
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
      document.getElementById("topic-text").value = `Hola! Quisiera consultarte por la actividad de ${activityText}. Gracias!`;
    });
  });
};

//Mark on Navbar the section is being displayed.
const navbarLinks = document.querySelectorAll(".section-link");

const sectionObserver = new IntersectionObserver((entries) => {
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
  //Set the place where observer will observe. 
{ rootMargin: "-45% 0% -55% 0%" });

 //Tell observer which elements it should observe.
navbarLinks.forEach((link) => {
  const hash = link.getAttribute("href");
  const target = document.querySelector(hash);
  if (target) {
    sectionObserver.observe(target);
  }
});

//To know the browser's url bar height.
const getBrowserBarHeight = () => {
  const varClientHeight = document.querySelector(".home-header").offsetHeight;
  const varInnerHeight = window.innerHeight;
  return varClientHeight - varInnerHeight;
};
//To work around browser's url bar in mobile devices.
const browserBarHeight = getBrowserBarHeight();
document.documentElement.style.setProperty("--browser-bar-height", `${browserBarHeight}px`);


//Full Screen Gallery

  //Variables
const images = document.querySelectorAll(".img-is-clickable-div");
const imagesArr = Array.from(images);
const fullScreen = document.querySelector(".full-screen-display");
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".carousel-btn-next");
const firstBtn = document.querySelector(".carousel-btn-first");
const prevBtn = document.querySelector(".carousel-btn-prev");
const lastBtn = document.querySelector(".carousel-btn-last");
const dotsNav = document.querySelector(".carousel-nav-dots-track");
let dotIndexAux = -100;
const dots = Array.from(dotsNav.children);
const dotsArea = document.querySelector(".carousel-nav-dots"); 
let trackWidth = track.getBoundingClientRect().width;
let dotWidth = dots[0].getBoundingClientRect().width;

 //Arrange the slides next to one another.
const setSlidePosition = (slide, index) => {
  slide.style.left = `${(trackWidth + 10) * index}px`;
};
slides.forEach(setSlidePosition);

 //Arrange the dots next to one another.
const setDotPosition = (dot, index) => {
  dot.style.left = `${(dotWidth + dotWidth/3) * index}px`;
};
dots.forEach(setDotPosition);

  //Move to target slide.
const moveToSlide = (currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

  //Observe track resizing - to handle window size changes or landscape swapping.
const trackResizeObserver = new ResizeObserver(() => {
  trackWidth = track.getBoundingClientRect().width;
  slides.forEach(setSlidePosition);
  const currentSlide = track.querySelector(".current-slide");
  if (currentSlide) {
    moveToSlide(currentSlide, currentSlide);
  };
});

trackResizeObserver.observe(track);

  //Handle how are shown the group of visible dots.
const handleDotsShown = (targetIndex) => {
  const shadowLeft = dotsArea.querySelector(".dots-nav-shadow-div-left");
  const shadowRight = dotsArea.querySelector(".dots-nav-shadow-div-right");  

  if (targetIndex < 4) {
    shadowLeft.classList.add("is-hidden");
    shadowRight.classList.remove("is-hidden");
    dotsNav.style.transform = `translateX(0)`;
  } else if (targetIndex > dots.length - 5) {
    shadowLeft.classList.remove("is-hidden");
    shadowRight.classList.add("is-hidden");
    dotsNav.style.transform = `translateX(-${dots[dots.length - 7].style.left})`; 
  } else {
    shadowLeft.classList.remove("is-hidden");
    shadowRight.classList.remove("is-hidden");
    dotsNav.style.transform = `translateX(-${dots[targetIndex - 3].style.left})`;
  };
};

  //Observe dots resizing - to handle window size changes or landscape swapping.
const dotResizeObserver = new ResizeObserver(() => {
  dots.forEach((dot) => dot.classList.add("disable-carousel-transition"));
  dotsNav.classList.add("disable-carousel-transition");
  dotWidth = dots[0].getBoundingClientRect().width;
  dots.forEach(setDotPosition);
  const currentDot = dotsNav.querySelector(".current-dot");
  const currentDotIndex = dots.findIndex(dot => dot === currentDot);
  handleDotsShown(currentDotIndex);
  dots.forEach((dot) => dot.classList.remove("disable-carousel-transition"));
  dotsNav.classList.remove("disable-carousel-transition");
});
  
dots.forEach((dot) => {
  dotResizeObserver.observe(dot);
});

  //handle buttons when shown slide is the first or last one.
const handleCarouselBtns = (targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add("is-disabled");    
    firstBtn.classList.add("is-disabled");    
    nextBtn.classList.remove("is-disabled");    
    lastBtn.classList.remove("is-disabled");    
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove("is-disabled");
    firstBtn.classList.remove("is-disabled");
    nextBtn.classList.add("is-disabled");
    lastBtn.classList.add("is-disabled");
  } else {
    prevBtn.classList.remove("is-disabled");
    firstBtn.classList.remove("is-disabled");
    nextBtn.classList.remove("is-disabled");
    lastBtn.classList.remove("is-disabled");
  };
};

  //Update Dots from nav when moving to another slide.
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-dot");
  targetDot.classList.add("current-dot");
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  handleCarouselBtns(targetIndex);
  handleDotsShown(targetIndex);
  dotIndexAux = -100;
};

  //Open full screen gallery at image clicked.
imagesArr.forEach((img, index) => {
  img.addEventListener('click', () => {
    document.querySelector("body").classList.add("lock-scrolling");
    
    const targetSlide = slides[index];
    const targetDot = dots[index];
    
    moveToSlide(targetSlide, targetSlide);
    updateDots(targetDot, targetDot);
    
    fullScreen.classList.add("full-screen-display-activated");
    setTimeout(() => {
      document.querySelector(".carousel-track").classList.add("handle-carousel-transition");      
    }, 500);

  });
});

  //Close full screen gallery.
const closeFullScreen = document.querySelector(".full-screen-navbar-icon");
closeFullScreen.addEventListener('click', () => {
  fullScreen.classList.remove("full-screen-display-activated");
  document.querySelector(".current-slide").classList.remove("current-slide");
  document.querySelector(".current-dot").classList.remove("current-dot");
  document.querySelector(".carousel-track").classList.remove("handle-carousel-transition");
  document.querySelector("body").classList.remove("lock-scrolling");
  dotIndexAux = -100;
});

  //Move slides track to the left when left/previous button is clicked.
prevBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-dot");
  const prevDot = currentDot.previousElementSibling;
  
  moveToSlide(currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
});
  //Move slides track to the first slide.
firstBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector(".current-slide");
  const firstSlide = slides[0];
  const currentDot = dotsNav.querySelector(".current-dot");
  const firstDot = dots[0];
  
  moveToSlide(currentSlide, firstSlide);
  updateDots(currentDot, firstDot);
});  

  //Move slides track to the right when right/next button is clicked.
nextBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-dot");
  const nextDot = currentDot.nextElementSibling;
  
  moveToSlide(currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
});

  //Move slides track to the last slide.
lastBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector(".current-slide");
  const lastSlideTarget = slides.length - 1;
  const lastSlide = slides[lastSlideTarget];
  const currentDot = dotsNav.querySelector(".current-dot");
  const lastDotTarget = dots.length - 1;
  const lastDot = dots[lastDotTarget];
  
  moveToSlide(currentSlide, lastSlide);
  updateDots(currentDot, lastDot);
}); 

  //Move to the nav indicator that is clicked.
dots.forEach((dot) => {
  dot.addEventListener('click', (event) => {
    const targetDot = event.target;
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-dot");
    const targetIndex = dots.findIndex(d => d === targetDot);
    const targetSlide = slides[targetIndex];    

    moveToSlide(currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    handleCarouselBtns(targetIndex); 
  });
});

  //Slide cards or dots grabbing/touching them. - Full Screen Gallery -
  
  //variables
let isDragging = false;
let startPos = 0;
let animationID = 0;
let currentTranslate = 0;
let slideOrDotsNav = true;
let targetDotIndex = 0;
let amountToMove = 0;
let resetSlidesAnimation = false;
let slidesAnimationNotStartedYet = true;
//dotIndexAux is set to -100 at start of Full screen gallery code.

  //Functions.
  //Get position of the mouse/touch.  
const getPositionX = (event) =>  {
  return aux = event.type.includes('mouse')
    ? event.pageX
    : event.touches[0].clientX;
};

const setSliderPosition = () => {
  const currentSlide = track.querySelector(".current-slide");
  track.style.transform = `translateX(calc(-${currentSlide.style.left} + ${currentTranslate}px))`;
};

const sliderAnimation = () => {  
  if (currentTranslate !== 0 || resetSlidesAnimation) {
    setSliderPosition();
    if (isDragging) {
      animationID = requestAnimationFrame(sliderAnimation);
    };
  }
};

const setDotsNavPosition = () => {
  if (dotIndexAux === -100) {
    const currentDot = dotsNav.querySelector(".current-dot");
    const currentDotIndex = dots.findIndex(dot => dot === currentDot);
    dotIndexAux = currentDotIndex;
  } else {
    targetDotIndex = dotIndexAux + Math.floor(currentTranslate/15) * -1;
  }
  if (targetDotIndex < 3) {
    targetDotIndex = 2;
  } else if (targetDotIndex > dots.length - 4) {
    targetDotIndex = dots.length - 3;
  };
  handleDotsShown(targetDotIndex);
};

const dotsNavAnimation = () => {  
  setDotsNavPosition();
  if (isDragging) {
    animationID = requestAnimationFrame(dotsNavAnimation);
  };
};

const touchStart = (event) => {
  slideOrDotsNav = track.contains(event.target);
  startPos = getPositionX(event);
  isDragging = true;
  resetSlidesAnimation = false;

  if (slideOrDotsNav) {    
    track.addEventListener('mouseleave', touchEnd);
    const currentSlide = track.querySelector(".current-slide");
    currentSlide.classList.add("grabbing");
    track.classList.add("disable-carousel-transition");
  } else {
    dotsArea.addEventListener('mouseup', () => {
      isDragging = false;
      dotsArea.removeEventListener('mouseup', () => {
        isDragging = false;
      });
    });
    setTimeout(() => {
      if (isDragging) {
        dotsArea.removeEventListener('mouseup', () => {
          isDragging = false;
        }); 
        dotsArea.addEventListener('mouseup', touchEnd);       
        dotsArea.addEventListener('mouseleave', touchEnd);
        dotsArea.classList.add("grabbing");
        dots.forEach((dot) => {
          dot.classList.add("grabbing");
        });
        animationID = requestAnimationFrame(dotsNavAnimation);
      };
    }, 150);
  };
};

const touchEnd = async (event) => {
  const currentSlide = track.querySelector(".current-slide");
  isDragging = false;
  
  if (slideOrDotsNav) {
    track.classList.add("faster-transition");
    track.removeEventListener('mouseleave', touchEnd);
    currentSlide.classList.remove("grabbing");
    if (currentTranslate < - 100) {
      await nextBtn.click();
    } else if (currentTranslate > 100) {
      prevBtn.click();
    };
    currentTranslate = 0;
    resetSlidesAnimation = true;
    slidesAnimationNotStartedYet = true;    
    requestAnimationFrame(sliderAnimation);
    setTimeout(() => {
      track.classList.remove("faster-transition");
      track.classList.remove("disable-carousel-transition");
    }, 350);
  } else {
    currentTranslate = 0;
    dotIndexAux = targetDotIndex;
    targetDotIndex = 0;
    dotsArea.classList.remove("grabbing");
    dots.forEach((dot) => {
      dot.classList.remove("grabbing");
    });
    dotsArea.removeEventListener('mouseleave', touchEnd);
  };
};

const touchMove = (event) => {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = currentPosition - startPos;
    //handle landscape weird scrolling.
    if ((slideOrDotsNav && ((currentTranslate > 10 && currentTranslate < 15) || (currentTranslate > -15 && currentTranslate < -10))) && slidesAnimationNotStartedYet) {
      animationID = requestAnimationFrame(sliderAnimation);
      slidesAnimationNotStartedYet = false;
    };
  };
};

const addCarouselEvents = (elem) => {
  //touch events
  elem.addEventListener('touchstart', touchStart, {passive: true});
  elem.addEventListener('touchend', touchEnd);
  elem.addEventListener('touchmove', touchMove, {passive: true});
  //mouse events
  elem.addEventListener('mousedown', touchStart);
  elem.addEventListener('mouseup', touchEnd);
  elem.addEventListener('mousemove', touchMove);
};
addCarouselEvents(track);
addCarouselEvents(dotsArea);

  //Show that image is clickable on touch devices
const imgObserver = new IntersectionObserver((entries) => {
  if (window.matchMedia( "(hover: none)").matches) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-clickable");
      } else {
        entry.target.classList.remove("show-clickable");
      }
    });
  };
},
  //Set the place where observer will observe. 
{ rootMargin: "-38% 0% -60% 0%" });

 //Tell observer which elements it should observe.
images.forEach((img) => {
  imgObserver.observe(img);
});
  

//end of Full Screen Gallery


//Contact Form.
const contactForm = document.getElementById("contact-form");
const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formTopic = document.getElementById("topic");
const formMessage = document.getElementById("topic-text");
const sendBtn = document.getElementById("send");

const phoneInput = document.getElementById("phone-number");
const phoneNumberAsking = document.querySelector(".phone-number-asking-div");
const denyPhone = document.getElementById("deny-phone");
const sendPhone = document.getElementById("send-phone");
const phoneAskingDiv = document.querySelector(".phone-border-div");
const closePhoneAsking = document.querySelector(".close-phone-asking");

const closingConfirmation = document.querySelector(".confirm-closing-border-div");
const confirmClosing = document.getElementById("confirm-closing");
const cancelClosing = document.getElementById("cancel-closing");
const closeClosingConfirmation = document.querySelector(".close-closing-confirmation");

const messageSent = document.querySelector(".message-sent-border-div");
const closeMessageSentBtns = document.querySelectorAll(".form-sent");

const invisibleSend = document.getElementById("invisible-send");
const requireCaptcha = document.getElementById('recaptcha-required-input');
let recaptchaResponse = "";
let phoneAux = "No se ha proporcionado teléfono";

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  fetch("https://formsubmit.co/ajax/andres.siri@hotmail.com", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        _subject: "Mensaje enviado desde RominaR - Romina Ramallo Asesora",
        _template: "box",
        Nombre: formName.value,
        Email: formEmail.value,
        Asunto: formTopic.value,
        Mensaje: formMessage.value,
        Teléfono: phoneAux
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  return false;
});

requireCaptcha.addEventListener('keydown', (event) => {
  event.preventDefault();
  return false;
});

async function verifyCaptcha(data) {
  recaptchaResponse = await data;
};

const checkCaptcha = () => {
  if (recaptchaResponse.length === 0) {
    requireCaptcha.required = true;
    return true;
  } else {
    requireCaptcha.required = false;
    return false;
  }
};

sendBtn.addEventListener('click', () => {
  const formIsValid = contactForm.checkValidity();    
  if (formIsValid) {
    setTimeout(() => {
      document.querySelector("body").classList.add("lock-scrolling");
      phoneNumberAsking.classList.add("phone-number-asking-div-activated");
      phoneAskingDiv.click(); //to handle effects of clicking a keyboard-activation element that does not activate the keyboard 
    }, 150);
  } else {
    invisibleSend.click();
    
  };
});

contactForm.addEventListener('keydown', (event) => {
  if (event.keyIdentifier == 'U+000A' || event.keyIdentifier == 'Enter' || event.keyCode == 13) {
      if (event.target.nodeName == 'INPUT') {
          event.preventDefault();
          sendBtn.click();
          return false;
      }
  }
}, true);

const sendMessage = () => {
  invisibleSend.click();
  phoneAskingDiv.classList.add("push-bottom");
  messageSent.classList.remove("push-bottom");
};

denyPhone.addEventListener('click', () => {
  const recaptchaNotChecked = checkCaptcha();    
  phoneInput.required = false;
  phoneInput.removeAttribute("name");
  if (recaptchaNotChecked) {
    invisibleSend.click();
  } else {
    sendMessage();
  }
});

sendPhone.addEventListener('click', () => {
  const recaptchaNotChecked = checkCaptcha();
  phoneInput.required = true;
  const formIsValid = contactForm.checkValidity();   
  if (recaptchaNotChecked || !formIsValid) {
    invisibleSend.click();
  } else {
    sendMessage();
  }
});

closePhoneAsking.addEventListener('click', ()=> {
  phoneInput.required = false;
  requireCaptcha.required = false;
  closingConfirmation.classList.remove("push-bottom");
  phoneAskingDiv.classList.add("push-bottom");
});

const cancelClosingClicked = () => {
  closingConfirmation.classList.add("push-bottom");
  phoneAskingDiv.classList.remove("push-bottom");
};
closeClosingConfirmation.addEventListener('click', cancelClosingClicked);
cancelClosing.addEventListener('click', cancelClosingClicked);

confirmClosing.addEventListener('click', () => {
  closingConfirmation.classList.add("push-bottom");
  phoneAskingDiv.classList.remove("push-bottom");
  phoneNumberAsking.classList.remove("phone-number-asking-div-activated");
  document.querySelector("body").classList.remove("lock-scrolling");  
});

closeMessageSentBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    phoneNumberAsking.classList.remove("phone-number-asking-div-activated");
    phoneAskingDiv.classList.remove("push-bottom");
    messageSent.classList.add("push-bottom");
    document.querySelector("body").classList.remove("lock-scrolling");
    formName.value = "";
    formEmail.value = "";
    formTopic.value = "";
    formMessage.value = "";
    phoneInput.value = "";
    recaptchaResponse = "";
    grecaptcha.reset();
    phoneInput.required = false;
    requireCaptcha.required = false;
  });
});


//Call functions.
burguerMenuSlide();
optionalGalleries();
handleKeyboardViewportResizing();
contactAutofill();



