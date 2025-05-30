document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById("gallery");
  const leftBtn = document.querySelector(".arrow.left");
  const rightBtn = document.querySelector(".arrow.right");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  const images = Array.from(document.querySelectorAll(".gallery img"));
  let currentIndex = 0;

  leftBtn?.addEventListener("click", () => {
    gallery.scrollBy({ left: -300, behavior: "smooth" });
  });

  rightBtn?.addEventListener("click", () => {
    gallery.scrollBy({ left: 300, behavior: "smooth" });
  });

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openModal();
    });
  });

  function updateModalImage() {
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
  }

  function openModal() {
    updateModalImage();
    modal.style.display = "flex";
    startSlideShow();
    document.body.style.overflow = 'hidden';
  }

  function closeModalFunc() {
    modal.style.display = "none";
    stopSlideShow();
    document.body.style.overflow = '';
  }

  closeModal?.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFunc();
  });

  let slideShowInterval = null;
  const slideShowDelay = 3000;

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateModalImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModalImage();
  }

  function startSlideShow() {
    stopSlideShow();
    slideShowInterval = setInterval(nextImage, slideShowDelay);
  }

  function stopSlideShow() {
    if (slideShowInterval) {
      clearInterval(slideShowInterval);
      slideShowInterval = null;
    }
  }

  modalImg?.addEventListener("mouseenter", stopSlideShow);
  modalImg?.addEventListener("mouseleave", startSlideShow);
  modalImg?.addEventListener("touchstart", stopSlideShow);
  modalImg?.addEventListener("touchend", startSlideShow);

  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;

  modalImg?.addEventListener("touchstart", (e) => {
    stopSlideShow();
    touchStartX = e.changedTouches[0].screenX;
  });

  modalImg?.addEventListener("touchmove", (e) => {
    touchEndX = e.changedTouches[0].screenX;
  });

  modalImg?.addEventListener("touchend", () => {
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) > swipeThreshold) {
      distance > 0 ? prevImage() : nextImage();
    }
    startSlideShow();
    touchStartX = 0;
    touchEndX = 0;
  });
});
