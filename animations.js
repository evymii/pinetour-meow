// Animation and interaction enhancements for Pinetour2

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all animations
  initScrollAnimations();
  initParallaxEffects();
  initSmoothScrolling();
  initLoadingAnimations();
  initLucideIcons();
});

// Initialize Lucide icons
function initLucideIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Scroll-triggered animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add staggered animation for cards
        if (entry.target.classList.contains("cards")) {
          const cards = entry.target.querySelectorAll(
            ".card1, .card2, .card3, .card4"
          );
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0) scale(1)";
            }, index * 200);
          });
        }

        // Add staggered animation for pricing cards
        if (entry.target.classList.contains("card-container")) {
          const packages = entry.target.querySelectorAll(".packagebox");
          packages.forEach((pkg, index) => {
            setTimeout(() => {
              pkg.style.opacity = "1";
              pkg.style.transform = "translateY(0)";
            }, index * 300);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const elementsToAnimate = document.querySelectorAll(
    ".cards, .card-container, .heading-text, .titlecontainer3"
  );
  elementsToAnimate.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

// Parallax scrolling effects
function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".BG-container");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
  const menuItems = document.querySelectorAll(".menu-items-style");

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.textContent.toLowerCase();

      // Add click animation
      item.style.transform = "scale(0.95)";
      setTimeout(() => {
        item.style.transform = "scale(1)";
      }, 150);

      // Scroll to section (if sections exist)
      const targetSection = document.querySelector(`#${targetId}`);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Loading animations
function initLoadingAnimations() {
  // Add loading animation to images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    });

    // Set initial state
    img.style.opacity = "0";
    img.style.transform = "scale(0.8)";
    img.style.transition = "all 0.5s ease";
  });
}

// Enhanced hover effects for interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".buttonp, .buttonp1, .icon11");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const style = document.createElement("style");
  style.textContent = `
        .buttonp, .buttonp1, .icon11 {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
});

// Floating animation for map pins
function initFloatingPins() {
  const pins = document.querySelectorAll(".pin2, .pin3, .pin4, .pin5");

  pins.forEach((pin, index) => {
    pin.style.animation = `float 3s ease-in-out infinite`;
    pin.style.animationDelay = `${index * 0.5}s`;
  });
}

// Initialize floating pins when DOM is loaded
document.addEventListener("DOMContentLoaded", initFloatingPins);

// Add typing effect to hero text
function initTypingEffect() {
  const textElement = document.querySelector(".T2");
  if (textElement) {
    const text = textElement.textContent;
    textElement.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 2000);
  }
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", initTypingEffect);

// Add pulse animation to popular button
function initPopularButtonPulse() {
  const popularButton = document.querySelector(".buttons");
  if (popularButton) {
    popularButton.classList.add("animate-pulse");
  }
}

// Initialize popular button pulse
document.addEventListener("DOMContentLoaded", initPopularButtonPulse);

// Enhanced map interactions
function initMapInteractions() {
  const locationContainers = document.querySelectorAll(
    ".containerA1, .containerA2, .containerA3, .containerA4, .containerA5"
  );
  const mapPins = document.querySelectorAll(
    ".pin1, .pin2, .pin3, .pin4, .pin5"
  );

  // Add hover effects to location containers
  locationContainers.forEach((container, index) => {
    container.addEventListener("mouseenter", () => {
      // Add pulsing effect to the corresponding pin
      const pin = mapPins[index];
      if (pin) {
        pin.style.animation = "pulse 1s infinite";
      }

      // Add glow effect to the container
      container.style.boxShadow = "0 0 30px rgba(164, 209, 226, 0.6)";
    });

    container.addEventListener("mouseleave", () => {
      // Remove pulsing effect
      const pin = mapPins[index];
      if (pin) {
        pin.style.animation = "";
      }

      // Remove glow effect
      container.style.boxShadow = "";
    });
  });

  // Add click effects to map pins
  mapPins.forEach((pin, index) => {
    pin.addEventListener("click", () => {
      // Add click animation
      pin.style.transform = "scale(1.3)";
      setTimeout(() => {
        pin.style.transform = "scale(1)";
      }, 200);

      // Scroll to corresponding location container
      const container = locationContainers[index];
      if (container) {
        container.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Add temporary highlight
        container.style.backgroundColor = "rgba(164, 209, 226, 0.3)";
        setTimeout(() => {
          container.style.backgroundColor = "";
        }, 2000);
      }
    });
  });
}

// Initialize map interactions
document.addEventListener("DOMContentLoaded", initMapInteractions);

// Add tooltip functionality
function initMapTooltips() {
  const locationContainers = document.querySelectorAll(
    ".containerA1, .containerA2, .containerA3, .containerA4, .containerA5"
  );

  locationContainers.forEach((container) => {
    const locationName = container.querySelector(".text-style1").textContent;

    // Create tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "map-tooltip";
    tooltip.textContent = `Click to see ${locationName} on map`;
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      font-family: 'Inter', sans-serif;
      pointer-events: none;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
      z-index: 1000;
      white-space: nowrap;
    `;

    container.appendChild(tooltip);

    container.addEventListener("mouseenter", (e) => {
      tooltip.style.opacity = "1";
      tooltip.style.transform = "translateY(0)";
    });

    container.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translateY(10px)";
    });

    container.addEventListener("mousemove", (e) => {
      tooltip.style.left =
        e.clientX - container.getBoundingClientRect().left + 10 + "px";
      tooltip.style.top =
        e.clientY - container.getBoundingClientRect().top - 40 + "px";
    });
  });
}

// Initialize tooltips
document.addEventListener("DOMContentLoaded", initMapTooltips);
