// ===== Theme toggle =====
const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

function setTheme(theme) {
  html.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // Storage is not available, the theme just will not be remembered
  }
}

// Use the saved theme, or the system theme if nothing is saved
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {
  savedTheme = null;
}
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (systemDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  setTheme(html.dataset.theme === "dark" ? "light" : "dark");
});