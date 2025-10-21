import '../scss/shopping-cart.scss';

import * as bootstrap from 'bootstrap';
import IMask from 'imask';
import * as zod from 'zod';

// 載入圖片
import product11 from '../images/img_product_11.png';
import product13 from '../images/img_product_13.png';
import productAdd1 from '../images/img_product_add_01.png';
const images = [
  { source: product13, name: '荒原綠影' },
  { source: product11, name: '垂綠星河' },
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
  deliveryFee: 0,
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
// 運費
const deliveryFee = 120;
// 使用者是否確認購物車以及付款資訊
let isConfirmed = false;

// 紀錄輸入欄位 zod 檢核規則以及是否需要檢核 (needCheck)
const userSchema = {
  delivery: {
    id: 'delivery-toggle',
    schema: zod.string().refine(val => val !== '請選擇運送方式', '未選擇運送方式'),
    needCheck: true,
  },
  payment: {
    id: 'payment-toggle',
    schema: zod.string().refine(val => val !== '請選擇付款方式', '未選擇付款方式'),
    needCheck: true,
  },
  cardNumber: {
    id: 'card-number',
    schema: zod
      .string()
      .regex(/^\d{4}(?: \d{4}){3}$/, '卡號輸入錯誤')
      .min(1, '未輸入信用卡號'),
    needCheck: false,
  },
  cardExp: {
    id: 'card-exp',
    schema: zod
      .string()
      .regex(/\d{2}\/\d{2}/, '有效期限輸入錯誤')
      .min(1, '未輸入有效期限'),
    needCheck: false,
  },
  cardCvc: {
    id: 'card-cvc',
    schema: zod.string().regex(/\d{3}/, '末三碼輸入錯誤').min(1, '未輸入末三碼'),
    needCheck: false,
  },
  purchaserName: {
    id: 'purchaser-name',
    schema: zod.string().max(20, '訂購人姓名最長為 20').min(1, '未輸入訂購人姓名'),
    needCheck: true,
  },
  purchaserPhone: {
    id: 'purchaser-phone',
    schema: zod
      .string()
      .regex(/^09\d{2}(?:-\d{3}){2}$/, '訂購人電話輸入錯誤')
      .min(1, '未輸入訂購人電話'),
    needCheck: true,
  },
  purchaserEmail: {
    id: 'purchaser-email',
    schema: zod.email('訂購人電子郵件輸入錯誤').min(1, '未輸入訂購人電子郵件'),
    needCheck: true,
  },
  recipientName: {
    id: 'recipient-name',
    schema: zod.string().max(20, '收件人姓名長度為 20').min(1, '未輸入收件人姓名'),
    needCheck: true,
  },
  recipientPhone: {
    id: 'recipient-phone',
    schema: zod
      .string()
      .regex(/^09\d{2}(?:-\d{3}){2}$/, '收件人電話輸入錯誤')
      .min(1, '未輸入收件人電話'),
    needCheck: true,
  },
  recipientEmail: {
    id: 'recipient-email',
    schema: zod.email('收件人電子郵件輸入錯誤').min(1, '未輸入收件人電子郵件'),
    needCheck: true,
  },
  recipientAddress: {
    id: 'recipient-address',
    schema: zod.string().min(1, '未輸入收件人地址'),
    needCheck: true,
  },
  invoice: {
    id: 'invoice-toggle',
    schema: zod.string().refine(val => val !== '請選擇發票類型', '未選擇發票類型'),
    needCheck: true,
  },
  mobileBarcode: {
    id: 'mobile-barcode',
    schema: zod
      .string()
      .length(8, '手機條碼輸入錯誤')
      .regex(/^\/[0-9A-Z.\-\+]{7}$/, '手機條碼輸入錯誤')
      .min(1, '未輸入手機條碼'),
    needCheck: false,
  },
  ubn: {
    id: 'ubn',
    schema: zod.string().regex(/\d{8}/, '統一編號輸入錯誤').min(1, '未輸入統一編號'),
    needCheck: false,
  },
};

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

/******  付款資料畫面 開始 ******/

// 返回 購物車清單畫面 按鈕
const btnBackCartDesktopEl = document.getElementById('btn-back-cart-desktop');
const btnBackCartMobileEl = document.getElementById('btn-back-cart-mobile');
// 前往 訂單確認畫面 按鈕
const btnNextCompletedDesktopEl = document.getElementById('btn-next-completed-desktop');
const btnNextCompletedMobileEl = document.getElementById('btn-next-completed-mobile');
// 訂單明細
const checkoutDeliveryFeeEl = document.getElementById('checkout-delivery-fee');
const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
const checkoutDiscountEl = document.getElementById('checkout-discount');
const checkoutTotalEl = document.getElementById('checkout-total');
// 下拉選單
const dropdownEls = document.querySelectorAll('.dropdown');
const deliveryToggleEl = document.getElementById('delivery-toggle');
const paymentToggleEl = document.getElementById('payment-toggle');
const invoiceToggleEl = document.getElementById('invoice-toggle');
// 信用卡
const creditcardFormEl = document.getElementById('creditcard-form');
const creditcardInputEls = creditcardFormEl.querySelectorAll('input');
const cardNumberEl = document.getElementById('card-number');
const cardExpEl = document.getElementById('card-exp');
const cardCvcEl = document.getElementById('card-cvc');
// 訂購人資料
const purchaserNameEl = document.getElementById('purchaser-name');
const purchaserPhoneEl = document.getElementById('purchaser-phone');
const purchaserEmailEl = document.getElementById('purchaser-email');
// 收件人資料
const recipientCheckedEl = document.getElementById('recipient-checked');
const recipientNameEl = document.getElementById('recipient-name');
const recipientPhoneEl = document.getElementById('recipient-phone');
const recipientEmailEl = document.getElementById('recipient-email');
const recipientAddressEl = document.getElementById('recipient-address');
// 發票類型
const cloudInvoiceCarrierEl = document.getElementById('cloud-invoice-carrier');
const mobileBarcodeEl = document.getElementById('mobile-barcode');
const ubnWrapperEl = document.getElementById('ubn-wrapper');
const ubnEl = document.getElementById('ubn');
// 留言
const checkoutNotesTextEl = document.getElementById('checkout-notes-text');
// 購物車商品清單
const checkoutListEl = document.getElementById('checkout-list');
// IMask
const cardNumberMask = IMask(cardNumberEl, { mask: '0000 0000 0000 0000' });
const cardExpMask = IMask(cardExpEl, {
  mask: 'MM/YY',
  blocks: {
    MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
    YY: { mask: IMask.MaskedRange, from: 25, to: 99 },
  },
});
const cardCvcMask = IMask(cardCvcEl, { mask: '000' });
const purchaserPhoneMask = IMask(purchaserPhoneEl, { mask: '0000-000-000' });
const recipientPhoneMask = IMask(recipientPhoneEl, { mask: '0000-000-000' });
const ubnMask = IMask(ubnEl, { mask: '00000000' });
// 提醒 Modal
const confirmModalEl = document.getElementById('confirmModal');
const confirmModal = new bootstrap.Modal(confirmModalEl);
const confirmModalNameEl = document.getElementById('confirmModalName');
const confirmModalPhoneEl = document.getElementById('confirmModalPhone');
const confirmModalAddressEl = document.getElementById('confirmModalAddress');
const confirmModalCheckBtnEl = document.getElementById('confirmModalCheckBtn');

/****** 付款資料畫面 結束 ******/

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
function renderProductList(listEl, cartList, step, nextBtnEl) {
  // 確認參數
  if (![0, 1, 2].includes(step)) return;

  // 清空內容
  listEl.innerHTML = '';
  // 購物車沒有商品
  if (cartList.length == 0) {
    renderNoProduct(listEl, nextBtnEl);
    return;
  }
  // 新增內容
  const frag = document.createDocumentFragment();
  cartList.forEach((item, index) => {
    let li;
    switch (step) {
      case 0:
        li = renderProductItemInCart(item, index);
        break;
      case 1:
        li = renderProductItemInCheckout(item);
        break;
    }
    frag.appendChild(li);
  });
  listEl.appendChild(frag);
}
// 購物車沒有產品
function renderNoProduct(listEl, nextBtnEl) {
  // 無法往下一步驟
  nextBtnEl.disabled = true;
  // 產生提示訊息
  const li = document.createElement('li');
  li.classList.add('text-center');
  li.innerHTML = `
      <p class="text-neutral-600 my-15">購物車尚未加入商品</p>
      <a href="#" class="btn btn-outline-neutral-400 rounded-pill py-3 px-5"
        >前往選購商品</a
      >`;
  listEl.appendChild(li);
}
// 購物車商品列表內容
function renderProductItemInCart(item, index) {
  const li = document.createElement('li');
  li.dataset.index = index;

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('row', 'gx-3', 'gx-lg-6');

  // img
  const image = images.filter(img => img.name === item.name);
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('col-6', 'col-lg-3');
  const img = document.createElement('img');
  img.classList.add('cart-product-img', 'w-100');
  item.type === 'add-on' ? img.classList.add('add-on') : null;
  // 圖片來源
  image[0]?.source ? (img.src = image[0]?.source) : null;
  // 圖片 class
  image[0]?.source ? img.classList.add('object-fit-cover') : img.classList.add('d-block');
  image[0]?.position ? img.classList.add(image[0]?.position) : null;
  img.alt = item.name;
  imgDiv.appendChild(img);

  const outerDiv = document.createElement('div');
  outerDiv.classList.add('col-6', 'col-lg-9');
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('d-flex', 'flex-column', 'flex-lg-row', 'align-items-lg-center', 'h-100');

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
  subtotalP.dataset.action = 'subtotal';
  subtotalP.classList.add('fs-7', 'fw-bold', 'lh-sm', 'fs-lg-6', 'noto-serif-tc', 'text-primary-700');
  subtotalP.textContent = `NT$${(item.salePrice * item.count).toLocaleString()}`;
  subtotalDiv.appendChild(subtotalP);

  // button
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('d-flex', 'align-items-center', 'col-lg-4', 'pe-lg-6');
  btnWrapper.classList.add('mt-auto', 'mt-lg-0');
  const decreaseBtn = document.createElement('button');
  decreaseBtn.type = 'button';
  decreaseBtn.dataset.action = 'minus';
  decreaseBtn.classList.add('btn', 'custom-btn-outline-neutral', 'custom-btn-circle-sm', 'me-1');
  decreaseBtn.innerHTML = `<span class="material-symbols-rounded fs-6 fs-lg-5 d-block">remove</span>`;
  decreaseBtn.disabled = true;
  const quantity = document.createElement('span');
  quantity.dataset.action = 'quantity';
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
  const increaseBtn = document.createElement('button');
  increaseBtn.type = 'button';
  increaseBtn.dataset.action = 'add';
  increaseBtn.classList.add('btn', 'custom-btn-outline-neutral', 'custom-btn-circle-sm', 'me-1');
  increaseBtn.innerHTML = `<span class="material-symbols-rounded fs-6 fs-lg-5 d-block">add_2</span>`;
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.dataset.action = 'delete';
  deleteBtn.classList.add('btn', 'custom-btn-outline-danger', 'custom-btn-circle-sm', 'ms-auto');
  deleteBtn.innerHTML = `<span class="material-symbols-rounded fs-6 fs-lg-5 d-block text-danger">delete</span>`;

  btnWrapper.appendChild(decreaseBtn);
  btnWrapper.appendChild(quantity);
  btnWrapper.appendChild(increaseBtn);
  btnWrapper.appendChild(deleteBtn);

  innerDiv.appendChild(infoDiv);
  innerDiv.appendChild(subtotalDiv);
  innerDiv.appendChild(btnWrapper);

  outerDiv.appendChild(innerDiv);

  wrapperDiv.appendChild(imgDiv);
  wrapperDiv.appendChild(outerDiv);

  li.appendChild(wrapperDiv);

  return li;
}
function renderProductItemInCheckout(item) {
  const li = document.createElement('li');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('row', 'gx-3');

  // img
  const image = images.filter(img => img.name === item.name);
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('col-4');
  const img = document.createElement('img');
  img.classList.add('cart-product-img', 'w-100');
  item.type === 'add-on' ? img.classList.add('add-on') : null;
  // 圖片來源
  image[0]?.source ? (img.src = image[0]?.source) : null;
  // 圖片 class
  image[0]?.source ? img.classList.add('object-fit-cover') : img.classList.add('d-block');
  image[0]?.position ? img.classList.add(image[0]?.position) : null;
  img.alt = item.name;
  imgDiv.appendChild(img);

  const outerDiv = document.createElement('div');
  outerDiv.classList.add('col-8', 'my-auto');
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('d-flex', 'gap-2');

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('col-6', 'mb-1', 'mb-lg-0');
  infoDiv.innerHTML = `
    <h4 class="fs-7 fs-lg-6 text-neutral-700 noto-serif-tc text-nowrap mb-2">${item.name}</h4>
    <p class="fs-sm text-neutral-400">商品數量 : <span class="text-neutral-500">${item.count}</span></p>`;

  const subtotalDiv = document.createElement('div');
  subtotalDiv.classList.add('d-flex', 'justify-content-between', 'col-6', 'mb-md-0');
  // subtotalDiv.innerHTML = `<p class="d-lg-none fs-sm text-neutral-400">小計</p>`;
  const subtotalP = document.createElement('p');
  subtotalP.classList.add('fs-8', 'fw-bold', 'lh-sm', 'fs-lg-7', 'noto-serif-tc', 'text-primary-700');
  subtotalP.textContent = `NT$${(item.salePrice * item.count).toLocaleString()}`;
  subtotalDiv.appendChild(subtotalP);

  innerDiv.appendChild(infoDiv);
  innerDiv.appendChild(subtotalDiv);

  outerDiv.appendChild(innerDiv);

  wrapperDiv.appendChild(imgDiv);
  wrapperDiv.appendChild(outerDiv);

  li.appendChild(wrapperDiv);

  return li;
}

// 產生優惠券列表
function loadCoupon() {
  const couponModalListEl = document.getElementById('couponModalList');
  // 清除優惠券列表內容
  couponModalListEl.innerHTML = '';
  if (!couponMenu.length) return;

  // 新增優惠券內容
  const frag = document.createDocumentFragment();
  couponMenu.forEach(coupon => {
    // 已被選取的優惠券不會出現在列表中
    if (!coupon.state && coupon.minimumSpend <= orderInfo.total) {
      const li = document.createElement('li');
      const div = loadCouponItem(coupon, true);
      li.appendChild(div);
      frag.appendChild(li);
    }
  });
  couponModalListEl.appendChild(frag);
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

// 動態產生 schema
function createUserSchema() {
  const schemaFields = {};
  for (const [key, value] of Object.entries(userSchema)) {
    if (value.needCheck) schemaFields[key] = value.schema;
  }
  return zod.object(schemaFields);
}
// 檢核格式
function checkSchema(target, schemaShape) {
  // 父層加上檢核 class
  const parentEl = target.parentElement;
  parentEl.classList.add('zod-validated');
  // zod 檢核
  const result = userSchema[schemaShape].schema.safeParse(target.value);
  if (result.success) {
    target.classList.remove('is-invalid');
    target.classList.add('is-valid');
    return true;
  } else {
    target.classList.add('is-invalid');
    target.classList.remove('is-valid');
    const zodFeedbackEl = parentEl.querySelector('.zod-invalid-feedback');
    zodFeedbackEl.textContent = result.error.issues[0]?.message;
    return false;
  }
}
// 返回購物車
async function backToCart() {
  orderInfo.total = orderInfo.subtotal - orderInfo.discount;
  // 更新畫面
  renderOrderSummaryDisplay();

  await switchStep(1, 0, { addCompleted: false, removeCompleted: true });

  // 清除欄位資料
  cardCvcEl.textContent = '';
  // 移除檢核效果
  const zodValidatedEls = document.querySelectorAll('.zod-validated');
  zodValidatedEls.forEach(zodValidatedEl => {
    zodValidatedEl.classList.remove('zod-validated');
    const element = zodValidatedEl.querySelector('.is-valid, .is-invalid');
    if (element) element.classList.remove('is-valid', 'is-invalid');
  });
}
function confirmCheckoutData() {
  const zodSchema = createUserSchema();
  const inputData = {
    // 運送方式
    delivery: deliveryToggleEl.textContent.trim(),
    // 付款方式
    payment: paymentToggleEl.textContent.trim(),
    // 訂購人資料
    purchaserName: purchaserNameEl.value,
    purchaserPhone: purchaserPhoneEl.value,
    purchaserEmail: purchaserEmailEl.value,
    // 收件人姓名
    recipientName: recipientNameEl.value,
    recipientPhone: recipientPhoneEl.value,
    recipientEmail: recipientEmailEl.value,
    recipientAddress: recipientAddressEl.value,
    // 發票類型
    invoice: invoiceToggleEl.textContent.trim(),
  };
  // 信用卡
  if (userSchema.cardNumber.needCheck) inputData.cardNumber = cardNumberEl.value;
  if (userSchema.cardExp.needCheck) inputData.cardExp = cardExpEl.value;
  if (userSchema.cardCvc.needCheck) inputData.cardCvc = cardCvcEl.value;
  // 雲端載具
  if (userSchema.mobileBarcode.needCheck) inputData.mobileBarcode = mobileBarcodeEl.value;
  // 統一編號
  if (userSchema.ubn.needCheck) inputData.ubn = ubnEl.value;
  // 使用 zod 檢核欄位
  const result = zodSchema.safeParse(inputData);
  // 紀錄第一個輸入錯誤欄位 focus 狀態
  let firstFocusTarget = false;
  if (!result.success) {
    result.error.issues.forEach(issue => {
      const filtered = Object.fromEntries(Object.entries(userSchema).filter(([key]) => key === issue.path[0]));
      const id = Object.values(filtered)[0].id;
      const targetEl = document.getElementById(id);
      const parentEl = targetEl.parentElement;
      const feedbackEl = parentEl.querySelector('.zod-invalid-feedback');
      if (!firstFocusTarget) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.focus();
        firstFocusTarget = true;
      }
      parentEl.classList.add('zod-validated');
      targetEl.classList.add('is-invalid');
      feedbackEl.textContent = issue.message;
    });
    return;
  }

  if (!isConfirmed) confirmModal.show();
}
// 前往訂單完成
async function goToCompleted() {
  // 資料儲存
  orderInfo.delivery = deliveryToggleEl.textContent;
  orderInfo.payment.method = paymentToggleEl.textContent;
  if (paymentToggleEl.textContent === '信用卡一次付清') {
    cardNumberEl.value.split(' ').forEach((number, index) => {
      orderInfo.payment.creditCardInfo.number[index] = number;
    });
    cardExpEl.value.split('/').forEach((number, index) => {
      orderInfo.payment.creditCardInfo.exp[index] = number;
    });

    orderInfo.payment.creditCardInfo.cvc = cardCvcEl.value;
  }
  orderInfo.purchaser.name = purchaserNameEl.value;
  orderInfo.purchaser.tel = purchaserPhoneEl.value;
  orderInfo.purchaser.email = purchaserEmailEl.value;
  orderInfo.recipient.name = recipientNameEl.value;
  orderInfo.recipient.tel = recipientPhoneEl.value;
  orderInfo.recipient.email = recipientEmailEl.value;
  orderInfo.recipient.address = recipientAddressEl.value;
  orderInfo.invoice.method = invoiceToggleEl.textContent;
  if (invoiceToggleEl.textContent === '雲端載具') {
    orderInfo.invoice.mobileBarcode = mobileBarcodeEl.value;
  }
  if (invoiceToggleEl.textContent === '統一編號') {
    orderInfo.invoice.ubn = ubnEl.value;
  }
  orderInfo.notes = checkoutNotesTextEl.value;

  // 跳至訂單確認畫面
  await switchStep(1, 2);

  // 移除檢核效果
  const zodValidatedEls = document.querySelectorAll('.zod-validated');
  zodValidatedEls.forEach(zodValidatedEl => {
    zodValidatedEl.classList.remove('zod-validated');
    const validEl = zodValidatedEl.querySelector('.is-valid');
    if (validEl) validEl.classList.remove('is-valid');
  });
}

// 購物車清單 → 產生購物車商品列表
renderProductList(cartListEl, orderInfo.cart, 0, btnNextCheckoutEl);
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

// 購物車清單 → 商品按鈕
cartListEl.addEventListener('click', e => {
  // 取得 btn
  const btn = e.target.closest('button');
  if (!btn) return;

  const li = btn.closest('li');
  const quantityEl = li.querySelector('[data-action="quantity"]');
  const subtotalEl = li.querySelector('[data-action="subtotal"]');
  // 取得購物車
  const cartItem = orderInfo.cart[li.dataset.index];

  const action = btn.dataset.action;
  switch (action) {
    case 'add':
      cartItem.count++;
      subtotalEl.textContent = `NT$${(cartItem.salePrice * cartItem.count).toLocaleString()}`;
      quantityEl.textContent = cartItem.count;
      const decreaseBtnEl = li.querySelector('[data-action="minus"]');
      decreaseBtnEl.disabled = false;
      break;
    case 'minus':
      if (cartItem.count > 1) {
        cartItem.count--;
        subtotalEl.textContent = `NT$${(cartItem.salePrice * cartItem.count).toLocaleString()}`;
        quantityEl.textContent = cartItem.count;
      }
      if (cartItem.count <= 1) {
        btn.disabled = true;
      }
      break;
    case 'delete':
      // 刪除訂單購物車紀錄
      orderInfo.cart.splice(
        orderInfo.cart.findIndex(orderCartItem => orderCartItem.name === cartItem.name),
        1,
      );
      // 畫面更新
      renderProductList(e.currentTarget, orderInfo.cart, 0, btnNextCheckoutEl);
      break;
    default:
      return;
  }
  updateOrderAmount(true);
});

// 購物車清單 → 前往結帳 按鈕，點擊後前往 付款資料
btnNextCheckoutEl.addEventListener('click', async () => {
  // 付款資料畫面
  renderProductList(checkoutListEl, orderInfo.cart, 1);
  // 訂單明細
  orderInfo.total = orderInfo.subtotal + orderInfo.deliveryFee - orderInfo.discount;
  checkoutSubtotalEl.textContent = `NT$ ${orderInfo.subtotal.toLocaleString()}`;
  checkoutDeliveryFeeEl.textContent = `NT$ ${orderInfo.deliveryFee.toLocaleString()}`;
  checkoutDiscountEl.textContent = `- NT$ ${orderInfo.discount.toLocaleString()}`;
  checkoutTotalEl.textContent = `NT$ ${orderInfo.total.toLocaleString()}`;

  // 跳至付款資料畫面
  await switchStep(0, 1);

  // 隱藏提示訊息
  renderCouponFeedback(false, false, '');
});

// 付款資料 → 手機條碼，預設不顯示
cloudInvoiceCarrierEl.style.display = 'none';
cloudInvoiceCarrierEl.querySelector('input').disabled = true;
// 付款資料 → 統一編號，預設不顯示
ubnWrapperEl.style.display = 'none';
ubnWrapperEl.querySelector('input').disabled = true;
// 付款資料 → 信用卡資訊，預設不顯示
creditcardFormEl.style.display = 'none';
creditcardInputEls.forEach(creditcardInputEl => (creditcardInputEl.disabled = true));

// 付款資料 → 按鈕事件：下一步
btnNextCompletedDesktopEl.addEventListener('click', confirmCheckoutData);
btnNextCompletedMobileEl.addEventListener('click', confirmCheckoutData);

// 付款資料 → 按鈕事件：返回購物車
btnBackCartDesktopEl.addEventListener('click', backToCart);
btnBackCartMobileEl.addEventListener('click', backToCart);

// 付款資料 → 調整所有 dropdown 的 click 事件，點擊選項會更新 dropdown-toggle
dropdownEls.forEach(dropdown => {
  const dropdownToggleEl = dropdown.querySelector('.dropdown-toggle');
  const dropdownMenuEl = dropdown.querySelector('.dropdown-menu');
  dropdownMenuEl.addEventListener('click', e => {
    const aEl = e.target.closest('a');
    if (aEl) {
      e.preventDefault();
      dropdownToggleEl.textContent = aEl.textContent; // 選到的文字顯示在按鈕上
      dropdownToggleEl.classList.remove('text-neutral-500');
      dropdownToggleEl.classList.add('text-neutral-700');
      if (dropdownToggleEl.id === 'delivery-toggle') {
        // 若選擇「黑貓宅配」要顯示運費
        if (aEl.id === 'yamato-transport') {
          orderInfo.deliveryFee = deliveryFee;
          orderInfo.total = orderInfo.subtotal + orderInfo.deliveryFee - orderInfo.discount;
          checkoutDeliveryFeeEl.textContent = `NT$ ${orderInfo.deliveryFee.toLocaleString()}`;
          checkoutTotalEl.textContent = `NT$ ${orderInfo.total.toLocaleString()}`;
        }
      } else if (dropdownToggleEl.id === 'invoice-toggle') {
        // 若選擇「雲端載具」要讓使用者輸入手機條碼
        if (aEl.id === 'mobile-barcode-item') {
          userSchema.mobileBarcode.needCheck = true;
          cloudInvoiceCarrierEl.style.display = 'block';
          cloudInvoiceCarrierEl.querySelector('input').disabled = false;
          mobileBarcodeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          mobileBarcodeEl.focus();
        } else {
          userSchema.mobileBarcode.needCheck = false;
          cloudInvoiceCarrierEl.style.display = 'none';
          cloudInvoiceCarrierEl.querySelector('input').disabled = true;
          // 移除檢核效果
          mobileBarcodeEl.classList.remove('is-valid', 'is-invalid');
          mobileBarcodeEl.parentElement.classList.remove('zod-validated');
        }
        // 若選擇「統一編號」要讓使用者輸入統一編號
        if (aEl.id === 'ubn-item') {
          userSchema.ubn.needCheck = true;
          ubnWrapperEl.style.display = 'block';
          ubnWrapperEl.querySelector('input').disabled = false;
          ubnEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          ubnEl.focus();
        } else {
          userSchema.ubn.needCheck = false;
          ubnWrapperEl.style.display = 'none';
          ubnWrapperEl.querySelector('input').disabled = true;
          // 移除檢核效果
          ubnEl.classList.remove('is-valid', 'is-invalid');
          ubnEl.parentElement.classList.remove('zod-validated');
        }
      } else if (dropdownToggleEl.id === 'payment-toggle') {
        // 若選擇「信用卡一次付清」要讓使用者輸入信用卡資訊
        if (aEl.id === 'credit-card-one-time-payment') {
          userSchema.cardNumber.needCheck = true;
          userSchema.cardExp.needCheck = true;
          userSchema.cardCvc.needCheck = true;
          creditcardFormEl.style.display = 'block';
          creditcardInputEls.forEach(creditcardInputEl => (creditcardInputEl.disabled = false));
          // 設定 focus 對象
          if (cardNumberEl.value === '') {
            cardNumberEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            cardNumberEl.focus();
          } else if (cardExpEl.value === '') {
            cardExpEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            cardExpEl.focus();
          } else {
            cardCvcEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            cardCvcEl.focus();
          }
        } else {
          userSchema.cardNumber.needCheck = false;
          userSchema.cardExp.needCheck = false;
          userSchema.cardCvc.needCheck = false;
          creditcardFormEl.style.display = 'none';
          creditcardInputEls.forEach(creditcardInputEl => (creditcardInputEl.disabled = true));
          // cvc 欄位清空
          cardCvcEl.value = '';
          // 移除檢核效果
          cardCvcEl.classList.remove('is-valid', 'is-invalid');
          cardCvcEl.parentElement.classList.remove('zod-validated');
        }
      }

      // 檢核是否符合 zod 設定條件
      if (dropdown.classList.contains('zod-validated')) {
        const filtered = Object.fromEntries(
          Object.entries(userSchema).filter(([key, value]) => value.id === dropdownToggleEl.id),
        );
        const schema = Object.values(filtered)[0].schema;
        const result = schema.safeParse(dropdownToggleEl.textContent);
        if (result.success) {
          dropdownToggleEl.classList.remove('is-invalid');
          dropdownToggleEl.classList.add('is-valid');
        }
      }
    }
  });
});

// 付款資料 → 同訂購人資料 checkbox 事件
recipientCheckedEl.addEventListener('change', e => {
  if (e.target.checked) {
    recipientNameEl.value = purchaserNameEl.value;
    confirmModalNameEl.textContent = purchaserNameEl.value;
    recipientNameEl.parentElement.classList.remove('zod-validated');
    recipientNameEl.classList.remove('is-invalid', 'is-valid');
    recipientNameEl.disabled = true;
    recipientPhoneEl.value = purchaserPhoneEl.value;
    confirmModalPhoneEl.textContent = purchaserPhoneEl.value;
    recipientPhoneEl.parentElement.classList.remove('zod-validated');
    recipientPhoneEl.classList.remove('is-invalid', 'is-valid');
    recipientPhoneEl.disabled = true;
    recipientEmailEl.value = purchaserEmailEl.value;
    recipientEmailEl.parentElement.classList.remove('zod-validated');
    recipientEmailEl.classList.remove('is-invalid', 'is-valid');
    recipientEmailEl.disabled = true;
  } else {
    recipientNameEl.disabled = false;
    recipientPhoneEl.disabled = false;
    recipientEmailEl.disabled = false;
  }
});

// 付款資料 → 信用卡
cardNumberMask.on('accept', e => {
  if (checkSchema(e.target, 'cardNumber') && e.target.selectionStart === 19) cardExpEl.focus();
});
cardExpMask.on('accept', e => {
  if (checkSchema(e.target, 'cardExp') && e.target.selectionStart === 5) cardCvcEl.focus();
});
cardCvcMask.on('accept', e => checkSchema(e.target, 'cardCvc'));
// 付款資料 → 訂購人姓名
purchaserNameEl.addEventListener('input', e => {
  // 檢核
  if (checkSchema(e.target, 'purchaserName')) {
    // 若同訂購人資料的 checkbox 有勾選，則收件人姓名同步訂購人姓名
    if (recipientCheckedEl.checked) {
      recipientNameEl.value = e.target.value;
      confirmModalNameEl.textContent = e.target.value;
    }
  }
});
// 付款資料 → 訂購人電話號碼
purchaserPhoneMask.on('accept', e => {
  // 檢核
  if (checkSchema(e.target, 'purchaserPhone')) {
    // 若同訂購人資料的 checkbox 有勾選，則收件人電話號碼同步訂購人電話號碼
    if (recipientCheckedEl.checked) {
      recipientPhoneEl.value = e.target.value;
      confirmModalPhoneEl.textContent = e.target.value;
    }
  }
});
// 付款資料 → 訂購人電子郵件
purchaserEmailEl.addEventListener('input', e => {
  // 檢核
  if (checkSchema(e.target, 'purchaserEmail')) {
    // 若同訂購人資料的 checkbox 有勾選，則收件人電子郵件同步訂購人電子郵件
    if (recipientCheckedEl.checked) {
      recipientEmailEl.value = e.target.value;
      confirmModalAddressEl.textContent = e.target.value;
    }
  }
});
// 付款資料 → 收件人姓名
recipientNameEl.addEventListener(
  'input',
  e => checkSchema(e.target, 'recipientName') && (confirmModalNameEl.textContent = e.target.value),
);
// 付款資料 → 收件人電話號碼
recipientPhoneMask.on(
  'accept',
  e => checkSchema(e.target, 'recipientPhone') && (confirmModalPhoneEl.textContent = e.target.value),
);
// 付款資料 → 收件人電子郵件
recipientEmailEl.addEventListener('input', e => checkSchema(e.target, 'recipientEmail'));
// 付款資料 → 收件人地址
recipientAddressEl.addEventListener(
  'input',
  e => checkSchema(e.target, 'recipientAddress') && (confirmModalAddressEl.textContent = e.target.value),
);
// 付款資料 → 手機條碼
mobileBarcodeEl.addEventListener('input', e => checkSchema(e.target, 'mobileBarcode'));
// 付款資料 → 統一編號
ubnMask.on('accept', e => checkSchema(e.target, 'ubn'));
// 付款資料 → 提醒 Modal 確認送出按鈕
confirmModalCheckBtnEl.addEventListener('click', () => {
  isConfirmed = true;
  confirmModal.hide();
  goToCompleted();
});
