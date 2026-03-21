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

  // Update year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Tab filtering functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const aboutContents = document.querySelectorAll(".about-content");

  // Check URL for tab parameter
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");

  if (tabParam) {
    filterBtns.forEach((btn) => {
      const filter = btn.getAttribute("data-filter");
      if (filter === tabParam) {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        aboutContents.forEach((content) => {
          content.classList.remove("active");
        });

        const contentElement = document.getElementById(`${tabParam}-content`);
        if (contentElement) {
          contentElement.classList.add("active");
        }
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      aboutContents.forEach((content) => {
        content.classList.remove("active");
      });

      if (filterValue === "profile") {
        document.getElementById("profile-content").classList.add("active");
      } else if (filterValue === "team") {
        document.getElementById("team-content").classList.add("active");
      } else if (filterValue === "careers") {
        document.getElementById("careers-content").classList.add("active");
      }
    });
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
