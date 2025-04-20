let currentAudio = null;
let currentSrc = "";

// Audio çal və popup göstər
function playSound(audioId, buttonElement) {
  const audio = document.getElementById(audioId);

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  
  

  currentAudio = audio;
  currentSrc = audio.src;
  audio.play();

  // Bütün butonları gizlət
  const allButtons = document.querySelectorAll('.sound-button');
  allButtons.forEach(btn => {
    btn.style.display = 'none';
  });

  // Sadəcə bu butonu göstər
  buttonElement.style.display = 'inline-block';

  // Popup və düymələri göstər
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popupTitle").innerText = buttonElement.innerText;
  document.getElementById("downloadButton").style.display = "inline-block";
  document.getElementById("backButton").style.display = "inline-block";
}

// Popup-u bağla və əsas ekrana qayıt
function goBack() {
  document.getElementById("popup").style.display = "none";

  // Bütün butonları yenidən göstər
  const allButtons = document.querySelectorAll('.sound-button');
  allButtons.forEach(btn => {
    btn.style.display = 'inline-block';
  });

  document.getElementById("downloadButton").style.display = "none";
  document.getElementById("backButton").style.display = "none";
}

// Audio yüklə
function downloadAudio() {
  const a = document.createElement("a");
  a.href = currentSrc;
  a.download = "sound.mp3";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

currentAudio = audio;
currentSrc = audio.src;
audio.play();

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
