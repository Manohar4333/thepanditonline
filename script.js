/*
  PoojaSeva static booking demo.
  IMPORTANT: Replace WHATSAPP_NUMBER with your business WhatsApp number.
  Use country code + number, digits only. Example for India: 919876543210.
*/
const WHATSAPP_NUMBER = "918187837366"; // TODO: Replace with your real number.

const form = document.getElementById("bookingForm");
const errorBox = document.getElementById("formError");
const dateInput = document.getElementById("date");
const serviceSelect = document.getElementById("service");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

document.getElementById("year").textContent = new Date().getFullYear();

// Prevent selecting a date in the past.
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInput.min = localToday;

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Clicking a service card preselects it in the booking form.
document.querySelectorAll(".choose-service").forEach((button) => {
  button.addEventListener("click", () => {
    serviceSelect.value = button.dataset.service;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    serviceSelect.focus({ preventScroll: true });
  });
});

function clean(value) {
  return String(value || "").trim();
}

function showError(message) {
  errorBox.textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showError("");

  const data = {
    name: clean(document.getElementById("customerName").value),
    phone: clean(document.getElementById("phone").value),
    service: clean(serviceSelect.value),
    date: clean(dateInput.value),
    time: clean(document.getElementById("time").value) || "సమయం చర్చించాలి",
    location: clean(document.getElementById("location").value),
    samagri: clean(document.getElementById("samagri").value),
    details: clean(document.getElementById("details").value)
  };

  if (data.name.length < 2) {
    showError("Please enter your full name.");
    document.getElementById("customerName").focus();
    return;
  }

  // Accept common Indian mobile formats: 10 digits, optionally prefixed with +91 or 91.
  const phoneDigits = data.phone.replace(/\D/g, "");
  const validIndianMobile = /^[6-9]\d{9}$/.test(phoneDigits) ||
    /^91[6-9]\d{9}$/.test(phoneDigits);
  if (!validIndianMobile) {
    showError("Please enter a valid 10-digit Indian mobile number.");
    document.getElementById("phone").focus();
    return;
  }

  if (!data.service) {
    showError("Please select a puja service.");
    serviceSelect.focus();
    return;
  }

  if (!data.date || data.date < localToday) {
    showError("Please select today or a future date.");
    dateInput.focus();
    return;
  }

  if (!data.location) {
    showError("Please enter the city or area where the puja will take place.");
    document.getElementById("location").focus();
    return;
  }

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    showError("Website owner: replace WHATSAPP_NUMBER in script.js with your business WhatsApp number, e.g. 919876543210.");
    return;
  }

  const readableDate = new Date(`${data.date}T00:00:00`).toLocaleDateString("te-IN", {
    day: "numeric", month: "long", year: "numeric"
  });

  const message = [
    "🙏 *PoojaSeva — New Booking Request*",
    "",
    `👤 Name: ${data.name}`,
    `📱 Customer mobile: ${data.phone}`,
    `🪔 Puja: ${data.service}`,
    `📅 Date: ${readableDate}`,
    `⏰ Time: ${data.time}`,
    `📍 Location: ${data.location}`,
    `🧺 Puja materials: ${data.samagri}`,
    `📝 Additional details: ${data.details || "None provided"}`,
    "",
    "Please confirm priest availability, total price and puja material details."
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

// Optional: make floating WhatsApp shortcut scroll to the booking form.
document.getElementById("floatingWhatsApp").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
});
