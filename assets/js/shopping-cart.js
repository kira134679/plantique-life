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
    minimumSpend: 250,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'aaaAAA',
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
    code: 'P5R1Y4',
    state: '',
  },
];

// 付款資料 (先這樣定義，之後再確認可用性)
const orderInfo = {
  delivery: {
    method: '黑貓宅配',
  },
  payment: {
    method: '信用卡一次付清',
    creditCardInfo: { number: ['4444', '4444', '4444', '4444'], exp: ['01', '12'], cvc: '123' },
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
    address: '台北市信義區松仁路100號',
  },
  invoice: {
    method: '雲端載具',
    mobileBarcode: '/ABCD123',
    ubn: '',
  },
};

const stepTitle = ['購物車清單', '付款資料', '訂單確認'];

const btnNextCheckoutEl = document.getElementById('btn-next-checkout');
const btnBackCartEl = document.getElementById('btn-back-cart');
const btnNextConfirmationEl = document.getElementById('btn-next-confirmation');

const cartNavChildrenEl = document.querySelectorAll('#pills-cart-nav li button');
const cartListEl = document.getElementById('cart-list');

const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartDiscountEl = document.getElementById('cart-discount');
const cartTotalEl = document.getElementById('cart-total');

const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
const checkoutDiscountEl = document.getElementById('checkout-discount');
const checkoutTotalEl = document.getElementById('checkout-total');

const couponModalListEl = document.getElementById('couponModalList');
const couponSelectedNameEl = document.getElementById('coupon-selected-name');
const couponSelectedBtnEl = document.getElementById('coupon-choose-btn');
const couponModalSelectedEl = document.getElementById('couponModalSelected');

const dropdownEls = document.querySelectorAll('.dropdown');
const cloudInvoiceCarrierEl = document.getElementById('cloud-invoice-carrier');
const ubnWrapperEl = document.getElementById('ubn-wrapper');
const recipientCheckedEl = document.getElementById('recipient-checked');
const creditcardFormEl = document.getElementById('creditcard-form');
const creditcardInputEls = creditcardFormEl.querySelectorAll('input');
const checkoutNotesEl = document.getElementById('checkout-notes');

// 訂購人資料
const purchaserNameEl = document.getElementById('purchaser-name');
const purchaserPhoneEl = document.getElementById('purchaser-phone');
const purchaserEmailEl = document.getElementById('purchaser-email');
// 收貨人資料
const recipientNameEl = document.getElementById('recipient-name');
const recipientPhoneEl = document.getElementById('recipient-phone');
const recipientEmailEl = document.getElementById('recipient-email');

// demo 按鈕
const demoBtnEl = document.getElementById('demo-btn');

let subtotal = 0;
let discount = 0;
let total = 0;

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

// 產生購物車商品列表
function loadProduct() {
  if (cartMenu.length == 0) {
    loadNoProduct();
    return;
  }
  for (const item of cartMenu) {
    const li = loadProductItem(item);
    cartListEl.appendChild(li);
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
      amountDisplay(true);
    }
  });
  decreaseBtn.addEventListener('click', () => {
    item.count++;
    subtotalP.textContent = `NT$${(item.salePrice * item.count).toLocaleString()}`;
    quantity.textContent = item.count;

    subtotal += item.salePrice;
    amountDisplay(false);
  });
  deleteBtn.addEventListener('click', () => {
    subtotal -= item.salePrice * item.count;

    amountDisplay(true);

    cartListEl.removeChild(li);
    cartMenu.splice(
      cartMenu.findIndex(old => old.name !== item.name),
      1,
    );
    if (cartMenu.length === 0) {
      loadNoProduct();
    }
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
    if (!coupon.state && coupon.minimumSpend <= total) {
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
    amountDisplay(false);
  });
  return outerDiv;
}

// 更新購物車清單「訂單明細」
function amountDisplay(checkCoupon = false) {
  total = subtotal - discount;

  if (checkCoupon) {
    // 確認優惠券是否還可使用
    const couponSelected = couponMenu.filter(coupon => coupon.state === 'selected');
    if (couponSelected.length > 0 && couponSelected[0].minimumSpend >= total) {
      // 清除優惠券選取狀態
      couponSelected[0].state = '';
      // 優惠券 Modal 清除已選取
      couponModalSelectedEl.classList.add('unselected');
      couponModalSelectedEl.innerHTML = '';
      // 更新畫面上「使用優惠券」區塊資訊
      couponSelectedNameEl.textContent = '未選擇優惠';
      couponSelectedNameEl.classList.remove('selected');
      couponSelectedBtnEl.textContent = '選擇';
      // 更新紀錄數據
      discount = 0;
      total = subtotal - discount;
    }
  }

  // 訂單明細
  cartSubtotalEl.textContent = `NT$ ${subtotal.toLocaleString()}`;
  cartDiscountEl.textContent = `- NT$ ${discount.toLocaleString()}`;
  cartTotalEl.textContent = `NT$ ${total.toLocaleString()}`;
}

