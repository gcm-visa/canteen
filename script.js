let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const pwaModal = document.getElementById('pwaModal');
const closePwaModal = document.getElementById('closePwaModal');
const orderBtn = document.getElementById('orderBtn');
const menuBtn = document.getElementById('menuBtn');

const WEBAPP_URL = "https://your-webapp-link.com"; // replace with your actual web app link

// Show PWA install modal
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  pwaModal.style.display = "flex";
});

// Install button
if (installBtn) {
  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        console.log(choice.outcome);
        deferredPrompt = null;
      });
      pwaModal.style.display = "none";
    }
  });
}

// Close modal
if (closePwaModal) {
  closePwaModal.onclick = () => pwaModal.style.display = "none";
}

// Close modal if clicking outside
window.onclick = (event) => {
  if (event.target == pwaModal) pwaModal.style.display = "none";
};

// Redirect buttons
if (orderBtn) orderBtn.addEventListener('click', () => window.location.href = WEBAPP_URL);
if (menuBtn) menuBtn.addEventListener('click', () => window.location.href = WEBAPP_URL);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/canteen/service-worker.js')
      .then(reg => console.log('ServiceWorker registered:', reg.scope))
      .catch(err => console.error('SW registration failed:', err));
  });
}
