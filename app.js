// Default values for transition and hold times
const DEFAULT_TRANSITION = 500;
const DEFAULT_HOLD = 1000;

// Carousel class to manage the image carousel
class Carousel {
  constructor(container, transition = DEFAULT_TRANSITION, hold = DEFAULT_HOLD) {
    // Store carousel elements and settings
    this.container = container;
    this.slides = Array.from(container.querySelectorAll(".carousel-img"));
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.transition = transition;
    this.hold = hold;
    this.dotsContainer = document.querySelector(".carousel-controller");

    this.init();
    this.setupDots();
    this.controlHandler();
  }

  init() {
    this.setupSlideTransition();
    this.startAutomaticSlide();
  }

  setupSlideTransition() {
    this.slides.forEach((slide) => {
      slide.style.transition = `transform ${this.transition}ms`;
    });

    this.container.style.width = `${
      this.totalSlides * this.slides[0].offsetWidth
    }px`;
  }

  startAutomaticSlide() {
    setInterval(() => {
      this.moveToNextImage();
    }, this.hold);
  }

  moveToNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.slideTransition();
    this.updateNavigationDots();
  }

  moveToPreviousImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.slideTransition();
    this.updateNavigationDots();
  }

  slideTransition() {
    const offset = -1 * this.currentIndex * this.slides[0].offsetWidth;
    this.container.style.transform = `translateX(${offset}px)`;
  }

  setupDots() {
    const dotController = document.querySelector(".dot-controller");

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("controller", "dot");
      dot.dataset.index = i;
      dot.addEventListener("click", () => {
        this.goToSlide(i);
      });
      dotController.appendChild(dot);
    }
    this.updateNavigationDots();
  }

  // Update navigation dots to highlight the current slide
  updateNavigationDots() {
    const dots = this.dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Handle click events for left and right arrows
  controlHandler() {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    leftArrow.addEventListener("click", () => {
      this.moveToPreviousImage();
    });

    rightArrow.addEventListener("click", () => {
      this.moveToNextImage();
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.slideTransition();
    this.updateNavigationDots();
  }
}

// Initializes the carousel after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-wrapper");
  const carousel = new Carousel(carouselContainer);
});
