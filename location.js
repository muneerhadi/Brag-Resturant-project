const hamburgerButton = document.getElementById("hamburger-menu");
const mainNav = document.getElementById("main-nav").querySelector("ul"); // Target the UL inside nav
const themeToggleButton = document.getElementById("theme-toggle");

hamburgerButton.addEventListener("click", () => {
  const isExpanded = mainNav.classList.toggle("active");
  hamburgerButton.setAttribute("aria-expanded", isExpanded);
});

// Theme toggle
themeToggleButton.addEventListener("click", () => {
  document.html.classList.toggle("light-mode");
  // Update icon based on theme
  if (document.html.classList.contains("light-mode")) {
    themeToggleButton.textContent = "☀️"; // Sun icon for light mode
    themeToggleButton.setAttribute("aria-label", "Switch to dark mode");
  } else {
    themeToggleButton.textContent = "🌙"; // Moon icon for dark mode
    themeToggleButton.setAttribute("aria-label", "Switch to light mode");
  }
  // Optional: Save preference in localStorage (but prompt said prefer not to)
});

// Set initial theme icon (if a preference was saved and loaded)
// For now, default to dark mode icon
if (document.html.classList.contains("light-mode")) {
  themeToggleButton.textContent = "☀️";
} else {
  themeToggleButton.textContent = "🌙";
}

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// For dropdowns in mobile (optional: close others when one opens)
const dropdowns = document.querySelectorAll(".dropdown > a");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", function (e) {
    if (
      window.innerWidth < 901 &&
      this.nextElementSibling.classList.contains("dropdown-content")
    ) {
      // e.preventDefault(); // Prevent link navigation if you only want to toggle
      this.nextElementSibling.style.display =
        this.nextElementSibling.style.display === "block" ? "none" : "block";
    }
  });
});
