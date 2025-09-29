document.addEventListener('DOMContentLoaded', function () {
  const activeItem = document.querySelector('.breadcrumb-item.active');
  if (activeItem) {
    activeItem.setAttribute('aria-current', 'page');
  }
});
