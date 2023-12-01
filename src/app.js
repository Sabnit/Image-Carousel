class Carousel {
  constructor(container, transition = DEFAULT_TRANSITION, hold = DEFAULT_HOLD) {
    this.container = container;
    this.slides = Array.from(container.querySelectorAll(".carousel-img"));
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.transition = transition;
    this.hold = hold;
    this.imageWidth = DEFAULT_IMAGE_WIDTH;
    this.dotsContainer = document.querySelector(".carousel-controller");

    this.init();
    this.setupDots();
    this.controlHandler();
  }

  init() {
    this.designCarousel();
    this.startCarousel();
  }

  designCarousel() {
    this.slides.forEach((slide) => {
      slide.style.transition = `transform ${this.transition}ms`;
    });
    this.imageWidth = this.slides[0].offsetWidth;
    this.container.style.width = `${this.totalSlides * this.imageWidth}px`;
  }

  startCarousel() {
    setInterval(() => {
      this.moveNext();
    }, this.hold);
  }

  moveNext() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.transitionSlide();
    this.updateDots();
  }

  movePrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.transitionSlide();
    this.updateDots();
  }

  transitionSlide() {
    const offset = -1 * this.currentIndex * this.imageWidth;
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
    this.updateDots();
  }

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

  controlHandler() {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    leftArrow.addEventListener("click", () => {
      this.movePrevious();
    });

    rightArrow.addEventListener("click", () => {
      this.moveNext();
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.transitionSlide();
    this.updateDots();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-wrapper");
  const carousel = new Carousel(carouselContainer);
});
