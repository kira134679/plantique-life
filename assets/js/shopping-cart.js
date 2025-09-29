import '../scss/shopping-cart.scss';
import * as bootstrap from 'bootstrap';

// 載入圖片
import product11 from '../images/img_product_11.png';
import product13 from '../images/img_product_13.png';
import productAdd1 from '../images/img_product_add_01.png';
const images = [
  { source: product11, name: '荒原綠影' },
  { source: product13, name: '垂綠星河' },
  { source: productAdd1, name: '噴霧器' },
];

// 購物車資料
const cartMenu = [
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

// 優惠券資料
const couponMenu = [
  {
    type: 'amount',
    name: '入會首購金 250 元',
    discount: 250,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'aaaAAA',
    state: '',
  },
  {
    type: 'amount',
    name: '好友分享禮 150 元',
    discount: 150,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'A7X9Q2',
    state: '',
  },
  {
    type: 'amount',
    name: '官方好友禮 50 元',
    discount: 50,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'M3T8kz',
    state: '',
  },
  {
    type: 'amount',
    name: '滿 5000 折 500',
    discount: 500,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'P5R1Y4',
    state: '',
  },
];

const btnCheckoutEl = document.getElementById('btn-checkout');
const cartNavChildrenEl = document.querySelectorAll('#pills-cart-nav li button');
const cartListEl = document.getElementById('cart-list');

const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');

const couponModalListEl = document.getElementById('couponModalList');
const couponSelectedNameEl = document.getElementById('coupon-selected-name');
const couponSelectedBtnEl = document.getElementById('coupon-choose-btn');
const couponModalSelectedEl = document.getElementById('couponModalSelected');

let subtotal = 0;
let discount = 0;
let total = 0;

function scrollToTop() {
  return new Promise(resolve => {
    if (window.scrollY === 0) {
      // 已在頂部
      resolve();
      return;
    }

    function onScroll() {
      if (window.scrollY === 0) {
        window.removeEventListener('scroll', onScroll);
        resolve();
      }
    }
    window.addEventListener('scroll', onScroll);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 產生購物車商品列表
function loadProduct() {
  for (const item of cartMenu) {
    const li = loadProductItem(item);
    cartListEl.appendChild(li);
  }
}
// 購物車商品列表內容
function loadProductItem(item) {
  const li = document.createElement('li');

  const outerDiv = document.createElement('div');
  outerDiv.classList.add('row', 'gx-3', 'gx-lg-6');

  // img
  const source = images.filter(img => img.name === item.name)[0]?.source;
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('col-6', 'col-lg-3');
  const img = document.createElement('img');
  img.classList.add('cart-product-img', 'w-100');
  item.type === 'add-on' ? img.classList.add('add-on') : null;
  source ? img.classList.add('object-fit-cover') : img.classList.add('d-block');
  source ? (img.src = source) : null;
  img.alt = item.name;
  imgDiv.appendChild(img);

  const innerDiv = document.createElement('div');
  innerDiv.classList.add('col-6', 'd-flex', 'flex-column', 'flex-lg-row', 'col-lg-9', 'align-items-lg-center');

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('col-lg-4', 'pe-lg-6');
  infoDiv.innerHTML = `
    ${item.type === 'add-on' ? `<span class="align-self-start d-inline-block fs-xs fs-lg-sm text-secondary bg-secondary-100 text-nowrap py-1 px-2 px-lg-3 mb-1 mb-lg-2">加購商品</span>` : ''}
    <h4 class="h6 fs-lg-5 text-neutral-700 text-nowrap mb-1 mb-lg-2">${item.name}</h4>
    <div class="d-flex mb-3 mb-lg-0 align-items-end">
      <p class="fs-8 fs-lg-7 fw-bold lh-sm noto-serif-tc text-primary-700">NT$${item.salePrice.toLocaleString()}</p>
      ${
        item.originalPrice === item.salePrice
          ? ''
          : `<p class="fs-sm fs-lg-8 noto-serif-tc fw-bold lh-sm text-neutral-400 text-decoration-line-through ms-1 ms-lg-2">$${item.originalPrice}</p>`
      }
    </div>`;

  const subtotalDiv = document.createElement('div');
  subtotalDiv.classList.add('d-flex', 'justify-content-between', 'col-lg-4', 'pe-lg-6', 'mb-3', 'mb-md-0');
  subtotalDiv.innerHTML = `<p class="d-lg-none fs-sm text-neutral-400">小計</p>`;
  const subtotalP = document.createElement('p');
  subtotalP.classList.add('fs-7', 'fw-bold', 'lh-sm', 'fs-lg-6', 'noto-serif-tc', 'text-primary-700');
  subtotal += item.salePrice * item.count;
  subtotalP.textContent = `NT$${(item.salePrice * item.count).toLocaleString()}`;
  subtotalDiv.appendChild(subtotalP);

  // button
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('d-flex', 'align-items-center', 'mt-auto', 'mt-lg-0', 'col-lg-4', 'pe-lg-6');
  const increaseBtn = document.createElement('button');
  increaseBtn.type = 'button';
  increaseBtn.classList.add(
    'btn',
    'border',
    'border-2',
    'rounded-circle',
    'me-1',
    'cart-product-btn',
    'd-flex',
    'justify-content-center',
    'align-items-center',
  );
  increaseBtn.innerHTML = `<span class="material-symbols-rounded fs-6 fs-lg-5 d-block">remove</span>`;
  const quantity = document.createElement('span');
  quantity.classList.add(
    'cart-product-quantity',
    'fs-lg-7',
    'fw-bold',
    'lh-sm',
    'noto-serif-tc',
    'text-center',
    'me-1',
  );
  quantity.textContent = item.count;
  const decreaseBtn = document.createElement('button');
  decreaseBtn.type = 'button';
  decreaseBtn.classList.add(
    'btn',
    'border',
    'border-2',
    'rounded-circle',
    'me-3',
    'cart-product-btn',
    'd-flex',
    'justify-content-center',
    'align-items-center',
  );
  decreaseBtn.innerHTML = `<span class="material-symbols-rounded fs-6 fs-lg-5 d-block">add_2</span>`;
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.classList.add(
    'btn',
    'border',
    'border-2',
    'border-danger-200',
    'rounded-circle',
    'ms-auto',
    'cart-product-btn',
    'd-flex',
    'justify-content-center',
    'align-items-center',
  );
  deleteBtn.innerHTML = `<span class="material-symbols-rounded fs-6 fs-lg-5 d-block text-danger">delete</span>`;
  increaseBtn.addEventListener('click', () => {
    if (item.count > 1) {
      item.count--;
      subtotalP.textContent = `NT$${(item.salePrice * item.count).toLocaleString()}`;
      quantity.textContent = item.count;

      subtotal -= item.salePrice;
      amountDisplay();
    }
  });
  decreaseBtn.addEventListener('click', () => {
    item.count++;
    subtotalP.textContent = `NT$${(item.salePrice * item.count).toLocaleString()}`;
    quantity.textContent = item.count;

    subtotal += item.salePrice;
    amountDisplay();
  });
  deleteBtn.addEventListener('click', () => {
    subtotal -= item.salePrice * item.count;
    amountDisplay();

    cartListEl.removeChild(li);
    cartMenu.splice(
      cartMenu.findIndex(old => old.name !== item.name),
      1,
    );
  });
  btnWrapper.appendChild(increaseBtn);
  btnWrapper.appendChild(quantity);
  btnWrapper.appendChild(decreaseBtn);
  btnWrapper.appendChild(deleteBtn);

  innerDiv.appendChild(infoDiv);
  innerDiv.appendChild(subtotalDiv);
  innerDiv.appendChild(btnWrapper);

  outerDiv.appendChild(imgDiv);
  outerDiv.appendChild(innerDiv);

  li.appendChild(outerDiv);

  return li;
}

// 產生優惠券列表
function loadCoupon() {
  // 清除優惠券列表內容
  couponModalListEl.innerHTML = '';
  // 新增優惠券內容
  couponMenu.forEach(coupon => {
    // 已被選取的優惠券不會出現在列表中
    if (!coupon.state) {
      const li = document.createElement('li');
      const div = loadCouponItem(coupon, true);
      li.appendChild(div);
      couponModalListEl.appendChild(li);
    }
  });
}
// 優惠券列表內容
function loadCouponItem(coupon, isMenuItem) {
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('coupon-layout', 'd-flex');

  const startDiv = document.createElement('div');
  startDiv.classList.add('bg-primary', 'd-flex', 'justify-content-center', 'align-items-center');
  startDiv.innerHTML = `
    <div class="bg-primary d-flex justify-content-center align-items-center">
      <div class="d-flex flex-column align-items-start">
        <span class="fs-sm text-white mb-1">NT$</span>
        <span class="h3 text-white">${coupon.discount}</span>
      </div>
    </div>`;

  const endDiv = document.createElement('div');
  endDiv.classList.add(
    'flex-grow-1',
    'd-flex',
    'justify-content-between',
    'align-items-center',
    'border',
    'border-start-0',
    'px-3',
  );
  endDiv.innerHTML = `
    <div class="me-3">
      <p class="fs-8 lh-sm fw-bold noto-serif-tc text-neutral-700 mb-2">
        ${coupon.name}
      </p>
      <p class="fs-xs fs-lg-sm text-primary-500">${coupon.date}</p>
    </div>`;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.classList.add('btn');
  if (isMenuItem) {
    btn.classList.add('btn-primary', 'rounded-0', 'fs-sm', 'fs-lg-8', 'text-white', 'text-nowrap', 'px-3', 'py-2');
    btn.textContent = '選擇';
  } else {
    btn.classList.add('border', 'border-2', 'border-danger-200', 'rounded-circle', 'p-2', 'mx-2');
    btn.innerHTML = `<span class="material-symbols-rounded d-block text-danger">close</span>`;
  }
  endDiv.appendChild(btn);

  outerDiv.appendChild(startDiv);
  outerDiv.appendChild(endDiv);
  btn.addEventListener('click', () => {
    if (isMenuItem) {
      couponMenu.map(coupon => (coupon.state = ''));
      // 選擇優惠券
      couponModalSelectedEl.innerHTML = '';
      couponModalSelectedEl.classList.remove('unselected');
      couponModalSelectedEl.appendChild(loadCouponItem(coupon));
      coupon.state = 'selected';
      discount = coupon.discount;
      couponSelectedNameEl.textContent = coupon.name;
      couponSelectedNameEl.classList.add('selected');
      couponSelectedBtnEl.textContent = '編輯';
    } else {
      // 移除已選擇優惠券
      couponModalSelectedEl.classList.add('unselected');
      couponModalSelectedEl.innerHTML = '';
      coupon.state = '';
      discount = 0;
      couponSelectedNameEl.textContent = '未選擇優惠';
      couponSelectedNameEl.classList.remove('selected');
      couponSelectedBtnEl.textContent = '選擇';
    }
    loadCoupon();
    amountDisplay();
  });
  return outerDiv;
}

// 更新訂單明細
function amountDisplay() {
  total = subtotal - discount;
  subtotalEl.textContent = `NT$ ${subtotal.toLocaleString()}`;
  discountEl.textContent = `- NT$ ${discount.toLocaleString()}`;
  totalEl.textContent = `NT$ ${total.toLocaleString()}`;
}

// 第一次執行
// 產生購物車商品列表
loadProduct();
// 產生優惠券列表
loadCoupon();
// 更新訂單明細
amountDisplay();

// 購物車清單 前往結帳 按鈕事件
btnCheckoutEl.addEventListener('click', () => {
  const handleEnd = function () {
    cartNavChildrenEl[1].classList.remove('step-undo');
    const triggerCheckoutInfoEl = document.querySelector(
      '#pills-cart-nav button[data-bs-target="#pills-checkout-info"]',
    );
    setTimeout(() => {
      bootstrap.Tab.getOrCreateInstance(triggerCheckoutInfoEl).show();
    }, 600);
  };

  async function runEffects() {
    await scrollToTop(); // 等滾動完成

    // 第一個效果
    cartNavChildrenEl[0].addEventListener('transitionend', handleEnd, { once: true });
    cartNavChildrenEl[0].classList.add('step-completed');
  }

  runEffects();
});
