const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');
const form = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
const siteHeader = document.querySelector('.site-header');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}


if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formStatus) {
      formStatus.textContent = 'Merci ! Je reviendrai vers vous rapidement.';
    }
    form.reset();
  });
}

let ticking = false;
const handleScroll = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  if (siteHeader) {
    siteHeader.classList.toggle('scrolled', scrollY > 10);
  }
  ticking = false;
};

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  },
  { passive: true }
);

handleScroll();

const observeItems = document.querySelectorAll(
  '.hero, .card, .timeline-card, .skills-grid article, .project-card, .contact-grid > *, .overview-card, .highlight-grid article'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

observeItems.forEach((item) => {
  item.classList.add('reveal');
  observer.observe(item);
});