// 切換 step 函式
async function switchStep(currentIndex, targetIndex, options = {}) {
  const { addCompleted = true, removeCompleted = false } = options;

  await scrollToTop(); // 等滾動完成

  const currentEl = cartNavChildrenEl[currentIndex];
  const targetEl = cartNavChildrenEl[targetIndex];

  currentEl.addEventListener(
    'transitionend',
    () => {
      bootstrap.Tab.getOrCreateInstance(targetEl).show();
      targetEl.classList.add('step-active');
      document.title = stepTitle[targetIndex];
    },
    { once: true },
  );

  currentEl.classList.remove('step-active');
  if (addCompleted) currentEl.classList.add('step-completed');
  if (removeCompleted) targetEl.classList.remove('step-completed');
}

// 檢核 dropdown
function chackDropdownValidity(dropdown) {
  const dropdownToggleEl = dropdown.querySelector('.dropdown-toggle');
  if (dropdownToggleEl.textContent.trim() === dropdownToggleEl.dataset.initialText) {
    return false;
  }
  return true;
}

// 購物車清單 → 產生購物車商品列表
loadProduct();
// 購物車清單 → 更新訂單明細
amountDisplay(false);

// 購物車清單 → 按鈕事件：使用優惠券區塊「選擇」，點擊產生優惠券列表
couponSelectedBtnEl.addEventListener('click', () => loadCoupon());

// 購物車清單 → 按鈕事件：前往結帳
btnNextCheckoutEl.addEventListener('click', () => {
  // 付款資料
  checkoutSubtotalEl.textContent = `NT$ ${subtotal.toLocaleString()}`;
  checkoutDiscountEl.textContent = `- NT$ ${discount.toLocaleString()}`;
  checkoutTotalEl.textContent = `NT$ ${total.toLocaleString()}`;

  switchStep(0, 1);
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
btnNextConfirmationEl.addEventListener('click', () => {
  let formCheck = true;
  // 檢核表單內容 (Bootstrap)
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      formCheck = false;
      return;
    }
  });

  // 檢核下拉選單
  dropdownEls.forEach(dropdown => {
    const checkDropdown = chackDropdownValidity(dropdown);
    if (dropdown.classList.contains('was-validated')) {
      // 非第一次檢核，檢核成功 class 加上 valid
      if (checkDropdown) {
        dropdown.classList.add('valid');
      } else {
        formCheck = false;
      }
    } else {
      // 第一次檢核，檢核到有錯誤，class 加上 was-validated
      if (!checkDropdown) {
        dropdown.classList.add('was-validated');
        formCheck = false;
      }
    }
  });

  // 資料儲存

  // 往下一步驟
  if (formCheck) switchStep(1, 2);
});

// 付款資料 → 按鈕事件：回購物車
btnBackCartEl.addEventListener('click', () => {
  switchStep(1, 0, { addCompleted: false, removeCompleted: true });

  // 清除欄位資料
  setTimeout(() => {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.classList.remove('was-validated');
      const inputELs = form.querySelectorAll('input');
      inputELs.forEach(inputEl => (inputEl.value = ''));
    });
    dropdownEls.forEach(dropdown => {
      dropdown.classList.remove('valid', 'was-validated');
      const toggleEl = dropdown.querySelector('.dropdown-toggle');
      toggleEl.textContent = toggleEl.dataset.initialText;
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
    // 同訂購人資料 checkbox
    recipientCheckedEl.checked = false;
    recipientNameEl.disabled = false;
    recipientPhoneEl.disabled = false;
    recipientEmailEl.disabled = false;
    // 備註
    checkoutNotesEl.value = '';
  }, 600);
});

