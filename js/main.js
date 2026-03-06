'use strict';

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// Trigger hero animations on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-content .reveal-up').forEach(el => {
    el.classList.add('visible');
  });
});

// Sticky header shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = mobileNav.querySelectorAll('a');

function setMobileNavState(open) {
  mobileNav.classList.toggle('open', open);
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', open);
  mobileNav.setAttribute('aria-hidden', !open);
  mobileNavLinks.forEach(a => {
    if (open) { a.removeAttribute('tabindex'); } else { a.setAttribute('tabindex', '-1'); }
  });
}

navToggle.addEventListener('click', () => {
  setMobileNavState(!mobileNav.classList.contains('open'));
});

// Close mobile nav on link click
mobileNavLinks.forEach(a => {
  a.addEventListener('click', () => setMobileNavState(false));
});

// FormSubmit.co AJAX submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm) {
  // Show success message if redirected back with ?sent=true
  if (window.location.search.includes('sent=true')) {
    contactForm.style.display = 'none';
    formSuccess.classList.add('visible');
    formSuccess.removeAttribute('aria-hidden');
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.style.display = 'none';
        formSuccess.classList.add('visible');
        formSuccess.removeAttribute('aria-hidden');
      } else {
        btn.textContent = 'Request Appointment';
        btn.disabled = false;
        alert('Something went wrong. Please call us at (714) 621-0327.');
      }
    } catch {
      btn.textContent = 'Request Appointment';
      btn.disabled = false;
      alert('Something went wrong. Please call us at (714) 621-0327.');
    }
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
