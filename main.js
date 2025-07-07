// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Add rotation animation to theme toggle
  themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'scale(1) rotate(0deg)';
  }, 200);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in animation to section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Add slide-in animations to cards
  document.querySelectorAll('.about-card, .skill-category, .project-card, .contact-item').forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Add slide-in animations to form
  document.querySelector('.contact-form')?.classList.add('slide-in-right');
  observer.observe(document.querySelector('.contact-form'));

  // Add slide-in animations to contact info
  document.querySelector('.contact-info')?.classList.add('slide-in-left');
  observer.observe(document.querySelector('.contact-info'));
});

// Animated counter for stats
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Add typing effect to hero title
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = '';
  
  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Initialize typing effect on page load
window.addEventListener('load', () => {
  const heroName = document.querySelector('.title-name');
  if (heroName) {
    const originalText = heroName.textContent;
    setTimeout(() => {
      typeWriter(heroName, originalText, 150);
    }, 1000);
  }
});

// Add particle effect on mouse move
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.98) {
    createParticle(e.clientX, e.clientY);
  }
});

const createParticle = (x, y) => {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.width = '4px';
  particle.style.height = '4px';
  particle.style.background = 'var(--primary-color)';
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9999';
  particle.style.opacity = '0.7';
  
  document.body.appendChild(particle);
  
  const animation = particle.animate([
    { transform: 'translate(0, 0) scale(1)', opacity: 0.7 },
    { transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`, opacity: 0 }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });
  
  animation.onfinish = () => {
    particle.remove();
  };
};

// Add scroll progress indicator
const createScrollProgress = () => {
  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.width = '0%';
  progressBar.style.height = '3px';
  progressBar.style.background = 'var(--gradient-primary)';
  progressBar.style.zIndex = '10000';
  progressBar.style.transition = 'width 0.1s ease';
  
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
};

createScrollProgress();

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = `
  body:not(.loaded) {
    overflow: hidden;
  }
  
  body:not(.loaded)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  body:not(.loaded)::after {
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 3px solid var(--border-color);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 10001;
  }
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);