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

// ===== Contact form validation =====
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const statusEl = document.getElementById("form-status");
const fields = [nameInput, emailInput, messageInput];

function showError(input, message) {
  document.getElementById(input.id + "-error").textContent = message;
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  fields.forEach((input) => {
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
  });
  statusEl.textContent = "";
  statusEl.classList.remove("success");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  let firstInvalid = null;

  if (nameInput.value.trim() === "") {
    showError(nameInput, "Please enter your name.");
    firstInvalid = firstInvalid || nameInput;
  }

  if (emailInput.value.trim() === "") {
    showError(emailInput, "Please enter your email.");
    firstInvalid = firstInvalid || emailInput;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, "Invalid email format. Example: name@example.com");
    firstInvalid = firstInvalid || emailInput;
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, "Please write a message.");
    firstInvalid = firstInvalid || messageInput;
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  statusEl.textContent = "Thank you! Your message was sent successfully.";
  statusEl.classList.add("success");
  form.reset();
});