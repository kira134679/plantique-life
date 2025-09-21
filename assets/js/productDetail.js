// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

import '/assets/scss/product-detail.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

// const swiper = new Swiper('.mySwiper', {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
//   breakpoints: {
//     992: {

//     }
//   }

// });

// thumbnail
const swiper = new Swiper('.mySwiper', {
  loop: true,
  spaceBetween: 16,
  slidesPerView: 4,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    className: 'swiper-pagination-bullet',
    renderBullet: function (className) {
      return `<span class="${className}"></span>`;
    },
  },
});

// main
const swiper2 = new Swiper('.mySwiper2', {
  loop: true,
  spaceBetween: 16,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: swiper,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
