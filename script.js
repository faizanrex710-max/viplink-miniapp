document.addEventListener("DOMContentLoaded", () => {

  console.log("Daily Viral Videos Loaded");

  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();
  }

  const button = document.querySelector("button");

  if (button) {
    button.addEventListener("click", () => {
      window.open("https://t.me/VIRALVIDEOS_8", "_blank");
    });
  }

});
