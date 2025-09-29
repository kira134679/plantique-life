import '/assets/scss/index.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

const columnTags = document.querySelectorAll('#column-filter button');
const columnItems = document.querySelectorAll('.column-item');

columnTags.forEach(tag => {
  tag.addEventListener('click', () => {
    // 更新 active 樣式
    columnTags.forEach(b => b.classList.remove('active'));
    tag.classList.add('active');

    const filter = tag.dataset.filter;
    columnItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
