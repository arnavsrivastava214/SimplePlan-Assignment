  // ✅ Button hover lift effect
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
      btn.addEventListener('mouseenter', function () {
          this.style.transform = 'translateY(-2px) scale(1.03)';
          this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          this.style.boxShadow = '0 8px 20px rgba(65,105,225,0.3)';
      });
      btn.addEventListener('mouseleave', function () {
          this.style.transform = 'translateY(0) scale(1)';
          this.style.boxShadow = 'none';
      });
  });

  // ============================================================
  // 🌊 FLOATING BLOBS WITH PARALLAX MOTION
  // ============================================================
  window.addEventListener('load', () => {
      const coralBlob = document.querySelector('.coral-blob');
      const greenBlob = document.querySelector('.green-blob');

      if (coralBlob && greenBlob) {
          coralBlob.style.animation = 'float 6s ease-in-out infinite';
          greenBlob.style.animation = 'float 8s ease-in-out infinite';
      }
  });

  const baseStyle = document.createElement('style');
  baseStyle.textContent = `
@keyframes float {
0%, 100% { transform: translateY(0px) rotate(0deg); }
50% { transform: translateY(-20px) rotate(2deg); }
}
@keyframes pulseChat {
0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(65,105,225,0.5); }
70% { transform: scale(1.1); box-shadow: 0 0 0 20px rgba(65,105,225,0); }
100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(65,105,225,0); }
}
@keyframes popLike {
0% { transform: scale(1); }
50% { transform: scale(1.3); }
100% { transform: scale(1); }
}
`;
  document.head.appendChild(baseStyle);

  // ============================================================
  // 💬 CHAT ICON PULSE ON CLICK
  // ============================================================
  const chatIcon = document.querySelector('.chat-icon');
  if (chatIcon) {
      chatIcon.addEventListener('click', () => {
          chatIcon.style.animation = 'pulseChat 0.7s ease';
          alert('Chat feature coming soon!');
          setTimeout(() => chatIcon.style.animation = '', 700);
      });
  }

  // ============================================================
  // 📦 CATEGORY CARD REVEAL
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
      const categoryCards = document.querySelectorAll('.category-card');

      categoryCards.forEach(card => {
          card.addEventListener('click', function () {
              categoryCards.forEach(c => c.classList.remove('active'));
              this.classList.add('active');
          });
      });

      document.documentElement.style.scrollBehavior = 'smooth';

      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
              }
          });
      }, observerOptions);

      categoryCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(card);
      });
  });

  // ============================================================
  // 🧭 FIXED DROPDOWN + HAMBURGER MENU
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
      const categoriesToggle = document.getElementById('categories-toggle');
      const categoriesDropdown = document.getElementById('categories-dropdown');
      const hamburgerToggle = document.getElementById('hamburger-toggle');
      const navLinks = document.getElementById('nav-links');

      if (categoriesToggle && categoriesDropdown) {
          categoriesToggle.addEventListener('click', (event) => {
              event.stopPropagation();
              const isNowOpen = categoriesDropdown.classList.toggle('show-dropdown');
              const arrow = categoriesToggle.querySelector('.arrow');
              arrow.textContent = isNowOpen ? 'v' : '^';
          });

          window.addEventListener('click', (event) => {
              if (!categoriesToggle.contains(event.target) && !categoriesDropdown.contains(event.target)) {
                  categoriesDropdown.classList.remove('show-dropdown');
                  categoriesToggle.querySelector('.arrow').textContent = '^';
              }
          });
      }

      if (hamburgerToggle && navLinks) {
          hamburgerToggle.addEventListener('click', () => {
              hamburgerToggle.classList.toggle('open');
              navLinks.classList.toggle('open');
              if (categoriesDropdown) {
                  categoriesDropdown.classList.remove('show-dropdown');
              }
          });
      }
  });

  // ============================================================
  // 🧍‍♂️ FIXED INSTRUCTOR CAROUSEL FUNCTIONALITY
  // ============================================================
  class InstructorCarousel {
      constructor() {
          this.sliderTrack = document.getElementById('sliderTrack');
          this.prevButton = document.getElementById('prevButton');
          this.nextButton = document.getElementById('nextButton');
          this.currentIndex = 0;
          this.itemsPerView = this.calculateItemsPerView();
          this.totalCards = document.querySelectorAll('.instructor-card').length;
          this.maxIndex = Math.max(0, this.totalCards - this.itemsPerView);
          this.initialize();
      }

      calculateItemsPerView() {
          const width = window.innerWidth;
          if (width >= 992) return 4;
          if (width >= 768) return 3;
          if (width >= 576) return 2;
          return 1;
      }

      initialize() {
          if (!this.sliderTrack) return;
          if (this.prevButton) this.prevButton.addEventListener('click', () => this.navigatePrevious());
          if (this.nextButton) this.nextButton.addEventListener('click', () => this.navigateNext());
          window.addEventListener('resize', () => this.handleResize());
          this.updateCarousel();
      }

      navigatePrevious() {
          if (this.currentIndex > 0) {
              this.currentIndex--;
              this.updateCarousel();
          }
      }

      navigateNext() {
          if (this.currentIndex < this.maxIndex) {
              this.currentIndex++;
              this.updateCarousel();
          }
      }

      updateCarousel() {
          const cardWidth = 100 / this.itemsPerView;
          const translateValue = -(this.currentIndex * cardWidth);
          this.sliderTrack.style.transform = `translateX(${translateValue}%)`;
          this.sliderTrack.style.transition = 'transform 0.6s ease-in-out';

          if (this.prevButton) this.prevButton.disabled = this.currentIndex === 0;
          if (this.nextButton) this.nextButton.disabled = this.currentIndex >= this.maxIndex;
      }

      handleResize() {
          const newItemsPerView = this.calculateItemsPerView();
          if (newItemsPerView !== this.itemsPerView) {
              this.itemsPerView = newItemsPerView;
              this.maxIndex = Math.max(0, this.totalCards - this.itemsPerView);
              if (this.currentIndex > this.maxIndex) this.currentIndex = this.maxIndex;
              this.updateCarousel();
          }
      }
  }

  document.addEventListener('DOMContentLoaded', () => {
      new InstructorCarousel();
  });

  // ============================================================
  // 🎥 TESTIMONIAL DRAG SCROLL
  // ============================================================
  const container = document.querySelector('.testimonials-container');
  if (container) {
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener('mousedown', (e) => {
          isDown = true;
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => isDown = false);
      container.addEventListener('mouseup', () => isDown = false);
      container.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - container.offsetLeft;
          const walk = (x - startX) * 1;
          container.scrollLeft = scrollLeft - walk;
      });
  }

  // ============================================================
  // ❤️ LIKE BUTTON POP ANIMATION
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
      const likeButtons = document.querySelectorAll('.like-count');
      likeButtons.forEach(button => {
          button.addEventListener('click', function () {
              const icon = this.querySelector('.like-icon');
              const count = this.querySelector('span');
              const currentCount = parseInt(count.textContent);
              if (icon.classList.contains('far')) {
                  icon.classList.replace('far', 'fas');
                  icon.style.color = '#ff4757';
                  count.textContent = currentCount + 1;
                  this.style.animation = 'popLike 0.4s ease';
                  setTimeout(() => this.style.animation = '', 400);
              } else {
                  icon.classList.replace('fas', 'far');
                  icon.style.color = '#7f8c8d';
                  count.textContent = Math.max(0, currentCount - 1);
              }
          });
      });
  });

  // ============================================================
  // 🔼 SCROLL TO TOP BUTTON
  // ============================================================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const emailInput = document.getElementById('emailInput');

  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
  });

  scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================================
  // ✉️ EMAIL FORM VALIDATION
  // ============================================================
  getStartedBtn.addEventListener('click', () => {
      const email = emailInput.value.trim();
      if (email === '') return alert('Please enter your email address');
      const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailPattern.test(email)) return alert('Please enter a valid email address');
      alert(`Thank you for joining! We'll send updates to ${email}`);
      emailInput.value = '';
  });

  emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') getStartedBtn.click();
  });

  // ============================================================
  // 🖼️ IMAGE REVEAL & DOT FLOAT EFFECTS
  // ============================================================
  const images = document.querySelectorAll('img');
  const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.filter = 'blur(0)';
              entry.target.style.opacity = '1';
          }
      });
  }, { threshold: 0.15 });

  images.forEach(img => {
      img.style.filter = 'blur(10px)';
      img.style.opacity = '0.7';
      img.style.transition = 'filter 1s ease, opacity 1s ease';
      imgObserver.observe(img);
  });

  document.querySelectorAll('.coral-dot-1, .coral-dot-2, .coral-dot-3').forEach((dot, i) => {
      dot.animate([
          { transform: 'translate(0,0)' },
          { transform: `translate(${8 * (i + 1)}px, ${-6 * (i + 1)}px)` },
          { transform: 'translate(0,0)' }
      ], { duration: 4000 + i * 800, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
  });


  // ============================================================
  // 🪄 FINAL FIXED + PERFECTLY ANIMATED DROPDOWN MENU
  // ============================================================

  document.addEventListener('DOMContentLoaded', () => {
      const categoriesToggle = document.getElementById('categories-toggle');
      const categoriesDropdown = document.getElementById('categories-dropdown');

      if (!categoriesToggle || !categoriesDropdown) return;

      // Inject smooth animation styles
      const style = document.createElement('style');
      style.textContent = `
.dropdown-full-width {
max-height: 0;
opacity: 0;
transform: translateY(-10px);
overflow: hidden;
pointer-events: none;
transition:
  max-height 0.4s ease,
  opacity 0.35s ease,
  transform 0.4s ease;
}

.dropdown-full-width.opening,
.dropdown-full-width.closing {
pointer-events: none;
}

.dropdown-full-width.open {
pointer-events: auto;
opacity: 1;
transform: translateY(0);
}

@keyframes fadeSlideIn {
from { opacity: 0; transform: translateY(8px); }
to { opacity: 1; transform: translateY(0); }
}

.dropdown-full-width.open a {
animation: fadeSlideIn 0.3s ease forwards;
}
`;
      document.head.appendChild(style);

      // --- Dropdown Animation Logic ---
      let isOpen = false;
      let isTransitioning = false;

      categoriesToggle.addEventListener('click', (event) => {
          event.stopPropagation();
          if (isTransitioning) return;

          const arrow = categoriesToggle.querySelector('.arrow');
          isTransitioning = true;

          if (!isOpen) {
              // 🔽 OPEN DROPDOWN
              categoriesDropdown.classList.add('opening');
              categoriesDropdown.style.maxHeight = categoriesDropdown.scrollHeight + 'px';
              categoriesDropdown.classList.add('open');
              if (arrow) arrow.textContent = 'v';

              setTimeout(() => {
                  categoriesDropdown.classList.remove('opening');
                  isOpen = true;
                  isTransitioning = false;
              }, 400); // match transition duration
          } else {
              // 🔼 CLOSE DROPDOWN
              categoriesDropdown.classList.add('closing');
              categoriesDropdown.style.maxHeight = categoriesDropdown.scrollHeight + 'px'; // lock height
              void categoriesDropdown.offsetHeight; // force reflow
              categoriesDropdown.style.maxHeight = '0';
              categoriesDropdown.classList.remove('open');
              if (arrow) arrow.textContent = '^';

              setTimeout(() => {
                  categoriesDropdown.classList.remove('closing');
                  isOpen = false;
                  isTransitioning = false;
              }, 400); // match transition duration
          }
      });

      // Close dropdown if clicking outside
      window.addEventListener('click', (event) => {
          if (
              !categoriesToggle.contains(event.target) &&
              !categoriesDropdown.contains(event.target) &&
              isOpen &&
              !isTransitioning
          ) {
              const arrow = categoriesToggle.querySelector('.arrow');
              categoriesDropdown.classList.add('closing');
              categoriesDropdown.style.maxHeight = categoriesDropdown.scrollHeight + 'px';
              void categoriesDropdown.offsetHeight;
              categoriesDropdown.style.maxHeight = '0';
              categoriesDropdown.classList.remove('open');
              if (arrow) arrow.textContent = '^';
              setTimeout(() => {
                  categoriesDropdown.classList.remove('closing');
                  isOpen = false;
              }, 400);
          }
      });
  });
