import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import '/assets/scss/product-detail.scss';
import './components/breadcrumb';

const thumbSwiper = new Swiper('.thumb-swiper', {
  modules: [Pagination],
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

const swiper2 = new Swiper('.product-swiper-container', {
  modules: [Navigation, Pagination, Thumbs],
  loop: true,
  spaceBetween: 16,
  thumbs: {
    swiper: thumbSwiper,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
