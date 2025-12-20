import ProductCard from '../components/ProductCard';
// 之後由資料庫資料取得
import productImg07 from 'assets/images/products/img_product_07.png';
import productImg08 from 'assets/images/products/img_product_08.png';
import productImg09 from 'assets/images/products/img_product_09.png';
import productImg11 from 'assets/images/products/img_product_11.png';
import productImg13 from 'assets/images/products/img_product_13.png';
import productAddImg01 from 'assets/images/products/img_product_add_01.png';
import productAddImg02 from 'assets/images/products/img_product_add_02.png';
import productAddImg03 from 'assets/images/products/img_product_add_03.png';
import productAddImg04 from 'assets/images/products/img_product_add_04.png';
import productAddImg05 from 'assets/images/products/img_product_add_05.png';
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
      image: {
        src: productImg13,
        position: '',
      },
    },
    {
      type: 'product',
      name: '垂綠星河',
      originalPrice: 3600,
      salePrice: 3600,
      count: 1,
      image: {
        src: productImg11,
        position: '',
      },
    },
    {
      type: 'add-on',
      name: '噴霧器',
      originalPrice: 249,
      salePrice: 129,
      count: 1,
      image: {
        src: productAddImg01,
        position: 'product-add1-position',
      },
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
    creditCardInfo: { number: ['1111', '2222', '3333', '4444'], exp: ['01', '28'], cvc: '123' },
  },
  purchaser: {
    name: '王小明',
    tel: '0912-345-678',
    email: 'plantique@test.com',
  },
  recipient: {
    name: '王小明',
    tel: '0912-345-678',
    email: 'plantique@test.com',
    address: '台北市信義區松仁路100號',
  },
  invoice: {
    method: '雲端載具',
    mobileBarcode: '/ABC1234',
    ubn: '12345678',
  },
  notes: '',
};

