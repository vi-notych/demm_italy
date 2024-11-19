new Swiper(".slider__swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const bookCallBtn = document.getElementById("open");
const closePopUp = document.getElementById("close");
const popUp = document.getElementById("popup");
const modalWindow = document.querySelector(".popup__container");
const body = document.querySelector("body");

function addClass() {
  popUp.classList.add("active");
  body.classList.add("scroll-lock");
}
function removeClass() {
  popUp.classList.remove("active");
  body.classList.remove("scroll-lock");
}

bookCallBtn.addEventListener("click", () => addClass());

closePopUp.addEventListener("click", () => removeClass());

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") removeClass();
});

window.addEventListener("click", (e) => {
  if (e.target === modalWindow) removeClass();
});
