import '../scss/shopping-cart.scss';
import * as bootstrap from 'bootstrap';

// 載入圖片
import product11 from '../images/img_product_11.png';
import product13 from '../images/img_product_13.png';
import productAdd1 from '../images/img_product_add_01.png';
const images = [
  { source: product11, name: '荒原綠影' },
  { source: product13, name: '垂綠星河' },
  { source: productAdd1, name: '噴霧器', position: 'product-add1-position' },
];

// 優惠券資料
const couponMenu = [
  {
    type: 'amount',
    name: '入會首購金 250 元',
    discount: 250,
    minimumSpend: 250,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'aaaaaa',
    state: '',
  },
  {
    type: 'amount',
    name: '好友分享禮 150 元',
    discount: 150,
    minimumSpend: 150,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'A7X9Q2',
    state: '',
  },
  {
    type: 'amount',
    name: '官方好友禮 50 元',
    discount: 50,
    minimumSpend: 50,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'M3T8kz',
    state: '',
  },
  {
    type: 'amount',
    name: '滿 5000 折 500',
    discount: 500,
    minimumSpend: 5000,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'bbbbbb',
    state: '',
  },
];

// 付款資料
const orderInfo = {
  cart: [
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
  ],
  subtotal: 0,
  discount: 0,
  total: 0,
  delivery: {
    method: '黑貓宅配',
  },
  payment: {
    method: '信用卡一次付清',
    creditCardInfo: { number: ['1111', '2222', '3333', '4444'], exp: ['31', '01'], cvc: '123' },
  },
  purchaser: {
    name: '王小明',
    tel: '0912345678',
    email: 'plantique@test.com',
  },
  recipient: {
    name: '王小明',
    tel: '0912345678',
    email: 'plantique@test.com',
    address: '台北市信義區',
  },
  invoice: {
    method: '雲端載具',
    mobileBarcode: '/ABC1234',
    ubn: '',
  },
  notes: '',
};

// 購物車頁面各步驟 網頁標題
const stepTitle = ['購物車清單', '付款資料', '訂單確認'];
// 紀錄目前在哪一個步驟
let stepNow = 0;

// 分頁切換
const cartNavChildrenEl = document.querySelectorAll('#pills-cart-nav li button');

/****** 購物車清單畫面 開始 ******/

// 前往 付款資料畫面 按鈕
const btnNextCheckoutEl = document.getElementById('btn-next-checkout');
// 購物車商品清單
const cartListEl = document.getElementById('cart-list');
// 優惠券
const couponCodeEl = document.getElementById('coupon-code');
// 優惠券 Modal
const couponSelectedNameEl = document.getElementById('coupon-selected-name');
const couponCheckBtnEl = document.getElementById('coupon-check-btn');
const couponSelectedBtnEl = document.getElementById('coupon-choose-btn');

/******  購物車清單畫面 結束 ******/

// 滾動至頂部
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
// 切換 step 函式
async function switchStep(currentIndex, targetIndex, options = {}) {
  const { addCompleted = true, removeCompleted = false } = options;

  await scrollToTop(); // 等滾動完成

  const currentEl = cartNavChildrenEl[currentIndex];
  const targetEl = cartNavChildrenEl[targetIndex];

  await new Promise(resolve => {
    let resolved = false;

    const handleEnd = () => {
      if (resolved) return;
      resolved = true;
      bootstrap.Tab.getOrCreateInstance(targetEl).show();
      targetEl.classList.add('step-active');
      document.title = stepTitle[targetIndex];
      stepNow = targetIndex;
      resolve();
    };

    // 監聽 transitionend
    currentEl.addEventListener('transitionend', handleEnd, { once: true });
    currentEl.classList.remove('step-active');
    if (addCompleted) currentEl.classList.add('step-completed');
    if (removeCompleted) targetEl.classList.remove('step-completed');
  });
}