function ShoppingCart() {
  return (
    <>
      <div className="container-fluid container-lg">
        <ol className="cart-nav nav nav-pills flex-nowrap py-8 py-lg-13" id="pills-cart-nav" role="tablist">
          <li className="nav-item col-4" role="presentation">
            <button
              className="nav-link w-100 d-flex flex-column align-items-center active step-active"
              id="pills-cart-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-cart"
              role="tab"
              aria-controls="pills-cart"
              aria-selected="true"
            >
              <p className="cart-step d-flex justify-content-center align-items-center h6 fs-lg-4 text-neutral-700 border border-2 rounded-circle mx-auto">
                1
              </p>
              <h3 className="fs-sm fs-lg-8 text-primary mt-2">Cart List</h3>
              <h2 className="h6 fs-lg-3 text-neutral-700 text-nowrap mt-2">購物車清單</h2>
              <div className="cart-progress"></div>
            </button>
          </li>
          <li className="nav-item col-4" role="presentation">
            <button
              className="nav-link w-100 d-flex flex-column align-items-center"
              id="pills-checkout-info-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-checkout-info"
              role="tab"
              aria-controls="pills-checkout-info"
              aria-selected="false"
            >
              <p className="cart-step d-flex justify-content-center align-items-center h6 fs-lg-4 text-neutral-700 border border-2 rounded-circle mx-auto">
                2
              </p>
              <h3 className="fs-sm fs-lg-8 text-primary text-nowrap mt-2">Checkout Info</h3>
              <h2 className="h6 fs-lg-3 text-neutral-700 mt-2">付款資料</h2>
              <div className="cart-progress"></div>
            </button>
          </li>
          <li className="nav-item col-4" role="presentation">
            <button
              className="nav-link w-100 text-center"
              id="pills-completed-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-completed"
              role="tab"
              aria-controls="pills-completed"
              aria-selected="false"
            >
              <p className="cart-step d-flex justify-content-center align-items-center h6 fs-lg-4 text-neutral-700 border border-2 rounded-circle mx-auto">
                3
              </p>
              <h3 className="fs-sm fs-lg-8 text-primary mt-2">Completed</h3>
              <h2 className="h6 fs-lg-3 text-neutral-700 mt-2">訂單完成</h2>
            </button>
          </li>
        </ol>
        <div className="tab-content py-12 py-lg-15" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-cart"
            role="tabpanel"
            aria-labelledby="pills-cart-tab"
            tabIndex="0"
          >
            <div className="row">
              <div className="col-lg-8">
                <div className="row gx-lg-6 text-neutral-400 py-2 py-lg-4">
                  <div className="col-lg-3">
                    <p>商品名稱</p>
                  </div>
                  <div className="d-none d-lg-block col-lg-9">
                    <div className="row gx-0">
                      <span className="col-lg-4 pe-lg-6"></span>
                      <p className="col-lg-4 pe-lg-6">商品小計</p>
                      <p className="col-lg-4 pe-lg-6">數量</p>
                    </div>
                  </div>
                </div>
                <ul className="cart-list list-unstyled border-top pt-6 pb-8" id="cart-list">
                  {orderInfo.cart.map((order, index) => (
                    <li data-index={index} key={order.name}>
                      <div className="row gx-3 gx-lg-6">
                        <div className="col-6 col-lg-3">
                          <img
                            className="cart-product-img w-100 object-fit-cover"
                            src={order.image.src}
                            alt={order.name}
                          />
                        </div>
                        <div className="col-6 col-lg-9">
                          <div className="d-flex flex-column flex-lg-row align-items-lg-center h-100">
                            <div className="col-lg-4 pe-lg-6">
                              <h4 className="h6 fs-lg-5 text-neutral-700 text-nowrap mb-1 mb-lg-2">{order.name}</h4>
                              <div className="d-flex mb-3 mb-lg-0 align-items-end">
                                <p className="fs-8 fs-lg-7 fw-bold lh-sm noto-serif-tc text-primary-700">
                                  {`NT$${order.salePrice.toLocaleString()}`}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between col-lg-4 pe-lg-6 mb-3 mb-md-0">
                              <p className="d-lg-none fs-sm text-neutral-400">小計</p>
                              <p
                                data-action="subtotal"
                                className="fs-7 fw-bold lh-sm fs-lg-6 noto-serif-tc text-primary-700"
                              >
                                {`NT$${order.salePrice.toLocaleString()}`}
                              </p>
                            </div>
                            <div className="d-flex align-items-center col-lg-4 pe-lg-6 mt-auto mt-lg-0">
                              <button
                                type="button"
                                data-action="minus"
                                className="btn custom-btn-outline-neutral custom-btn-circle-sm me-1"
                                disabled={false}
                              >
                                <span className="material-symbols-rounded fs-6 fs-lg-5 d-block">remove</span>
                              </button>
                              <span
                                data-action="quantity"
                                className="cart-product-quantity fs-lg-7 fw-bold lh-sm noto-serif-tc text-black text-center me-1"
                              >
                                1
                              </span>
                              <button
                                type="button"
                                data-action="add"
                                className="btn custom-btn-outline-neutral custom-btn-circle-sm me-1"
                              >
                                <span className="material-symbols-rounded fs-6 fs-lg-5 d-block">add_2</span>
                              </button>
                              <button
                                type="button"
                                data-action="delete"
                                className="btn custom-btn-outline-danger custom-btn-circle-sm ms-auto"
                              >
                                <span className="material-symbols-rounded fs-6 fs-lg-5 d-block text-danger">
                                  delete
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-4 pb-12 pt-8 pt-lg-13">
                <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10">
                  <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">使用優惠券</h6>
                  <div className="mb-6">
                    <div className="d-flex align-items-center">
                      <label
                        htmlFor="coupon-code"
                        className="col-form-label fs-sm fs-lg-8 text-neutral-400 text-nowrap me-3"
                      >
                        輸入代碼
                      </label>
                      <input
                        type="text"
                        className="form-control border-2 rounded-0 py-3 px-4"
                        id="coupon-code"
                        placeholder="輸入優惠代碼"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className="btn custom-btn-filled-primary custom-btn-square-md text-nowrap ms-4"
                        id="coupon-check-btn"
                      >
                        確認
                      </button>
                    </div>
                    <div className="d-none fs-sm mt-2" id="coupon-feedback"></div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="fs-sm fs-lg-8 text-neutral-400 text-nowrap me-3">選擇優惠</span>
                    <span
                      className="coupon-selected-name fs-xs fs-lg-sm text-truncate text-neutral-400 bg-neutral-100 py-1 px-2 px-lg-3 me-2"
                      id="coupon-selected-name"
                    >
                      未選擇優惠
                    </span>
                    <button
                      type="button"
                      className="btn custom-btn-link-primary custom-btn-link-sm text-nowrap ms-auto"
                      id="coupon-choose-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#couponModal"
                    >
                      選擇
                    </button>
                    <div
                      className="modal fade coupon-modal"
                      id="couponModal"
                      tabIndex="-1"
                      aria-labelledby="couponModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content rounded-0 border-0">
                          <div className="modal-header border-bottom-0 p-lg-6">
                            <h1 className="modal-title h6 fs-lg-5 text-primary-700 lh-sm" id="couponModalLabel">
                              選擇優惠
                            </h1>
                            <button
                              type="button"
                              className="btn p-2 ms-auto"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span className="material-symbols-rounded d-block border-0 text-neutral-700">close</span>
                            </button>
                          </div>
                          <div className="modal-body pt-0 p-lg-6 pt-lg-0">
                            <div className="coupon-select unselected" id="couponModalSelected"></div>
                            <div className="d-flex align-items-center py-4 py-lg-6">
                              <p className="fs-sm text-primary me-6">其他優惠券</p>
                              <span className="flex-grow-1 border-bottom"></span>
                            </div>
                            <ul className="list-unstyled coupon-modal-list" id="couponModalList">
                              {couponMenu.map(coupon => (
                                <li key={coupon.name}>
                                  <div className="coupon-layout d-flex">
                                    <div className="bg-primary d-flex justify-content-center align-items-center">
                                      <div className="bg-primary d-flex justify-content-center align-items-center">
                                        <div className="d-flex flex-column align-items-start">
                                          <span className="fs-sm text-white mb-1">NT$</span>
                                          <span className="h3 text-white">{coupon.discount}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1 d-flex justify-content-between align-items-center border border-start-0 px-3">
                                      <div className="me-3">
                                        <p className="fs-8 lh-sm fw-bold noto-serif-tc text-neutral-700 mb-2">
                                          {coupon.name}
                                        </p>
                                        <p className="fs-xs fs-lg-sm text-primary-500">{coupon.date}</p>
                                      </div>
                                      <button
                                        type="button"
                                        className="btn btn-primary rounded-0 fs-sm fs-lg-8 text-white text-nowrap px-3 py-2"
                                      >
                                        選擇
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="border border-2 p-4 p-lg-6">
                  <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">訂單明細</h6>
                  <div className="d-flex justify-content-between mb-3 mb-lg-4">
                    <span className="fs-sm fs-lg-8 text-neutral-400">商品小計</span>
                    <span className="fs-sm fs-lg-8 text-neutral-400" id="cart-subtotal"></span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 mb-lg-4">
                    <span className="fs-sm fs-lg-8 text-neutral-400">折扣優惠</span>
                    <span className="fs-sm fs-lg-8 text-secondary" id="cart-discount"></span>
                  </div>
                  <div className="d-flex justify-content-between mb-4 mb-lg-8">
                    <span className="fs-lg-7 text-neutral-700">總金額</span>
                    <span className="fs-7 fs-lg-6 fw-bold lh-sm noto-serif-tc text-neutral-700" id="cart-total"></span>
                  </div>
                  <button
                    type="button"
                    className="btn custom-btn-filled-primary custom-btn-pill-lg w-100"
                    id="btn-next-checkout"
                  >
                    前往結帳
                  </button>
                </section>
              </div>
            </div>
            {/* add cart section start */}
            <section className="py-12 py-lg-15">
              {/* 標題 */}
              <div className="mb-8 mb-md-12">
                <div className="d-flex align-items-center gap-6">
                  <span className="flex-grow-1 border-top border-1 border-primary-200"></span>
                  <p className="fs-lg fs-lg-7 text-neutral-400">加購商品</p>
                  <span className="flex-grow-1 border-top border-1 border-primary-200"></span>
                </div>
              </div>

              {/* 產品卡片 */}
              <div className="row gx-3 gx-lg-6 gy-6">
                <div className="col-6 col-lg-3">
                  <ProductCard
                    title={'天使環生長燈'}
                    image={productAddImg03}
                    alt={'多肉植物組合盆栽'}
                    tag={'加購價'}
                    originPrice={'NT$ 1,000'}
                    price={'NT$ 799'}
                  />
                </div>
                <div className="col-6 col-lg-3">
                  <ProductCard
                    title={'陶瓷盆器'}
                    image={productAddImg04}
                    alt={'多肉植物組合盆栽'}
                    tag={'加購價'}
                    originPrice={'NT$ 350'}
                    price={'NT$ 300'}
                  />
                </div>
                <div className="col-6 col-lg-3">
                  <ProductCard
                    title={'園藝工具組'}
                    image={productAddImg05}
                    alt={'多肉植物組合盆栽'}
                    tag={'加購價'}
                    originPrice={'NT$ 650'}
                    price={'NT$ 500'}
                  />
                </div>
                <div className="col-6 col-lg-3">
                  <ProductCard
                    title={'日本赤玉土'}
                    image={productAddImg02}
                    alt={'多肉植物組合盆栽'}
                    tag={'加購價'}
                    originPrice={'NT$ 5,900'}
                    price={'NT$ 3,500'}
                  />
                </div>
              </div>
            </section>
            {/* add cart section end */}

            {/* recommend section start */}
            <section className="py-12 py-lg-15">
              {/* 標題 */}
              <div className="mb-8 mb-md-12">
                <div className="d-flex align-items-center gap-6">
                  <span className="flex-grow-1 border-top border-1 border-primary-200"></span>
                  <p className="fs-lg fs-lg-7 text-neutral-400">為您推薦</p>
                  <span className="flex-grow-1 border-top border-1 border-primary-200"></span>
                </div>
              </div>

              {/* 產品卡片 */}
              <div className="position-relative">
                <div className="row gx-3 gx-lg-6 gy-6">
                  <div className="col-6 col-lg-3">
                    <ProductCard
                      title={'雪夜之森'}
                      image={productImg07}
                      alt={'多肉植物組合盆栽'}
                      tag={'質感精選'}
                      price={'NT$ 2,400'}
                    />
                  </div>
                  <div className="col-6 col-lg-3">
                    <ProductCard
                      title={'植語時光'}
                      image={productImg08}
                      alt={'多肉植物組合盆栽'}
                      tag={'質感精選'}
                      price={'NT$ 3,000'}
                    />
                  </div>
                  <div className="col-6 col-lg-3">
                    <ProductCard
                      title={'荒原綠影'}
                      image={productImg13}
                      alt={'多肉植物組合盆栽'}
                      tag={'質感精選'}
                      price={'NT$ 2,400'}
                    />
                  </div>
                  <div className="col-6 col-lg-3">
                    <ProductCard
                      title={'森語花信'}
                      image={productImg09}
                      alt={'多肉植物組合盆栽'}
                      tag={'質感精選'}
                      price={'NT$ 3,500'}
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* recommend section end */}
          </div>
          <div
            className="tab-pane fade"
            id="pills-checkout-info"
            role="tabpanel"
            aria-labelledby="pills-checkout-info-tab"
            tabIndex="0"
          >
            <div className="row flex-column-reverse flex-lg-row">
              <div className="col-lg-8">
                <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10" id="checkout-delivery-payment">
                  <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
                    選擇運送及付款方式 <span className="text-danger">*</span>
                  </h6>
                  <p className="fs-lg-7 text-neutral-700 mb-2">運送方式</p>
                  <div className="dropdown checkout-dropdown" id="delivery-dropdown">
                    <button
                      className="btn dropdown-toggle border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      id="delivery-toggle"
                      data-initial-text="請選擇運送方式"
                    >
                      請選擇運送方式
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <a className="dropdown-item fs-sm fs-lg-8" href="#" id="yamato-transport">
                          黑貓宅配
                        </a>
                      </li>
                    </ul>
                    <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                  </div>
                  <p className="fs-sm text-neutral-400 mt-1">* 宅配貨到付款會產生額外手續費</p>
                  <p className="fs-sm text-neutral-400 mb-3">* 宅配週日不配送</p>
                  <p className="fs-lg-7 text-neutral-700 mb-2">付款方式</p>
                  <div className="dropdown checkout-dropdown" id="payment-dropdown">
                    <button
                      className="btn dropdown-toggle border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      id="payment-toggle"
                      data-initial-text="請選擇付款方式"
                    >
                      請選擇付款方式
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <a className="dropdown-item fs-sm fs-lg-8" href="#">
                          貨到付款
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fs-sm fs-lg-8" href="#" id="credit-card-one-time-payment">
                          信用卡一次付清
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fs-sm fs-lg-8" href="#">
                          轉帳
                        </a>
                      </li>
                    </ul>
                    <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                  </div>
                  <form id="creditcard-form" className="mt-4" noValidate>
                    <div className="mb-2">
                      <label htmlFor="card-number-1" className="form-label fs-lg-7 text-neutral-700">
                        信用卡卡號
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control cart-card-number fs-sm fs-lg-8"
                          id="card-number"
                          placeholder="**** **** **** ****"
                          required
                        />
                        <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                      </div>
                    </div>
                    <div className="d-flex gap-4 gap-lg-6">
                      <div>
                        <label htmlFor="card-exp" className="form-label fs-lg-7 text-neutral-700">
                          卡片有效期限
                        </label>
                        <div>
                          <input
                            type="text"
                            className="form-control cart-card-exp fs-sm fs-lg-8"
                            id="card-exp"
                            placeholder="MM/YY"
                            required
                          />
                          <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="card-cvc" className="form-label fs-lg-7 text-neutral-700">
                          背面末三碼
                        </label>
                        <input
                          type="text"
                          className="form-control cart-card-cvc fs-sm fs-lg-8"
                          id="card-cvc"
                          placeholder="CVC"
                          required
                        />
                        <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                      </div>
                    </div>
                  </form>
                </section>
                <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10" id="checkout-purchaser">
                  <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
                    訂購人資料 <span className="text-danger">*</span>
                  </h6>
                  <form noValidate>
                    <div className="d-flex gap-4 gap-lg-6 mb-3">
                      <div className="flex-grow-1">
                        <label htmlFor="purchaser-name" className="form-label fs-lg-7 text-neutral-700">
                          訂購人姓名
                        </label>
                        <input
                          type="text"
                          className="form-control fs-sm fs-lg-8"
                          id="purchaser-name"
                          placeholder="ex: 王X明"
                          required
                        />
                        <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                      </div>
                      <div className="flex-grow-1">
                        <label htmlFor="purchaser-phone" className="form-label fs-lg-7 text-neutral-700">
                          訂購人電話
                        </label>
                        <input
                          type="tel"
                          className="form-control fs-sm fs-lg-8"
                          id="purchaser-phone"
                          placeholder="ex: 0912-123-123"
                          required
                        />
                        <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="purchaser-email" className="form-label fs-lg-7 text-neutral-700">
                        訂購人電子郵件
                      </label>
                      <input
                        type="email"
                        className="form-control fs-sm fs-lg-8"
                        id="purchaser-email"
                        placeholder="ex: plantique@gmail.com"
                        required
                      />
                      <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                    </div>
                  </form>
                </section>
                <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10" id="checkout-recipient">
                  <div className="d-flex">
                    <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
                      收件人資料 <span className="text-danger">*</span>
                    </h6>
                    <div className="form-check ms-auto">
                      <input className="form-check-input" type="checkbox" value="" id="recipient-checked" />
                      <label className="form-check-label" htmlFor="recipient-checked">
                        同訂購人資訊
                      </label>
                    </div>
                  </div>
                  <form id="recipient-form" noValidate>
                    <div className="d-flex gap-4 gap-lg-6 mb-3">
                      <div className="flex-grow-1">
                        <label htmlFor="recipient-name" className="form-label fs-lg-7 text-neutral-700">
                          收件人姓名
                        </label>
                        <input
                          type="text"
                          className="form-control fs-sm fs-lg-8"
                          id="recipient-name"
                          placeholder="ex: 王X明"
                          required
                        />
                        <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                      </div>
                      <div className="flex-grow-1">
                        <label htmlFor="recipient-phone" className="form-label fs-lg-7 text-neutral-700">
                          收件人電話
                        </label>
                        <input
                          type="tel"
                          className="form-control fs-sm fs-lg-8"
                          id="recipient-phone"
                          placeholder="ex: 0912-123-123"
                          required
                        />
                        <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="recipient-email" className="form-label fs-lg-7 text-neutral-700">
                        收件人電子郵件
                      </label>
                      <input
                        type="email"
                        className="form-control fs-sm fs-lg-8"
                        id="recipient-email"
                        placeholder="ex: plantique@gmail.com"
                        required
                      />
                      <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                    </div>
                    <div className="flex-grow-1 mb-3">
                      <label htmlFor="recipient-address" className="form-label fs-lg-7 text-neutral-700">
                        收件人地址
                      </label>
                      <input
                        type="text"
                        className="form-control fs-sm fs-lg-8"
                        id="recipient-address"
                        placeholder="請填寫收件地址"
                        required
                      />
                      <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                    </div>
                  </form>
                </section>
                <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10" id="checkout-invoice">
                  <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
                    發票類型 <span className="text-danger">*</span>
                  </h6>
                  <form id="invoice-form" noValidate>
                    <p className="fs-lg-7 text-neutral-700 mb-2">選擇發票類型</p>
                    <div className="dropdown checkout-dropdown" id="invoice-dropdown">
                      <button
                        className="btn dropdown-toggle border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        id="invoice-toggle"
                        data-initial-text="請選擇發票類型"
                      >
                        請選擇發票類型
                      </button>
                      <ul className="dropdown-menu w-100">
                        <li>
                          <a className="dropdown-item fs-sm fs-lg-8" href="#">
                            電子發票
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item fs-sm fs-lg-8" href="#" id="mobile-barcode-item">
                            雲端載具
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item fs-sm fs-lg-8" href="#" id="ubn-item">
                            統一編號
                          </a>
                        </li>
                      </ul>
                      <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                    </div>
                    <div className="mt-3" id="cloud-invoice-carrier">
                      <label htmlFor="mobile-barcode" className="form-label fs-lg-7">
                        手機條碼
                      </label>
                      <input
                        type="text"
                        className="form-control fs-sm fs-lg-8"
                        id="mobile-barcode"
                        placeholder="請輸入手機條碼"
                        required
                      />
                      <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                    </div>
                    <div className="mt-3" id="ubn-wrapper">
                      <label htmlFor="ubn" className="form-label fs-lg-7">
                        統一編號
                      </label>
                      <input
                        type="text"
                        className="form-control fs-sm fs-lg-8"
                        id="ubn"
                        placeholder="請輸入統一編號"
                        required
                      />
                      <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
                    </div>
                  </form>
                </section>
                <section className="border border-2 p-4 p-lg-6" id="checkout-notes">
                  <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">給店家留言</h6>
                  <div className="mb-2">
                    <label htmlFor="checkout-notes-text" className="form-label visually-hidden">
                      備註
                    </label>
                    <textarea
                      className="form-control fs-sm fs-lg-8"
                      id="checkout-notes-text"
                      rows="3"
                      placeholder="請輸入留言"
                    ></textarea>
                  </div>
                </section>
              </div>
              <div className="col-lg-4 mb-6 mb-lg-0">
                <section className="border border-2 p-4 p-lg-6">
                  <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">訂單明細</h6>
                  <ul
                    className="cart-list checkout-list list-unstyled pb-4 pb-lg-8 border-bottom mb-4 mb-lg-8"
                    id="checkout-list"
                  ></ul>
                  <div className="d-flex justify-content-between mb-3 mb-lg-4">
                    <span className="fs-sm fs-lg-8 text-neutral-400">商品小計</span>
                    <span className="fs-sm fs-lg-8 text-neutral-500" id="checkout-subtotal"></span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 mb-lg-4">
                    <span className="fs-sm fs-lg-8 text-neutral-400">運費</span>
                    <span className="fs-sm fs-lg-8 text-secondary" id="checkout-delivery-fee"></span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 mb-lg-4">
                    <span className="fs-sm fs-lg-8 text-neutral-400">折扣優惠</span>
                    <span className="fs-sm fs-lg-8 text-secondary" id="checkout-discount"></span>
                  </div>
                  <div className="d-flex justify-content-between mb-4 mb-lg-8">
                    <span className="fs-lg-7 text-neutral-700">總金額</span>
                    <span
                      className="fs-7 fs-lg-6 fw-bold lh-sm noto-serif-tc text-neutral-700"
                      id="checkout-total"
                    ></span>
                  </div>
                  <div className="d-none d-lg-flex gap-lg-4 flex-lg-wrap">
                    <button
                      type="button"
                      className="btn custom-btn-outline-neutral custom-btn-pill-lg text-nowrap flex-lg-grow-1 checkout-btn-basis px-lg-5"
                      id="btn-back-cart-desktop"
                    >
                      返回購物車
                    </button>
                    <button
                      type="button"
                      className="btn custom-btn-filled-primary custom-btn-pill-lg text-nowrap flex-lg-grow-1 checkout-btn-basis"
                      id="btn-next-completed-desktop"
                    >
                      確認送出
                    </button>
                  </div>
                </section>
              </div>
            </div>
            <div className="d-lg-none my-6">
              <button
                type="button"
                className="btn custom-btn-filled-primary custom-btn-pill-lg w-100 text-nowrap"
                id="btn-next-completed-mobile"
              >
                確認送出
              </button>
              <button
                type="button"
                className="btn custom-btn-outline-neutral custom-btn-pill-lg w-100 text-nowrap mt-4"
                id="btn-back-cart-mobile"
              >
                返回購物車
              </button>
            </div>
            <button type="button" className="btn demo-btn" id="demo-btn"></button>
          </div>
          <div
            className="tab-pane fade"
            id="pills-completed"
            role="tabpanel"
            aria-labelledby="pills-completed-tab"
            tabIndex="0"
          >
            <div className="completed-svg-wrapper mx-auto">
              <svg className="completed-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                  <circle className="completed-svg-circle-outline" cx="12" cy="12" r="11.5" />
                  <circle className="completed-svg-circle-fill" cx="12" cy="12" r="11.5" />
                  <circle className="completed-svg-circle-fill-center" cx="12" cy="12" r="11.5" />
                  <path className="completed-svg-tick" d="M7 12 L10.5 15.5 L17.5 9" />
                </g>
              </svg>
            </div>
            <div className="completed-message-wrapper">
              <div className="text-center py-12">
                <p className="h4 fs-lg-3 text-neutral-700 mb-4">感謝您的訂購！</p>
                <p className="fs-6 fs-lg-5 text-neutral-700 mb-1">
                  您的訂單編號 <span className="text-danger" id="completed-order-number"></span>
                </p>
                <p id="completed-message-default" className="fs-8 fs-lg-7 text-neutral-400">
                  商品會於出貨時會再通知您。
                </p>
                <div id="completed-message-transfer" className="d-none">
                  <p className="fs-8 fs-lg-7 text-neutral-400">
                    訂單確認郵件已經發送至您的電子信箱：<span id="completed-email"></span>。<br />
                    您可至「我的訂單」頁面查看訂單狀態，有任何問題或意見也歡迎透過線上客服聯繫我們，或撥打客服專線：
                    <span className="text-nowrap">02-0800-0800</span>
                  </p>
                  <div className="d-flex flex-column align-items-center">
                    <p className="fs-7 fs-lg-6 noto-serif-tc fw-bold text-neutral-600 my-3">繳費資訊</p>
                    <div className="text-start text-neutral-600">
                      <p className="fs-sm fs-lg-8 mb-1">銀行名稱 : 台灣銀行</p>
                      <p className="fs-sm fs-lg-8 mb-1">銀行代碼 : 004</p>
                      <p className="fs-sm fs-lg-8 mb-1">帳戶號碼 : 000000000000</p>
                      <p className="fs-sm fs-lg-8">繳費截止時間 : 2025-11-3 23:59:59</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 mx-lg-auto">
                  <div className="d-flex flex-column-reverse flex-lg-row gap-4">
                    <button className="btn custom-btn-outline-neutral custom-btn-pill-lg flex-grow-1" type="button">
                      查看訂單
                    </button>
                    <button
                      className="btn custom-btn-filled-primary custom-btn-pill-lg flex-grow-1"
                      id="completed-btn"
                      type="button"
                    >
                      繼續購物
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade confirm-modal"
        id="confirmModal"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0">
            <div className="modal-header justify-content-center border-bottom-0 px-0 pt-8 pt-lg-12 pb-0">
              <p className="modal-title h4 fs-lg-3 text-primary-700" id="confirmModalLabel">
                貼心提醒
              </p>
            </div>
            <div className="modal-body text-center px-0 pt-4 pb-6 py-lg-8">
              <p className="fs-6 noto-serif-tc text-neutral-700 mb-1">訂單送出後，將無法修改！</p>
              <p className="fs-6 noto-serif-tc text-neutral-700 mb-3">請再次確認您的收件資訊</p>
              <p className="fs-8 text-neutral-400 mb-1">收件資訊</p>
              <div className="d-flex justify-content-center mb-1 mb-lg-2">
                <p className="h5 fs-lg-4 text-danger me-3" id="confirmModalName">
                  王小明
                </p>
                <p className="h5 fs-lg-4 text-danger" id="confirmModalPhone">
                  0923-123-123
                </p>
              </div>
              <p className="h5 fs-lg-4 text-danger" id="confirmModalAddress">
                台北市信義區101
              </p>
            </div>
            <div className="modal-footer flex-column flex-lg-row-reverse align-items-stretch border-top-0 border-top-lg gap-3 gap-lg-4 pb-8 pb-lg-12 pt-0 pt-lg-8 px-0">
              <button
                type="button"
                className="btn custom-btn-filled-primary custom-btn-pill-lg flex-grow-1 m-0"
                id="confirmModalCheckBtn"
              >
                確認送出
              </button>
              <button
                type="button"
                className="btn custom-btn-outline-neutral custom-btn-pill-lg flex-grow-1 m-0"
                data-bs-dismiss="modal"
              >
                繼續編輯
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
