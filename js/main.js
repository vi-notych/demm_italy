//слайдер
new Swiper(".slider__swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

//popup
const bookCallBtn = document.getElementById("open");
const closePopUp = document.getElementById("close");
const popUp = document.getElementById("popup");
const modalWindow = document.querySelector(".popup__container");
const body = document.querySelector("body");

//функция добавляяет класс актив popup и отключает скрол экрана
function addClass() {
  popUp.classList.add("active");
  body.classList.add("scroll-lock");
}
//функция убирает класс актив popup и включает скрол экрана
function removeClass() {
  popUp.classList.remove("active");
  body.classList.remove("scroll-lock");
}

//включаем popup кнопкой 'Заказать звонок'
bookCallBtn.addEventListener("click", () => addClass());

//выключаем popup 
//кнопкой "close"
closePopUp.addEventListener("click", () => removeClass());
//нажатием на кнопку "Escape"
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") removeClass();
});
//кликом на экран вокруг модального окна
window.addEventListener("click", (e) => {
  if (e.target === modalWindow) removeClass();
});


//Бургер-меню
const navBtn = document.querySelector('.header__mobile-btn');
const Body = document.querySelector('body');
const headerNav = document.querySelector(".header__mobile-menu");
navBtn.addEventListener('click', function () {
  body.classList.toggle('no-scroll');
  headerNav.classList.toggle('active');
  navBtn.classList.toggle('active');
})

//Каталог
const catalogBtn = document.querySelector('.header__mobile-catalog');
const catalogList = document.querySelector('.header__mobile-items');
catalogBtn.addEventListener('click', function (){
  catalogBtn.classList.toggle('open');
  catalogList.classList.toggle('open');
})