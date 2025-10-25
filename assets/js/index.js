import 'bootstrap/dist/js/bootstrap.min.js';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '/assets/scss/index.scss';

const columnFilterEl = document.querySelector('#column-filter');
const columnItems = document.querySelectorAll('.column-item');

columnFilterEl.addEventListener('click', e => {
  const tag = e.target.closest('button');

  if (tag) {
    const tags = e.currentTarget.querySelectorAll('button');
    tags.forEach(tag => tag.classList.remove('active'));
    tag.classList.add('active');

    const filter = tag.dataset.filter;
    columnItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
});

const newsSwiper = new Swiper('.newsSwiper', {
  modules: [Pagination, Autoplay],
  direction: 'horizontal',
  loop: true,
  autoHeight: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const productSwiper = new Swiper('.productSwiper', {
  direction: 'horizontal',
  loop: false,

  modules: [Navigation],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  watchOverflow: false, // 當滑塊不足以滾動時自動隱藏導航

  breakpoints: {
    // RWD 響應式
    0: {
      slidesPerView: 'auto',
      spaceBetween: 12,
      freeMode: true,
      navigation: false, // 關閉箭頭
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
      freeMode: false,
    },
  },
});
