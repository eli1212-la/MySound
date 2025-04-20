self.addEventListener("install", function (e) {
  console.log("Service Worker Installed");
});

self.addEventListener("fetch", function (e) {
  console.log("Service Worker Fetching", e.request.url);
});
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Hadisəni saxla
  e.preventDefault();
  deferredPrompt = e;

  // Custom install düyməsi yarat
  const installBtn = document.createElement('button');
  installBtn.innerText = "Install App";
  installBtn.style.position = "fixed";
  installBtn.style.bottom = "20px";
  installBtn.style.right = "20px";
  installBtn.style.zIndex = "999";
  installBtn.style.padding = "10px 20px";
  installBtn.style.backgroundColor = "#000";
  installBtn.style.color = "#fff";
  installBtn.style.border = "none";
  installBtn.style.borderRadius = "10px";
  installBtn.style.cursor = "pointer";

  document.body.appendChild(installBtn);

  // Butona klik olduqda prompt göstər
  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        installBtn.remove(); // Bir dəfə göstər, sonra sil
      });
    }
  });
});

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', (event) => {
  
});
