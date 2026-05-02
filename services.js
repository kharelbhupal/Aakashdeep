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

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      } else {
        navLinks.style.display = "flex";
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      }
    });
  }

  // Update year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Tab filtering functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const servicesContents = document.querySelectorAll(".services-content");

  // Check URL for tab parameter
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");

  if (tabParam) {
    filterBtns.forEach((btn) => {
      const filter = btn.getAttribute("data-filter");
      if (filter === tabParam) {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        servicesContents.forEach((content) => {
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

      servicesContents.forEach((content) => {
        content.classList.remove("active");
      });

      if (filterValue === "residential") {
        document.getElementById("residential-content").classList.add("active");
      } else if (filterValue === "commercial") {
        document.getElementById("commercial-content").classList.add("active");
      } else if (filterValue === "industrial") {
        document.getElementById("industrial-content").classList.add("active");
      } else if (filterValue === "infrastructure") {
        document
          .getElementById("infrastructure-content")
          .classList.add("active");
      } else if (filterValue === "vastu") {
        document.getElementById("vastu-content").classList.add("active");
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
