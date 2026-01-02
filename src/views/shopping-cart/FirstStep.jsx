import ProductCard from '../../components/ProductCard';

function FirstStep({ orderInfo, productImages, handleSwitchStep }) {
  const {
    productAddImg02,
    productAddImg03,
    productAddImg04,
    productAddImg05,
    productImg07,
    productImg08,
    productImg09,
    productImg13,
  } = productImages;

  return (
    <>
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
                    <img className="cart-product-img w-100 object-fit-cover" src={order.image.src} alt={order.name} />
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
                        <p data-action="subtotal" className="fs-7 fw-bold lh-sm fs-lg-6 noto-serif-tc text-primary-700">
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
                          <span className="material-symbols-rounded fs-6 fs-lg-5 d-block text-danger">delete</span>
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
            <div>
              <div className="d-flex align-items-center">
                <label htmlFor="coupon-code" className="col-form-label fs-sm fs-lg-8 text-neutral-400 text-nowrap me-3">
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
              onClick={() => handleSwitchStep(1)}
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
    </>
  );
}

export default FirstStep;
