let deferredPrompt;
const modal = document.getElementById("pwaModal");
const installBtn = document.getElementById("installBtn");
const closeModal = document.getElementById("closeModal");

// Wait for Install Prompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // show install modal
  modal.style.display = "flex";
});

// Install button clicked
installBtn.addEventListener("click", async () => {
  modal.style.display = "none";

  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;

  deferredPrompt = null;
});

// close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
