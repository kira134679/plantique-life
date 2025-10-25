import 'bootstrap/dist/js/bootstrap.min.js';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
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