// 付款資料 → 調整所有 dropdown 的 click 事件，點擊選項會更新 dropdown-toggle
dropdownEls.forEach(dropdown => {
  const dropdownToggleEl = dropdown.querySelector('.dropdown-toggle');
  const dropdownItemEls = dropdown.querySelectorAll('.dropdown-item');
  dropdownItemEls.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      dropdownToggleEl.textContent = item.textContent; // 選到的文字顯示在按鈕上
      if (dropdownToggleEl.id === 'invoice-toggle') {
        // 若選擇「雲端載具」要讓使用者輸入手機條碼
        if (item.id === 'mobile-barcode-item') {
          cloudInvoiceCarrierEl.style.display = 'block';
          cloudInvoiceCarrierEl.querySelector('input').disabled = false;
        } else {
          cloudInvoiceCarrierEl.style.display = 'none';
          cloudInvoiceCarrierEl.querySelector('input').disabled = true;
        }
        // 若選擇「雲端載具」要讓使用者輸入手機條碼
        if (item.id === 'ubn-item') {
          ubnWrapperEl.style.display = 'block';
          ubnWrapperEl.querySelector('input').disabled = false;
        } else {
          ubnWrapperEl.style.display = 'none';
          ubnWrapperEl.querySelector('input').disabled = true;
        }
      }
      // 若選擇「信用卡一次付清」要讓使用者輸入信用卡資訊
      if (dropdownToggleEl.id === 'payment-toggle') {
        if (item.textContent === '信用卡一次付清') {
          creditcardFormEl.style.display = 'block';
          creditcardInputEls.forEach(creditcardInputEl => (creditcardInputEl.disabled = false));
        } else {
          creditcardFormEl.style.display = 'none';
          creditcardInputEls.forEach(creditcardInputEl => (creditcardInputEl.disabled = true));
        }
      }
      // 若要檢核，則判斷 button 是否有選擇 item
      if (dropdown.classList.contains('was-validated')) {
        if (dropdownToggleEl.textContent !== dropdownToggleEl.dataset.initialText) {
          dropdown.classList.add('valid');
        }
      }
    });
  });
});

// 付款資料 → 同訂購人資料 checkbox 事件
recipientCheckedEl.addEventListener('change', e => {
  if (e.target.checked) {
    recipientNameEl.value = purchaserNameEl.value;
    recipientNameEl.disabled = true;
    recipientPhoneEl.value = purchaserPhoneEl.value;
    recipientPhoneEl.disabled = true;
    recipientEmailEl.value = purchaserEmailEl.value;
    recipientEmailEl.disabled = true;
  } else {
    recipientNameEl.disabled = false;
    recipientPhoneEl.disabled = false;
    recipientEmailEl.disabled = false;
  }
});

// 付款資料 → 若同訂購人資料的 checkbox 有勾選，則收貨人資料同步更新訂購人資料
purchaserNameEl.addEventListener('input', () => {
  if (recipientCheckedEl.checked) {
    recipientNameEl.value = purchaserNameEl.value;
  }
});
purchaserPhoneEl.addEventListener('input', () => {
  if (recipientCheckedEl.checked) {
    recipientPhoneEl.value = purchaserPhoneEl.value;
  }
});
purchaserEmailEl.addEventListener('input', () => {
  if (recipientCheckedEl.checked) {
    recipientEmailEl.value = purchaserEmailEl.value;
  }
});

// 付款資料 → demo 按鈕事件：自動填入資料
demoBtnEl.addEventListener('click', e => {
  e.stopPropagation();
  // 運送方式
  const deliveryToggleEl = document.getElementById('delivery-toggle');
  deliveryToggleEl.textContent = orderInfo.delivery.method;
  // 付款方式
  const paymentToggleEl = document.getElementById('payment-toggle');
  paymentToggleEl.textContent = orderInfo.payment.method;
  creditcardFormEl.style.display = 'block';
  creditcardInputEls.forEach(creditcardInputEl => (creditcardInputEl.disabled = false));
  const cardNumberEls = document.querySelectorAll('[id^="card-number-"]');
  cardNumberEls.forEach((cardNumberEl, idx) => {
    cardNumberEl.value = orderInfo.payment.creditCardInfo.number[idx];
  });
  const cardExpEls = document.querySelectorAll('[id^="card-exp-"]');
  cardExpEls.forEach((cardExpEl, idx) => {
    cardExpEl.value = orderInfo.payment.creditCardInfo.exp[idx];
  });
  const cardCVCEl = document.getElementById('card-cvc');
  cardCVCEl.value = orderInfo.payment.creditCardInfo.cvc;
  // 訂購人資料
  purchaserNameEl.value = orderInfo.purchaser.name;
  purchaserPhoneEl.value = orderInfo.purchaser.tel;
  purchaserEmailEl.value = orderInfo.purchaser.email;
  // 收貨人資料
  recipientCheckedEl.checked = true;
  recipientNameEl.disabled = true;
  recipientPhoneEl.disabled = true;
  recipientEmailEl.disabled = true;
  recipientNameEl.value = orderInfo.recipient.name;
  recipientPhoneEl.value = orderInfo.recipient.tel;
  recipientEmailEl.value = orderInfo.recipient.email;
  const recipientAddressEl = document.getElementById('recipient-address');
  recipientAddressEl.value = orderInfo.recipient.address;
  // 發票類型
  const invoiceToggleEl = document.getElementById('invoice-toggle');
  invoiceToggleEl.textContent = orderInfo.invoice.method;
  cloudInvoiceCarrierEl.style.display = 'block';
  cloudInvoiceCarrierEl.querySelector('input').disabled = false;
  const mobileBarcodeEl = document.getElementById('mobile-barcode');
  mobileBarcodeEl.value = orderInfo.invoice.mobileBarcode;
});
