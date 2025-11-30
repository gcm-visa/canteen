let deferredPrompt;
const modal = document.getElementById("pwaModal");
const installBtn = document.getElementById("installBtn");
const closeModal = document.getElementById("closeModal");
const orderBtn = document.getElementById("orderBtn");

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwTWG64jn7L0VDRlN7s3u8_X3MWxb5H_7l0SvvjZ964A_lAnOblCP58kdy4iL18NejGpA/exec?page=c";

// Detect if PWA installed
window.addEventListener("load", () => {
  if (window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true) {
    window.location.href = WEBAPP_URL;
  }
});

// BUTTON CLICK
orderBtn.addEventListener("click", () => {
  if (deferredPrompt) {
    modal.style.display = "flex"; // show install popup
  } else {
    window.location.href = WEBAPP_URL; // fallback
  }
});

// Capture beforeinstallprompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Install button
installBtn.addEventListener("click", async () => {
  modal.style.display = "none";

  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === "accepted") {
    window.location.href = WEBAPP_URL;
  }

  deferredPrompt = null;
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/canteen/sw.js");
    .then(() => console.log("SW registered"))
    .catch(err => console.log("SW fail", err));
}

