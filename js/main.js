import { useDynamicAdapt } from "./dynamicAdapt.js";

//====== Динамичкский АДАПТИВ =================================//
useDynamicAdapt();

//======== CЛАЙДЕРЫ ===========================================//
//=== INDEX.HTML =================//
new Swiper(".slider__swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
//=== CART.HTML ==================//
//=== property__slider ============
new Swiper(".slider-big__slider", {
  direction: "horizontal",
  //количество слайдов для показа
  slidesPerView: 1,
  navigation: {
    nextEl: ".slider-big__next",
    prevEl: ".slider-big__prev",
  },
  //минислайдер (превью)
  thumbs: {
    swiper: {
      el: ".slider-small__slider",
      spaceBetween: 15,
      breakpoints: {
        960: {
          slidesPerView: 4,
          direction: "horizontal",
        },
        650: {
          slidesPerView: 3,
          direction: "vertical",
        },
        0: {
          spaceBetween: 10,
          slidesPerView: 3,
          direction: "horizontal",
        },
      },
    },
  },
});
//=== colection__slider ===========
new Swiper(".colection__slider", {
  //расположение слайдера/
  direction: "horizontal",
  //стрелки
  navigation: {
    nextEl: ".colection-next",
    prevEl: ".colection-prev",
  },
  //навигация
  pagination: {
    el: ".colection-pagination",
    //булеты
    clickable: true,
  },
  //отключение слайдера, если слайдов меньше чем нужно
  watchOverflow: true,
  //петля - непрерывный цикл
  loop: true,
  //брейк поинты (адаптив)
  breakpoints: {
    960: {
      //интервал между слайдами
      spaceBetween: 24,
      slidesPerView: 4,
    },
    700: {
      spaceBetween: 20,
      slidesPerView: 3,
    },
    320: {
      spaceBetween: 10,
      slidesPerView: 2,
    },
    0: {
      spaceBetween: 10,
      slidesPerView: 1,
    },
  },
});
//=== optional-slider ===========
new Swiper(".optional__slider", {
  navigation: {
    nextEl: ".optional-next",
    prevEl: ".optional-prev",
  },
  pagination: {
    el: ".optional-pagination",
    clickable: true,
  },
  loop: true,
  breakpoints: {
    1150: {
      spaceBetween: 24,
      slidesPerView: 4,
    },
    830: {
      spaceBetween: 20,
      slidesPerView: 3,
    },
    480: {
      spaceBetween: 20,
      slidesPerView: 2,
    },
    320: {
      spaceBetween: 10,
      slidesPerView: 2,
    },
    0: {
      spaceBetween: 10,
      slidesPerView: 1,
    },
  },
});

//========= POPUP =============================================//
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
//===== включаем popup
// кнопкой 'Заказать звонок'
bookCallBtn.addEventListener("click", () => addClass());

//====== выключаем popup
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

//=========== Бургер-МЕНЮ ========================================//
const navBtn = document.querySelector(".header__mobile-btn");
const Body = document.querySelector("body");
const headerNav = document.querySelector(".header__mobile-menu");
navBtn.addEventListener("click", function () {
  body.classList.toggle("no-scroll");
  headerNav.classList.toggle("active");
  navBtn.classList.toggle("active");
});

//============== Выпадающий СПИСОК ==============================//
//=== mobail-menu ====
const catalogBtn = document.querySelector(".header__mobile-catalog");
const catalogList = document.querySelector(".header__bottom-list");
catalogBtn.addEventListener("click", function () {
  catalogBtn.classList.toggle("open");
  catalogList.classList.toggle("open");
});

//===== filter =======
//определяем кнопки фильтров
const filterBtn = document.querySelectorAll(".filter__btn");
//при нажатии на кнопку открываем и скрываем фильтр
filterBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    //находим и активируем кнопку по которой кликнули
    const btn = e.target;
    console.log(btn);

    btn.classList.toggle("open");
    //ищем соседний элемент и проверяем наличие у элемента класса 'filter__items' или 'catalog__btn-wrap'
    const list = btn.nextElementSibling;
    if (
      list &&
      (list.classList.contains("filter__items") ||
        list.classList.contains("catalog__btn-wrap"))
    ) {
      //если ширина экрана меньше 768px закрываем все открытые фильтры
      if (window.innerWidth < 768) {
        filterBtn.forEach((otherBtn) => {
          const otherList = otherBtn.nextElementSibling;
          if (
            otherList &&
            (list.classList.contains("filter__items") ||
              list.classList.contains("catalog__btn-wrap")) &&
            otherBtn !== btn
          ) {
            otherBtn.classList.remove("open");
            otherList.classList.remove("open");
          }
        });
      }
      //открываем выбранный фильтр
      list.classList.toggle("open");
    }
  });
});

//====== Price - slider =========================================//
//определяем ползунки нашего слайдера
const rangeInput = document.querySelectorAll(".filter__range-input input");
//определяем инпуты с ценами
const priceInput = document.querySelectorAll(".filter__price-input input");
//определяем шкалу на шего слайдера
const progress = document.querySelector(".filter__price-progress");
//задаем минимальный диапазон слайдера
const priceGap = 10000;
//меняем шкалу двигая ползунки
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    //получаем значения каждого ползунка и преобразовываем его в число
    const minVal = parseInt(rangeInput[0].value);
    const maxVal = parseInt(rangeInput[1].value);
    //если диапазон шкалы больше минимального
    if (maxVal - minVal > priceGap) {
      //получяем крайние значения для шкалы слайдера
      const percentMin = (minVal / rangeInput[0].max) * 100;
      const percentMax = (maxVal / rangeInput[1].max) * 100;
      //задаем динамические размеры шкалы слайдера left и right в scss
      progress.style.left = percentMin + "%";
      progress.style.right = 100 - percentMax + "%";
      //задаем значения цены в верхних инпутах
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
    } else {
      //если диапазон шкалы меньше минимального - ставим ограничитель
      if (e.target.className === "filter__range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    }
  });
});
//меняем шкалу цыфрами в инпутах
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    const minVal = parseInt(priceInput[0].value);
    const maxVal = parseInt(priceInput[1].value);

    if (maxVal - minVal >= priceGap && maxVal <= 100000) {
      if (e.target.className === "filter__price-min") {
        rangeInput[0].value = minVal;
        const percentMin = (minVal / rangeInput[0].max) * 100;
        progress.style.left = percentMin + "%";
      } else {
        rangeInput[1].value = maxVal;
        const percentMax = (maxVal / rangeInput[1].max) * 100;
        progress.style.right = 100 - percentMax + "%";
      }
    }
  });
});

//формируем ID для input и FOR для label фильтров
document.addEventListener("DOMContentLoaded", function () {
  const filterInputs = document.querySelectorAll(".filter__input");
  filterInputs.forEach((input, index) => {
    const uniqueId = `input-${index}`;
    input.setAttribute("id", uniqueId);
    const label = input.nextElementSibling;
    if (label) {
      label.setAttribute("for", uniqueId);
    }
  });
});

//======= тень карточки при Hover на фото =======================
// const photos = document.querySelectorAll(".product-cart__photo");

// photos.forEach(photo => {
//   photo.addEventListener('mouseenter',()=>{
//     const cart = photo.parentElement;
//     cart.classList.add('shadow')
//   })
// });

// photos.forEach(photo => {
//   photo.addEventListener("mouseleave", () => {
//     const cart = photo.parentElement;
//     cart.classList.remove("shadow");
//   });
// });