// 產生購物車商品列表
function loadProduct() {
  // 購物車沒有商品
  if (orderInfo.cart.length == 0) {
    loadNoProduct();
    return;
  }
  // 清空內容
  stepNow === 0 ? (cartListEl.innerHTML = '') : (confirmationListEl.innerHTML = '');
  // 新增內容
  for (const item of orderInfo.cart) {
    const li = loadProductItem(item);
    if (stepNow === 0) {
      cartListEl.appendChild(li);
    } else {
      confirmationListEl.appendChild(li);
    }
  }
}
// 購物車沒有產品
function loadNoProduct() {
  // 無法往下一步驟
  btnNextCheckoutEl.disabled = true;
  // 產生提示訊息
  const li = document.createElement('li');
  li.classList.add('text-center');
  li.innerHTML = `
      <p class="text-neutral-600 my-15">購物車尚未加入商品</p>
      <a href="#" class="btn btn-outline-neutral-400 rounded-pill py-3 px-5"
        >前往選購商品</a
      >`;
  cartListEl.appendChild(li);
}
// 購物車商品列表內容
function loadProductItem(item) {
  const li = document.createElement('li');

  const outerDiv = document.createElement('div');
  outerDiv.classList.add('row', 'gx-3', 'gx-lg-6');

  // img
  const image = images.filter(img => img.name === item.name);
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('col-6', 'col-lg-3');
  const img = document.createElement('img');
  img.classList.add('cart-product-img', 'w-100');
  item.type === 'add-on' ? img.classList.add('add-on') : null;
  image[0]?.source ? img.classList.add('object-fit-cover') : img.classList.add('d-block');
  image[0]?.position ? img.classList.add(image[0]?.position) : null;
  image[0]?.source ? (img.src = image[0]?.source) : null;
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
  subtotalDiv.classList.add('d-flex', 'justify-content-between', 'col-lg-4', 'pe-lg-6', 'mb-md-0');
  if (stepNow === 0) {
    subtotalDiv.classList.add('mb-3');
  }
  subtotalDiv.innerHTML = `<p class="d-lg-none fs-sm text-neutral-400">小計</p>`;
  const subtotalP = document.createElement('p');
  subtotalP.classList.add('fs-7', 'fw-bold', 'lh-sm', 'fs-lg-6', 'noto-serif-tc', 'text-primary-700');
  subtotalP.textContent = `NT$${(item.salePrice * item.count).toLocaleString()}`;
  subtotalDiv.appendChild(subtotalP);

  // button
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('d-flex', 'align-items-center', 'col-lg-4', 'pe-lg-6');
  if (stepNow === 0) {
    btnWrapper.classList.add('mt-auto', 'mt-lg-0');
  } else {
    btnWrapper.classList.add('justify-content-between', 'order-lg-1', 'mb-3', 'mb-lg-0', 'mt-auto', 'mt-lg-0');
    btnWrapper.innerHTML = `<p class="d-lg-none fs-sm text-neutral-400">數量</p>`;
  }
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
    'text-black',
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

      updateOrderAmount(true);
    }
  });
  decreaseBtn.addEventListener('click', () => {
    item.count++;
    subtotalP.textContent = `NT$${(item.salePrice * item.count).toLocaleString()}`;
    quantity.textContent = item.count;

    updateOrderAmount(false);
  });
  deleteBtn.addEventListener('click', () => {
    // 刪除畫面商品
    cartListEl.removeChild(li);
    // 刪除訂單購物車紀錄
    orderInfo.cart.splice(
      orderInfo.cart.findIndex(orderCartItem => orderCartItem.name === item.name),
      1,
    );
    if (orderInfo.cart.length === 0) {
      loadNoProduct();
    }

    updateOrderAmount(true);
  });
  if (stepNow === 0) {
    btnWrapper.appendChild(increaseBtn);
  }
  btnWrapper.appendChild(quantity);
  if (stepNow === 0) {
    btnWrapper.appendChild(decreaseBtn);
    btnWrapper.appendChild(deleteBtn);
  }

  innerDiv.appendChild(infoDiv);
  if (stepNow === 0) {
    innerDiv.appendChild(subtotalDiv);
    innerDiv.appendChild(btnWrapper);
  } else {
    innerDiv.appendChild(btnWrapper);
    innerDiv.appendChild(subtotalDiv);
  }

  outerDiv.appendChild(imgDiv);
  outerDiv.appendChild(innerDiv);

  li.appendChild(outerDiv);

  return li;
}

// 產生優惠券列表
function loadCoupon() {
  const couponModalListEl = document.getElementById('couponModalList');
  // 清除優惠券列表內容
  couponModalListEl.innerHTML = '';
  // 新增優惠券內容
  couponMenu.forEach(coupon => {
    // 已被選取的優惠券不會出現在列表中
    if (!coupon.state && coupon.minimumSpend <= orderInfo.total) {
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
      // 更新訂單紀錄
      orderInfo.discount = coupon.discount;
      orderInfo.coupon = coupon;
      // 移除優惠券清單狀態
      couponMenu.forEach(coupon => coupon.state && (coupon.state = ''));
      // 更新優惠券
      coupon.state = 'selected';
      // 更新畫面
      renderCartCoupon(true, coupon);
    } else {
      // 更新訂單紀錄
      orderInfo.discount = 0;
      delete orderInfo.coupon;
      // 更新優惠券
      coupon.state = '';
      // 更新畫面，移除已選擇優惠券
      renderCartCoupon(false);
    }
    loadCoupon();
    updateOrderAmount(false);
  });
  return outerDiv;
}

