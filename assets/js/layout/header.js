// 載入圖片
import product11 from '../../images/img_product_11.png';
import product13 from '../../images/img_product_13.png';
import productAdd1 from '../../images/img_product_add_01.png';
const images = [
  { source: product13, name: '荒原綠影' },
  { source: product11, name: '垂綠星河' },
  { source: productAdd1, name: '噴霧器', position: 'product-add1-position' },
];

// 模擬購物車資料
const headerCart = [
  {
    type: 'product',
    name: '荒原綠影',
    originalPrice: 2400,
    salePrice: 2400,
    count: 1,
  },
  {
    type: 'product',
    name: '垂綠星河',
    originalPrice: 3600,
    salePrice: 3600,
    count: 1,
  },
  {
    type: 'add-on',
    name: '噴霧器',
    originalPrice: 249,
    salePrice: 129,
    count: 1,
  },
];

function renderCartList(cartListEl, cartList, offcanvasTextEl, nextBtnEl) {
  cartListEl.innerHTML = '';
  const frag = document.createDocumentFragment();
  if (cartList.length === 0) {
    const li = document.createElement('li');
    li.classList.add('text-center', 'py-5', 'text-neutral-500');
    li.textContent = '購物車尚未加入商品';
    frag.appendChild(li);
    nextBtnEl.disabled = true;
  } else {
    cartList.forEach((item, index) => frag.appendChild(renderCartItem(item, index)));
    nextBtnEl.disabled = false;
  }
  offcanvasTextEl.textContent = cartList.length;
  cartListEl.appendChild(frag);
}
function renderCartItem(cartItem, index) {
  const li = document.createElement('li');
  li.dataset.index = index;
  const image = images.filter(img => img.name === cartItem.name);
  li.innerHTML = `
      <div class="card border-0 flex-row">
        <img src="${image ? image[0].source : ''}" class="card-img-top w-25 rounded-0 object-fit-cover" alt="${cartItem.name}">
        <div class="card-body d-flex flex-column p-0 ms-3">
          ${
            cartItem.type === 'add-on'
              ? `<span class="align-self-start d-inline-block fs-xs text-secondary bg-secondary-100 text-nowrap py-1 px-2 px-lg-3 mb-1">加購商品</span>`
              : ''
          }
          <p class="card-title fs-6 noto-serif-tc fw-bold text-neutral-700 mb-1">${cartItem.name}</p>
          <div class="d-flex align-items-center mb-1">
            <p class="card-text text-neutral-700 noto-serif-tc fw-bold me-1">NT$${cartItem.salePrice.toLocaleString()}</p>
            ${
              cartItem.salePrice === cartItem.originalPrice
                ? ''
                : `<p class="card-text fs-sm text-neutral-400 noto-serif-tc fw-bold text-decoration-line-through">$${cartItem.originalPrice.toLocaleString()}</p>`
            }
          </div>
          <div class="d-flex align-items-center mt-auto">
            <button class="btn custom-btn-outline-neutral custom-btn-circle-sm p-1 me-1" data-action="minus" type="button" disabled>
              <span class="custom-btn-icon material-symbols-rounded">remove</span>
            </button>
            <div class="text-center">
              <span class="px-2 me-1" data-action="quantity">1</span>
            </div>
            <button class="btn custom-btn-outline-neutral custom-btn-circle-sm p-1 me-1" data-action="add" type="button">
              <span class="custom-btn-icon material-symbols-rounded">add</span>
            </button>
            <button class="btn custom-btn-outline-danger custom-btn-circle-sm p-1 ms-auto" data-action="delete" type="button">
              <span class="custom-btn-icon material-symbols-rounded">delete</span>
            </button>
          </div>
        </div>
      </div>`;
  return li;
}
// 購物車列表
const headerOffcanvasCartEl = document.getElementById('header-offcanvas-cart');
// 購物車數量
const headerOffcanvasTextEl = document.getElementById('header-offcanvas-text');
// 去結帳按鈕
const headerGoCartBtn = document.querySelector('[data-id="headerGoCartBtn"]');

// 初始渲染購物車列表
renderCartList(headerOffcanvasCartEl, headerCart, headerOffcanvasTextEl, headerGoCartBtn);

// 購物車按鈕事件
headerOffcanvasCartEl.addEventListener('click', e => {
  // 取得 btn
  const btn = e.target.closest('button');
  if (!btn) return;

  const li = btn.closest('li');
  const quantityEl = li.querySelector('[data-action="quantity"]');
  // const subtotalEl = li.querySelector('[data-action="subtotal"]');
  // 取得購物車
  const cartItem = headerCart[li.dataset.index];

  const action = btn.dataset.action;
  switch (action) {
    case 'add':
      cartItem.count++;
      // subtotalEl.textContent = `NT$${(cartItem.salePrice * cartItem.count).toLocaleString()}`;
      quantityEl.textContent = cartItem.count;
      const decreaseBtnEl = li.querySelector('[data-action="minus"]');
      decreaseBtnEl.disabled = false;
      break;
    case 'minus':
      if (cartItem.count > 1) {
        cartItem.count--;
        // subtotalEl.textContent = `NT$${(cartItem.salePrice * cartItem.count).toLocaleString()}`;
        quantityEl.textContent = cartItem.count;
      }
      if (cartItem.count <= 1) {
        btn.disabled = true;
      }
      break;
    case 'delete':
      // 刪除訂單購物車紀錄
      headerCart.splice(
        headerCart.findIndex(orderCartItem => orderCartItem.name === cartItem.name),
        1,
      );
      // 畫面更新
      renderCartList(e.currentTarget, headerCart, headerOffcanvasTextEl, headerGoCartBtn);
      break;
    default:
      return;
  }
});

// 去結帳按鈕事件
headerGoCartBtn.addEventListener('click', () => (window.location.href = './shopping-cart.html'));
