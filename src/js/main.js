import "../css/main.css";

// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", !isHidden);
      mobileMenu.classList.toggle("flex", isHidden);

      // Toggle aria-expanded
      menuBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");

      // Animate hamburger to X
      const bars = menuBtn.querySelectorAll("span");
      if (isHidden) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        bars[0].style.transform = "";
        bars[1].style.opacity = "";
        bars[2].style.transform = "";
      }
    });
  }

  // Sticky header shadow on scroll
  const header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        header.classList.add("shadow-lg");
      } else {
        header.classList.remove("shadow-lg");
      }
    });
  }

  // Active nav link highlighting
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("[data-nav]");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("nav-link-active");
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Contact form submission handler
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const successMsg = document.getElementById("form-success");
      const submitBtn = contactForm.querySelector('[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      // Simulate submission
      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        if (successMsg) {
          successMsg.classList.remove("hidden");
          setTimeout(() => successMsg.classList.add("hidden"), 5000);
        }
      }, 1200);
    });
  }

  // Product image gallery (product page)
  const thumbs = document.querySelectorAll(".product-thumb");
  const mainImg = document.getElementById("main-product-img");
  if (thumbs.length && mainImg) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        mainImg.src = thumb.src;
        mainImg.alt = thumb.alt;
        thumbs.forEach((t) => t.classList.remove("ring-2", "ring-station-green"));
        thumb.classList.add("ring-2", "ring-station-green");
      });
    });
  }

  // Cafe menu tab switching
  const menuTabs = document.querySelectorAll("[data-menu-tab]");
  const menuPanels = document.querySelectorAll("[data-menu-panel]");
  if (menuTabs.length && menuPanels.length) {
    menuTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-menu-tab");

        menuTabs.forEach((t) => {
          t.classList.remove("bg-station-green", "text-white", "border-station-green");
          t.classList.add("bg-white", "text-station-green", "border-gray-300");
        });
        tab.classList.add("bg-station-green", "text-white", "border-station-green");
        tab.classList.remove("bg-white", "text-station-green", "border-gray-300");

        menuPanels.forEach((panel) => {
          panel.classList.toggle("hidden", panel.getAttribute("data-menu-panel") !== target);
        });
      });
    });
  }
});
