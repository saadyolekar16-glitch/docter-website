// GAWAS CLINIC - Main JavaScript File
// Mobile Navigation, Slider, Form Handling, Smooth Scroll

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== MOBILE NAVIGATION ==========
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
  
  // ========== TESTIMONIAL SLIDER (Swiper) ==========
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.testimonials-slider', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 28,
        }
      }
    });
  }
  
  // ========== APPOINTMENT FORM HANDLING ==========
  const appointmentForm = document.getElementById('appointmentForm');
  
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const name = nameInput ? nameInput.value.trim() : '';
      const phoneInput = document.getElementById('phone');
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const dateInput = document.getElementById('date');
      const date = dateInput ? dateInput.value : '';
      
      if (!name) {
        alert('Please enter your full name.');
        return;
      }
      
      if (!phone) {
        alert('Please enter your phone number.');
        return;
      }
      
      if (!date) {
        alert('Please select a preferred date.');
        return;
      }
      
      // Success message
      alert(`Thank you ${name}! Your appointment request has been submitted. We will contact you at ${phone} within 2 hours to confirm.`);
      
      // Optional: Reset form      appointmentForm.reset();
    });
  }
  
  // ========== SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (targetId === "#" || targetId === "") return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ========== HEADER SCROLL EFFECT ==========
  const nav = document.querySelector('nav');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      nav.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
  });
  
  // ========== ADD ACTIVE CLASS TO NAV ON SCROLL ==========
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // ========== LAZY LOADING IMAGES ==========
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  console.log('GAWAS CLINIC - Website loaded successfully!');
});
