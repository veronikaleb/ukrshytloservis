document.addEventListener('DOMContentLoaded', () => {
  // ====== Modal Gallery ======
  const galleryImages = document.querySelectorAll('.image-container_diplomas img');
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = document.getElementById('closeBtn');

  if (galleryImages && modal && modalImage && closeBtn) {
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        modalImage.src = img.src;
        modal.classList.add('active');
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modalImage.src = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modalImage.src = '';
      }
    });
  }

  // ====== Hamburger Menu ======
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.querySelector('.menu-main');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // ====== Анімація появи елементів ======
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  const animatedElements = document.querySelectorAll(".fade-in, .feature-item");
  animatedElements.forEach(el => observer.observe(el));

  // ====== Tabs (відкриття вкладок) ======
  window.openTab = function(evt, tab) {
    const tabcontent = document.getElementsByClassName("content__inner");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tab");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // ====== Горизонтальний скрол вкладок мишкою (>800px) ======
  if (window.innerWidth > 800) {
    const scrollContainer = document.querySelector(".tabs");
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      });
    }
  }
});
