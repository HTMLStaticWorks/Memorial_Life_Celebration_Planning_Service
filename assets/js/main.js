/**
 * EVERMORE - Premium Memorial & Life Celebration
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // === Theme System ===
  const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  // === RTL System ===
  const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle');
  
  const currentDir = localStorage.getItem('dir');
  if (currentDir) {
    document.documentElement.setAttribute('dir', currentDir);
  }

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      let dir = document.documentElement.getAttribute('dir');
      let newDir = dir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  });

  // === Mobile Navigation ===
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-list .nav-link');
  const closeBtn = document.querySelector('.mobile-close-btn');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const spans = hamburger.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'translateY(9px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // === Navbar Scroll Effect ===
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // === Modal System ===
  const ctaButtons = document.querySelectorAll('.open-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  
  if (modalOverlay) {
    ctaButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === Active Nav Link State ===
  const currentPath = window.location.pathname;
  const navLinksList = document.querySelectorAll('.nav-link');
  
  navLinksList.forEach(link => {
    // Only check internal links
    if (!link.href || link.href.includes('#')) return;
    
    try {
      const linkPath = new URL(link.href).pathname;
      
      // Match exactly, or match / and /index.html as equivalent
      if (currentPath === linkPath || 
         (currentPath === '/' && linkPath.endsWith('/index.html')) || 
         (currentPath.endsWith('/index.html') && linkPath === '/')) {
         
        link.classList.add('active');
        
        // If it's inside a dropdown, also highlight the parent dropdown toggle
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          const parentLink = parentDropdown.querySelector('.has-dropdown');
          if (parentLink) parentLink.classList.add('active');
        }
      }
    } catch (e) {
      // Ignore invalid URLs
    }
  });

  // === Form Validation ===
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation simulated
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        form.innerHTML = '<div style="text-align: center; padding: 2rem;"><h3 style="font-family: var(--font-display); margin-bottom: 1rem;">Thank you.</h3><p>Your enquiry has been received. Our team will review your message and respond as soon as possible.</p></div>';
      }, 1500);
    });
  });

  // === Accordion System ===
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // Close others
      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });
      item.classList.toggle('active');
    });
  });

  // === Scroll Reveal Animations ===
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // === Back to Top ===
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
