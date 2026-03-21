// Main script - not using index.js to avoid conflicts
document.addEventListener("DOMContentLoaded", function () {
  // Header scroll effect
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");

    mobileMenuBtn.innerHTML = navLinks.classList.contains("mobile-open")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Update year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinkElements = document.querySelectorAll(".nav-link");

  navLinkElements.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // Filter functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const infoContents = document.querySelectorAll(".info-content");

  // Check URL for filter parameter
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get("filter");

  if (filterParam) {
    filterBtns.forEach((btn) => {
      const filter = btn.getAttribute("data-filter");
      if (filter === filterParam) {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to matching button
        btn.classList.add("active");

        // Hide all content
        infoContents.forEach((content) => {
          content.classList.remove("active");
        });

        // Show matching content
        const contentElement = document.getElementById(
          `${filterParam}-content`,
        );
        if (contentElement) {
          contentElement.classList.add("active");
        }
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Hide all content
      infoContents.forEach((content) => {
        content.classList.remove("active");
      });

      // Show selected content
      if (filterValue === "faq") {
        document.getElementById("faq-content").classList.add("active");
      } else if (filterValue === "drawings") {
        document.getElementById("drawings-content").classList.add("active");
      } else if (filterValue === "tips") {
        document.getElementById("tips-content").classList.add("active");
      }
    });
  });

  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector("i");

      // Toggle active class on question
      this.classList.toggle("active");

      // Toggle show class on answer
      if (answer.classList.contains("show")) {
        answer.classList.remove("show");
      } else {
        answer.classList.add("show");
      }

      // Rotate icon
      if (icon) {
        if (answer.classList.contains("show")) {
          icon.style.transform = "rotate(180deg)";
        } else {
          icon.style.transform = "rotate(0)";
        }
      }
    });
  });

  // Animation on scroll
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
});
