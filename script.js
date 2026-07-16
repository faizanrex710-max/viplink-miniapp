document.addEventListener("DOMContentLoaded", () => {

  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();
  }

  // Search
  const search = document.querySelector(".search");
  const cards = document.querySelectorAll(".card");

  if (search) {
    search.addEventListener("keyup", () => {
      const value = search.value.toLowerCase();

      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
      });
    });
  }

});

function openChannel() {
  window.open("https://t.me/VIRALVIDEOS_8", "_blank");
}
