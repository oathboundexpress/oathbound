// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

function updateHeader() {
  const hero = document.querySelector('.hero') || document.querySelector('.page-hero');
  const threshold = hero ? hero.offsetHeight - 100 : 50;
  if (window.scrollY > threshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader);
updateHeader();

// ===== MOBILE NAV TOGGLE =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });
}

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Build mailto link with form data
    const subject = encodeURIComponent(`[${data.inquiry || 'Inquiry'}] from ${data.firstName} ${data.lastName}`);
    const body = encodeURIComponent(
      `Name: ${data.firstName} ${data.lastName}\n` +
      `Email: ${data.email}\n` +
      `Company: ${data.company || 'N/A'}\n` +
      `Inquiry Type: ${data.inquiry}\n\n` +
      `Message:\n${data.message}`
    );

    // Open email client
    window.location.href = `mailto:support@oathboundexpress.com?subject=${subject}&body=${body}`;

    // Show success message
    contactForm.style.display = 'none';
    if (formSuccess) {
      formSuccess.classList.add('active');
    }

    // Reset after 5 seconds
    setTimeout(() => {
      contactForm.style.display = 'block';
      contactForm.reset();
      if (formSuccess) {
        formSuccess.classList.remove('active');
      }
    }, 5000);
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
