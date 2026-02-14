// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Form submission
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  status.textContent = "Sending your message...";
  status.style.color = "var(--accent-primary)";

  // Simulate form submission
  setTimeout(() => {
    status.textContent =
      "Thank you! Your message has been sent. We'll respond within 24 hours.";
    form.reset();

    // Reset status after 5 seconds
    setTimeout(() => {
      status.textContent = "";
    }, 5000);
  }, 1500);
});

// Copy email to clipboard
document.getElementById("copyEmail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("info@structura.com");
    const btn = document.getElementById("copyEmail");
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
    btn.style.color = "var(--accent-primary)";

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.color = "";
    }, 2000);
  } catch (err) {
    alert("Could not copy. Email: info@structura.com");
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  mobileMenuBtn.innerHTML =
    navLinks.style.display === "flex"
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
});

// Update year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none";
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

const floating = document.querySelector(".floating-social");
const anchor = document.getElementById("social-anchor");

window.addEventListener("scroll", () => {
  const anchorRect = anchor.getBoundingClientRect();
  const floatingHeight = floating.offsetHeight;

  // Lock horizontal position
  floating.style.left = anchorRect.left + "px";

  if (anchorRect.top <= window.innerHeight - floatingHeight - 20) {
    // Attach to footer
    floating.style.position = "absolute";
    floating.style.top =
      window.scrollY + anchorRect.top - floatingHeight + "px";
    floating.style.bottom = "auto";
  } else {
    // Float
    floating.style.position = "fixed";
    floating.style.top = "auto";
    floating.style.bottom = "20px";
  }
});
