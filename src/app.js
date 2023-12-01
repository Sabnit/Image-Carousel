class Carousel {
  /**
   * @param {HTMLElement} container - The main container element for the carousel.
   * @param {number} [transition=DEFAULT_TRANSITION] - Transition duration between slides (in milliseconds).
   * @param {number} [hold=DEFAULT_HOLD] - Time interval between slide transitions (in milliseconds).
   */

  constructor(container, transition = DEFAULT_TRANSITION, hold = DEFAULT_HOLD) {
    this.container = container;
    this.slides = Array.from(container.querySelectorAll(".carousel-img"));
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.transition = transition;
    this.hold = hold;
    this.imageWidth = DEFAULT_IMAGE_WIDTH;
    this.dotsContainer = document.querySelector(".carousel-controller");

    // Initialize the carousel
    this.init();
    this.setupDots();
    this.controlHandler();
  }

  /**
   * Initializes the carousel.
   */
  init() {
    this.designCarousel();
    this.startCarousel();
  }

  /**
   * Sets up the initial carousel layout and transitions.
   */
  designCarousel() {
    // Apply transition to slides
    this.slides.forEach((slide) => {
      slide.style.transition = `transform ${this.transition}ms`;
    });

    // Set container width to hold all slides
    this.imageWidth = this.slides[0].offsetWidth;
    this.container.style.width = `${this.totalSlides * this.imageWidth}px`;
  }

  /**
   * Starts the carousel automatic sliding.
   */
  startCarousel() {
    setInterval(() => {
      this.moveNext();
    }, this.hold);
  }

  /**
   * Moves to the next slide in the carousel.
   */
  moveNext() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.transitionSlide();
    this.updateDots();
  }

  /**
   * Moves to the previous slide in the carousel.
   */
  movePrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.transitionSlide();
    this.updateDots();
  }

  /**
   * Applies transition to slide according to current index.
   */
  transitionSlide() {
    const offset = -1 * this.currentIndex * this.imageWidth;
    this.container.style.transform = `translateX(${offset}px)`;
  }

  /**
   * Sets up the dot navigation for slides.
   */
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
    this.updateDots();
  }

  /**
   * Updates the active dot corresponding to the current slide.
   */
  updateDots() {
    const dots = this.dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  /**
   * Handles click events for left and right arrows.
   */
  controlHandler() {
    const controller = {
      leftArrow: document.querySelector(".left-arrow"),
      rightArrow: document.querySelector(".right-arrow"),
    };

    controller.leftArrow.addEventListener("click", () => {
      this.movePrevious();
    });

    controller.rightArrow.addEventListener("click", () => {
      this.moveNext();
    });
  }

  /**
   * Navigates directly to a specific slide by its index.
   * @param {number} index - The index of the slide to navigate to.
   */
  goToSlide(index) {
    this.currentIndex = index;
    this.transitionSlide();
    this.updateDots();
  }
}

// Initialize the carousel when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-wrapper");
  const carousel = new Carousel(carouselContainer);
});
