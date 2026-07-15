// ==========================================================================
// THEME TOGGLE (persists for this session only)
// ==========================================================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});

// ==========================================================================
// MOBILE NAV
// ==========================================================================
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});
// ==========================================================================
// SCROLL TO TOP
// ==========================================================================
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ==========================================================================
// SCROLLSPY — highlight active nav link
// ==========================================================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('[data-nav]');

function onScrollSpy() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  // nav shadow on scroll
  nav.style.boxShadow = window.scrollY > 20 ? '0 8px 24px -16px rgba(0,0,0,0.25)' : 'none';

  // scroll-to-top visibility
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', onScrollSpy);
onScrollSpy();


// ==========================================================================
// TYPED ROLE TEXT
// ==========================================================================
const roles = [
  'Computer Science Undergraduate',
  'Aspiring Software Developer',
  'Java & Python Learner',
  'Open to Internships'
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ==========================================================================
// SCROLL REVEAL
// ==========================================================================
const revealTargets = document.querySelectorAll(
  '.about-copy, .about-readouts, .skill-card, .project-card, .timeline-item, .edu-card, .cert-badge, .contact-links, .contact-form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ==========================================================================
// SKILL METER FILL ON VIEW
// ==========================================================================
const meterFills = document.querySelectorAll('.meter-fill');
const meterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('filled');
      meterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
meterFills.forEach(el => meterObserver.observe(el));

// ==========================================================================
// ANIMATED READOUT COUNTERS
// ==========================================================================
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.getAttribute('data-count'));
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isDecimal ? target.toFixed(1) : target;
    }
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ==========================================================================
// CONTACT FORM (client-side only — opens mail client with prefilled content)
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:sahithivenkatesh15@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = 'Opening your email client…';
  contactForm.reset();
});