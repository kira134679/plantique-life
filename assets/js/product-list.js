import '/assets/scss/product-list.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