// 更新訂單紀錄金額
function updateOrderAmount(checkCoupon = false) {
  // 更新訂單紀錄
  orderInfo.subtotal = orderInfo.cart.reduce((prev, current) => (prev += current.salePrice * current.count), 0);
  orderInfo.discount = orderInfo.coupon ? orderInfo.coupon.discount : 0;
  orderInfo.total = orderInfo.subtotal - orderInfo.discount;

  // 確認優惠券是否還可使用
  if (checkCoupon) {
    if (orderInfo.coupon && orderInfo.coupon.minimumSpend >= orderInfo.total) {
      // 清除優惠券選取狀態
      couponMenu.forEach(coupon => coupon.state && (coupon.state = ''));

      // 重新更新訂單紀錄
      orderInfo.discount = 0;
      delete orderInfo.coupon;
      orderInfo.total = orderInfo.subtotal;

      // 更新畫面
      renderCartCoupon(false);
    }
  }

  // 更新畫面
  renderOrderSummaryDisplay();
}

// 更新購物車清單「訂單明細」
function renderOrderSummaryDisplay() {
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDiscountEl = document.getElementById('cart-discount');
  const cartTotalEl = document.getElementById('cart-total');

  cartSubtotalEl.textContent = `NT$ ${orderInfo.subtotal.toLocaleString()}`;
  cartDiscountEl.textContent = `- NT$ ${orderInfo.discount.toLocaleString()}`;
  cartTotalEl.textContent = `NT$ ${orderInfo.total.toLocaleString()}`;
}
// 更新購物車清單「優惠券」
function renderCartCoupon(hasSelected, coupon) {
  const couponModalSelectedEl = document.getElementById('couponModalSelected');
  couponModalSelectedEl.innerHTML = '';
  if (hasSelected) {
    // 更新 Modal
    couponModalSelectedEl.classList.remove('unselected');
    couponModalSelectedEl.appendChild(loadCouponItem(coupon), false);
    // 更新購物車清單畫面「使用優惠券」區塊
    couponSelectedNameEl.textContent = coupon.name;
    couponSelectedNameEl.classList.add('selected');
    couponSelectedBtnEl.textContent = '編輯';
  } else {
    // 更新 Modal，移除已選擇優惠券
    couponModalSelectedEl.classList.add('unselected');
    // 更新購物車清單畫面「使用優惠券」區塊
    couponSelectedNameEl.textContent = '未選擇優惠';
    couponSelectedNameEl.classList.remove('selected');
    couponSelectedBtnEl.textContent = '選擇';
  }
}
function renderCouponFeedback(display, isDanger, feedbackText) {
  const addArr = [];
  const removeArr = [];
  const couponFeedbackEl = document.getElementById('coupon-feedback');

  if (display) {
    removeArr.push('d-none');
    if (isDanger) {
      addArr.push('text-danger');
      removeArr.push('text-success');
    } else {
      addArr.push('text-success');
      removeArr.push('text-danger');
    }
  } else {
    addArr.push('d-none');
    removeArr.push('text-success');
    removeArr.push('text-danger');
  }

  couponFeedbackEl.classList.remove(...removeArr);
  couponFeedbackEl.classList.add(...addArr);
  couponFeedbackEl.textContent = feedbackText;
  if (!display) {
    couponCodeEl.value = '';
  }
}

// 購物車清單 → 產生購物車商品列表
loadProduct();
// 購物車清單 → 重新計算訂單紀錄
updateOrderAmount(false);

// 購物車清單 → 按鈕事件：使用優惠券區塊「確認」，檢核輸入優惠券代碼是否正確
couponCheckBtnEl.addEventListener('click', () => {
  if (couponCodeEl.value.trim() === '') {
    renderCouponFeedback(true, true, '未輸入優惠代碼');
    return;
  }

  const matchCoupon = couponMenu.filter(coupon => coupon.code === couponCodeEl.value.trim());
  if (matchCoupon.length === 1) {
    if (couponSelectedNameEl.textContent === matchCoupon[0].name) {
      renderCouponFeedback(true, false, '此優惠代碼已套用');
    } else if (orderInfo.subtotal < matchCoupon[0].minimumSpend) {
      renderCouponFeedback(true, true, '此優惠代碼未符合使用條件');
    } else {
      couponMenu.map(coupon => (coupon.state = ''));
      // 更新優惠券清單紀錄
      matchCoupon[0].state = 'selected';
      // 更新訂單紀錄
      orderInfo.discount = matchCoupon[0].discount;
      orderInfo.coupon = matchCoupon[0];

      // 更新畫面
      renderCartCoupon(true, matchCoupon[0]);
      // 隱藏優惠券提示訊息
      renderCouponFeedback(false, false, '');

      // 重新計算金額
      updateOrderAmount(true);
    }
  } else {
    renderCouponFeedback(true, true, '查無此優惠代碼');
  }
});

// 購物車清單 → 按鈕事件：使用優惠券區塊「選擇」，點擊產生優惠券列表
couponSelectedBtnEl.addEventListener('click', () => {
  // 更新畫面
  renderCouponFeedback(false, false, '');
  // 更新 Modal 優惠券列表
  loadCoupon();
});

// 購物車清單 → 按鈕事件：前往結帳
btnNextCheckoutEl.addEventListener('click', async () => {
  // 跳至付款資料畫面
  await switchStep(0, 1);

  // 隱藏提示訊息
  renderCouponFeedback(false, false, '');
});
