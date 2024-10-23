new Swiper('.slider__swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})

const openPopUp = document.getElementById('open');
const closePopUp = document.getElementById('close');
const popUp = document.getElementById('popup');

openPopUp.addEventListener('click', function (e) {
  e.preventDefault();
  popUp.classList.add('active');
})

closePopUp.addEventListener('click', () => {
  popUp.classList.remove('active');
})
