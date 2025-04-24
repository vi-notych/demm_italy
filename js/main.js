import { useDynamicAdapt } from "./dynamicAdapt.js";
import { products } from "./products.js";

//====== функция запуска по страницам ========================//
function init() {
  burgerMenu();
  dropDownMenu();
  popup();

  // Динамичкский АДАПТИВ
  useDynamicAdapt();

  const currentPage = window.location.pathname;
  switch (currentPage) {
    case "/index.html":
      sliderIndex();
      break;
    case "/card.html":
      sliderCard();
      break;
    case "/mixers.html":
      dropDownFilter();
      priceFilter();
      formationIdForInput();
      addProductCard();
      counter();
      break;
    case "/catalog.html":
      dropDownFilter();
      priceFilter();
      formationIdForInput();
      addProductCard();
      counter();
      break;
    default:
      break;
  }
}
document.addEventListener("DOMContentLoaded", init());

//======== CЛАЙДЕРЫ ===========================================//
function sliderIndex() {
  new Swiper(".slider__swiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
function sliderCard() {
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
}

/**
 * POPUP
 */
function popup() {
  const bookCallBtn = document.getElementById("open");
  const closePopUp = document.getElementById("close");
  const popUp = document.getElementById("popup");
  const modalWindow = document.querySelector(".popup__container");
  const body = document.querySelector("body");
  //функция добавляяет класс актив popup и отключает скрол экрана
  function addClass() {
    popUp.classList.add("active");
    body.classList.add("no-scroll");
  }
  //функция убирает класс актив popup и включает скрол экрана
  function removeClass() {
    popUp.classList.remove("active");
    body.classList.remove("no-scroll");
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
}

/**
 * Бургер-МЕНЮ
 */
function burgerMenu() {
  const navBtn = document.querySelector(".header__mobile-btn");
  const headerNav = document.querySelector(".header__mobile-menu");
  navBtn.addEventListener("click", function () {
    document.body.classList.toggle("no-scroll");
    headerNav.classList.toggle("active");
    navBtn.classList.toggle("active");
  });
}

//========= Выпадающий СПИСОК =================================//
/**
 * каталог в мобильном меню
 */
function dropDownMenu() {
  const catalogBtn = document.querySelector(".header__mobile-catalog");
  const catalogList = document.querySelector(".header__bottom-list");
  catalogBtn.addEventListener("click", function () {
    catalogBtn.classList.toggle("open");
    catalogList.classList.toggle("open");
  });
}

/**
 * списки фильтров
 */
function dropDownFilter() {
  //определяем кнопки фильтров
  const filterBtn = document.querySelectorAll(".filter__btn");
  //при нажатии на кнопку открываем и скрываем фильтр
  filterBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      //находим и активируем кнопку по которой кликнули
      const btn = e.target;
      //console.log(btn);
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
              otherList.classList.remove("right");
            }
          });
        }
        //открываем выбранный фильтр
        list.classList.toggle("open");
        //определяем  координаты списка выбранного фильтра
        const listPosition = list.getBoundingClientRect();
        //console.log(listPosition);
        //console.log(innerWidth);
        //если правый край списока выходит за границу экрана
        if (listPosition.right > innerWidth) {
          //позиционируем по правому краю
          list.classList.add("right");
        }
      }
    });
  });
}

//====== Price - slider ========================================//
function priceFilter() {
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
  //меняем шкалу цифрами в инпутах
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
}

//==== формируем автоID для input и FOR для label фильтров =====//
function formationIdForInput() {
  const filterInputs = document.querySelectorAll(".filter__input");
  filterInputs.forEach((input, index) => {
    const uniqueId = `input-${index}`;
    input.setAttribute("id", uniqueId);
    const label = input.nextElementSibling;
    if (label) {
      label.setAttribute("for", uniqueId);
    }
  });
}

/**
 * Добдавляет карточку товара (это JSDoc)
 */
function addProductCard() {
  //массив products имрортируем из файла "./products.js"
  //находим контейнер для карточек
  const productContainer = document.getElementById("product-container");
  //обходим массив, создаем элементы "article" даем им класс "product-card"
  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product-card");
    //и добавляем в "article" разметку
    productCard.innerHTML = `
      <div class="product-card__stickers">
        <div class="product-card__sticker product-card__sticker_new ${
          product.stickerNew
        }">Новинка</div>
        <div class="product-card__sticker product-card__sticker_action ${
          product.stickerAction
        }">Акция</div>
        <div class="product-card__sticker product-card__sticker_hit ${
          product.stickerHit
        }">Хит</div>
      </div>
      <a href="card.html" class="product-card__photo">
        <img class="product-card__img" src=${product.img} alt="photo">
      </a>
      <div class="product-card__info card-info">
        <div class="card-info__current">
          <div class="card-info__have ${product.have}">В наличии</div>
          <div class="card-info__not-have ${
            product.notHave
          }">Нет в наличии</div>
        </div>
        <p class="card-info__article">${product.article}</p>
      </div>
      <div class="product-card__text">${product.name}
      </div>
      <div class="product-card__collection">${product.collection}</div>
      <div class="product-card__price ${product.price}">
        <div class="product-card__current-price">${product.currentPrice.toLocaleString()} руб./шт</div>
        <div class="product-card__old-price">${product.oldPrice.toLocaleString()} руб./шт</div>
      </div>
      <div class="product-card__btn-wrap">
        <button class="product-card__btn-basket button ${
          product.btnBasket
        }">В корзину</button>
        <button class="product-card__btn-counter button ${product.btnCounter}">
          <span class="decrease">-</span>
          <input class="counter" type="text" value="1"></input>
          <span class="increase">+</span>
        </button>
        <button class="product-card__btn-buy button">Купить в 1 клик</button>
      </div>
    `;
    productContainer.appendChild(productCard);
  });
}

/**
 * счетчик в корзину по клику на кнопку "КУПИТЬ В 1 КЛИК"
 */
function counter() {
  const cards = document.getElementById("product-container");
  //запускаем прослушку по блоку с карточками
  cards.addEventListener("click", function (e) {
    //если клик по кнопке "купить в 1 клик"
    if (e.target.classList.contains("product-card__btn-buy")) {
      const buyBtn = e.target;
      //находим  все соседние кнопки
      const elements = buyBtn.parentNode.children;
      //меняем у них класс "disabled"
      for (const element of elements) {
        //кнопка со счетчиком
        if (element.classList.contains("product-card__btn-counter")) {
          element.classList.toggle("disabled");
          const counterBtn = element;
          //если кнопка со счетчиком активна находим ее инпут
          if (counterBtn.classList.contains("disabled")) {
          } else {
            let inputValue = counterBtn.querySelector(".counter").value;
            //слушаем клики на + и - и меняем значение инпута по кликм
            counterBtn.addEventListener("click", function (e) {
              if (e.target.classList.contains("decrease")) {
                inputValue = inputValue - 1;
              }
              if (e.target.classList.contains("increase")) {
                inputValue = +inputValue + 1;
              }
              counterBtn.querySelector(".counter").value = inputValue;
            });
          }
        }
        //кнопка добавить в корзину
        if (element.classList.contains("product-card__btn-basket")) {
          element.classList.toggle("disabled");
        }
      }
    }
  });
}


// document.addEventListener("DOMContentLoaded", () => {
//   const body = document.querySelector("body");

//   body.addEventListener("click", (e) => {
//     const el = e.target;
//     console.log(el);
//   });
// });