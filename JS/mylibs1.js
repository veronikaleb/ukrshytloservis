// ===== Accordion Class =====
class ItcAccordion {
  constructor(target, config) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    const defaultConfig = { alwaysOpen: true, duration: 350 };
    this._config = Object.assign(defaultConfig, config);
    this.addEventListener();
  }

  addEventListener() {
    this._el.addEventListener('click', (e) => {
      const elHeader = e.target.closest('.accordion__header');
      if (!elHeader) return;
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector('.accordion__item_show');
        if (elOpenItem && elOpenItem !== elHeader.parentElement) {
          this.toggle(elOpenItem);
        }
      }
      this.toggle(elHeader.parentElement);
    });
  }
  show(el) {
    const elBody = el.querySelector('.accordion__body');
    if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) return;
    elBody.style.display = 'block';
    const height = elBody.offsetHeight;
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.add('collapsing');
    el.classList.add('accordion__item_slidedown');
    elBody.offsetHeight;
    elBody.style.height = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      el.classList.remove('accordion__item_slidedown');
      elBody.classList.add('collapse');
      el.classList.add('accordion__item_show');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }

  hide(el) {
    const elBody = el.querySelector('.accordion__body');
    if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) return;
    elBody.style.height = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style.display = 'block';
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.remove('collapse');
    el.classList.remove('accordion__item_show');
    elBody.classList.add('collapsing');
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      elBody.classList.add('collapse');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  toggle(el) {
    el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
  }
}
// ===== DOMContentLoaded Event =====
document.addEventListener('DOMContentLoaded', () => {
  renderNews(3);

  // ===== Modal Gallery =====
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
  // ===== Hamburger Menu =====
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.querySelector('.menu-main');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // ===== Scroll Animation =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  const animatedElements = document.querySelectorAll(".fade-in, .feature-item");
  animatedElements.forEach(el => observer.observe(el));

  // ===== Tabs =====
  window.openTab = function (evt, tab) {
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
  };

  // ===== Horizontal Scroll on Tabs =====
  if (window.innerWidth > 800) {
    const scrollContainer = document.querySelector(".tabs");
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      });
    }
  }
  // ===== Init Accordion if present =====
  const accordion = document.querySelector('.accordion');
  if (accordion) {
    new ItcAccordion(accordion, {
      alwaysOpen: false
    });
  }

  // ===== FAQ Toggle =====
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(q => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      document.querySelectorAll(".faq-answer").forEach(a => {
        if (a !== answer) a.classList.remove("open");
      });
      answer.classList.toggle("open");
    });
  });
});

// ===== Scroll To Top Button =====
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.scrollToTop');
  if (!btn) return;
  if (window.scrollY > window.innerHeight / 3) {
    btn.classList.add('showScrollTop');
  } else {
    btn.classList.remove('showScrollTop');
  }
});
