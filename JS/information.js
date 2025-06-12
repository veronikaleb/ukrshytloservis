window.addEventListener('DOMContentLoaded', () => {
  // 1. Поява секції info (якщо є)
  const section = document.getElementById('info');
  if (section) {
    section.classList.add('visible');
  }

  // 2. Лічильники з анімацією
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const showPlus = counter.getAttribute('data-plus') === 'true';
    let current = 0;

    const updateCount = () => {
      const increment = target / 100;
      if (current < target) {
        current = Math.min(current + increment, target);
        counter.innerText = Math.ceil(current);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + (showPlus ? '+' : '');
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.6 });

    observer.observe(counter);
  });

  // 3. Слайдер
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const track = document.getElementById('sliderTrack');

  function updateSlider() {
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }

  function nextSlide() {
    if (slides.length > 0) {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }
  }

  function prevSlide() {
    if (slides.length > 0) {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    }
  }

  setInterval(nextSlide, 3000);

  // Swipe підтримка слайдера
  let startX = 0;
  if (track) {
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
      let endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextSlide();
      if (endX - startX > 50) prevSlide();
    });
  }

  // 4. Поява елементів timeline при скролі + кнопка "Вгору"
  const items = document.querySelectorAll('.timeline ul li');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function onScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    items.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerBottom) {
        item.classList.add('visible');
      }
    });

    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
