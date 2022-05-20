const butInstall = document.getElementById("buttonInstall");

// establishes a window prompt for the event passed in
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;

  butInstall.classList.toggle("hidden", false);
});

// declares a variable to represent the window prompt, checks to see if the prompt has happened yet, 
// then displays it if it hasn't. Finally resets the prompt to null. 
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});


window.addEventListener("appinstalled", (event) => {
  butInstall.classList.toggle("hidden", true);
  window.deferredPrompt = null;
});
