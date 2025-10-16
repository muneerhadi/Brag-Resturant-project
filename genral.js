document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const body = document.documentElement; // Target <html> for class
  const mobileMenuIcon = document.getElementById("mobileMenuIcon");
  const navLinks = document.getElementById("navLinks");
  const loginBtn = document.getElementById("loginBtn");
  const loginPageSection = document.getElementById("login-page");
  const mainSections = document.querySelectorAll(
    "main section:not(#login-page)"
  );
  const navAnchors = document.querySelectorAll("nav ul li a");
  const dropdowns = document.querySelectorAll("nav .dropdown");

  document.getElementById("currentYear").textContent = new Date().getFullYear();

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") {
    body.classList.add("light-mode");
    themeToggleBtn.textContent = "🌙";
  } else {
    themeToggleBtn.textContent = "☀️";
  }

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      themeToggleBtn.textContent = "🌙";
    } else {
      localStorage.removeItem("theme");
      themeToggleBtn.textContent = "☀️";
    }
  });

  mobileMenuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        if (!this.parentElement.classList.contains("dropdown")) {
          navLinks.classList.remove("active");
        } else {
          const dropdownContent = this.nextElementSibling;
          if (
            dropdownContent &&
            dropdownContent.classList.contains("dropdown-content")
          ) {
          }
        }
      }

      if (loginPageSection.style.display === "block") {
        mainSections.forEach((s) => (s.style.display = "block"));
        loginPageSection.style.display = "none";
      }
    });
  });

  if (window.innerWidth <= 768) {
    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector(".dropbtn");
      button.addEventListener("click", function (event) {
        if (window.innerWidth <= 768) {
          event.preventDefault();
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove("open");
            }
          });
          dropdown.classList.toggle("open");
        }
      });
    });
  }

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mainSections.forEach((section) => (section.style.display = "none"));
    loginPageSection.style.display = "block";
    loginPageSection.scrollIntoView();
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });

  function updateActiveLink() {
    let currentSectionId = "";
    mainSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - (header.offsetHeight + 50)) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId.startsWith("menu-details-")) {
      currentSectionId = "menus";
    }

    navAnchors.forEach((anchor) => {
      anchor.classList.remove("active");

      if (
        anchor.getAttribute("href") === `#${currentSectionId}` ||
        (currentSectionId === "menus" &&
          anchor.getAttribute("href") === "#menus") ||
        (currentSectionId.startsWith("locations-") &&
          anchor.getAttribute("href") === "#locations")
      ) {
        anchor.classList.add("active");

        if (anchor.closest(".dropdown-content")) {
          anchor
            .closest(".dropdown")
            .querySelector(".dropbtn")
            .classList.add("active");
        } else if (anchor.classList.contains("dropbtn")) {
          navAnchors.forEach((a) => {
            if (a !== anchor && !a.closest(".dropdown-content"))
              a.classList.remove("active");
          });
          anchor.classList.add("active");
        }
      }
    });
    if (!currentSectionId && navAnchors.length > 0) {
      const homeLink = document.querySelector('nav ul li a[href="#home"]');
      if (homeLink) homeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  document.querySelectorAll(".menu-details-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

const spinningImage = document.getElementById("hero-image1");
const scrollPositionElement = document.getElementById("scroll-position");
const rotationElement = document.getElementById("rotation-degrees");

let rotation = 0;
const rotationSpeed = 0.5;

window.addEventListener("scroll", function () {
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  const scrollDirection = scrollPosition > lastScrollPosition ? 1 : -1;
  rotation += scrollDirection * rotationSpeed;

  spinningImage.style.transform = `rotate(${rotation}deg)`;

  scrollPositionElement.textContent = Math.floor(scrollPosition);
  rotationElement.textContent = Math.floor(rotation % 360);

  lastScrollPosition = scrollPosition;
});
let lastScrollPosition = 0;

const image = document.getElementById("location_img");
const statusElement = document.getElementById("status");
let hasSpun = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasSpun) {
        statusElement.textContent = "";
        image.style.transform = "rotate(360deg)";
        hasSpun = true;

        observer.unobserve(image);
      } else if (!entry.isIntersecting) {
        statusElement.textContent = "";
      }
    });
  },
  {
    threshold: 0.5,
  }
);
observer.observe(image);
