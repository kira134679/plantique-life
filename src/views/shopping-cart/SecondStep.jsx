import { useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

function SecondStep({ orderInfo, handleSwitchStep }) {
  // 用於追蹤 Modal 關閉後是否要換頁
  const shouldSwitchAfterClose = useRef(false);
  // 控制 Modal 顯示與否
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleShowConfirmModal = () => setShowConfirmModal(true);

  // Modal 完全關閉後，依 flag 決定是否換頁
  const handleModalExited = () => {
    if (shouldSwitchAfterClose.current) {
      shouldSwitchAfterClose.current = false;
      handleSwitchStep(2);
    }
  };

  // 確認送出：設定 flag，關閉 Modal 後會觸發換頁
  const handleConfirmSubmit = () => {
    shouldSwitchAfterClose.current = true;
    handleCloseConfirmModal();
  };

  return (
    <>
      <div className="row flex-column-reverse flex-lg-row">
        <div className="col-lg-8">
          <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10" id="checkout-delivery-payment">
            <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
              選擇運送及付款方式 <span className="text-danger">*</span>
            </h6>
            <p className="fs-lg-7 text-neutral-700 mb-2">運送方式</p>
            {/* <div className="dropdown checkout-dropdown" id="delivery-dropdown">
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
            </div> */}
            <Dropdown className="checkout-dropdown" id="delivery-dropdown">
              <Dropdown.Toggle
                variant=""
                id="delivery-toggle"
                className="border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
              >
                請選擇運送方式
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                <Dropdown.Item href="#" className="fs-sm fs-lg-8">
                  黑貓宅配
                </Dropdown.Item>
              </Dropdown.Menu>
              <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
            </Dropdown>
            <p className="fs-sm text-neutral-400 mt-1">* 宅配貨到付款會產生額外手續費</p>
            <p className="fs-sm text-neutral-400 mb-3">* 宅配週日不配送</p>
            <p className="fs-lg-7 text-neutral-700 mb-2">付款方式</p>
            {/* <div className="dropdown checkout-dropdown" id="payment-dropdown">
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
            </div> */}
            <Dropdown className="checkout-dropdown" id="payment-dropdown">
              <Dropdown.Toggle
                variant=""
                id="payment-toggle"
                className="border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
              >
                請選擇付款方式
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                <Dropdown.Item href="#" className="fs-sm fs-lg-8">
                  貨到付款
                </Dropdown.Item>
                <Dropdown.Item href="#" className="fs-sm fs-lg-8">
                  信用卡一次付清
                </Dropdown.Item>
                <Dropdown.Item href="#" className="fs-sm fs-lg-8">
                  轉帳
                </Dropdown.Item>
              </Dropdown.Menu>
              <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
            </Dropdown>
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
              {/* <div className="dropdown checkout-dropdown" id="invoice-dropdown">
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
              </div> */}
              <Dropdown className="checkout-dropdown" id="invoice-dropdown">
                <Dropdown.Toggle
                  variant=""
                  id="invoice-toggle"
                  className="border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                >
                  請選擇發票類型
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item href="#" className="fs-sm fs-lg-8">
                    電子發票
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="fs-sm fs-lg-8" id="mobile-barcode-item">
                    雲端載具
                  </Dropdown.Item>
                  <Dropdown.Item href="#" className="fs-sm fs-lg-8" id="ubn-item">
                    統一編號
                  </Dropdown.Item>
                </Dropdown.Menu>
                <div className="zod-invalid-feedback fs-sm text-danger mt-1"></div>
              </Dropdown>
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
            >
              {orderInfo.cart.map(item => (
                <li key={item.name}>
                  <div className="row gx-3">
                    <div className="col-4">
                      <img className="cart-product-img w-100 object-fit-cover" src={item.image.src} alt={item.name} />
                    </div>
                    <div className="col-8 my-auto">
                      <div className="d-flex gap-2">
                        <div className="col-6 mb-1 mb-lg-0">
                          <h4 className="fs-7 fs-lg-6 text-neutral-700 noto-serif-tc text-nowrap mb-2">{item.name}</h4>
                          <p className="fs-sm text-neutral-400">
                            商品數量 : <span className="text-neutral-500">{item.count}</span>
                          </p>
                        </div>
                        <div className="d-flex justify-content-between col-6 mb-md-0">
                          <p className="fs-8 fw-bold lh-sm fs-lg-7 noto-serif-tc text-primary-700">{`NT$${item.salePrice.toLocaleString()}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
              <span className="fs-7 fs-lg-6 fw-bold lh-sm noto-serif-tc text-neutral-700" id="checkout-total"></span>
            </div>
            <div className="d-none d-lg-flex gap-lg-4 flex-lg-wrap">
              <button
                type="button"
                className="btn custom-btn-outline-neutral custom-btn-pill-lg text-nowrap flex-lg-grow-1 checkout-btn-basis px-lg-5"
                id="btn-back-cart-desktop"
                onClick={() => handleSwitchStep(0, false)}
              >
                返回購物車
              </button>
              <button
                type="button"
                className="btn custom-btn-filled-primary custom-btn-pill-lg text-nowrap flex-lg-grow-1 checkout-btn-basis"
                id="btn-next-completed-desktop"
                onClick={handleShowConfirmModal}
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
          onClick={handleShowConfirmModal}
        >
          確認送出
        </button>
        <button
          type="button"
          className="btn custom-btn-outline-neutral custom-btn-pill-lg w-100 text-nowrap mt-4"
          id="btn-back-cart-mobile"
          onClick={() => handleSwitchStep(0, false)}
        >
          返回購物車
        </button>
      </div>
      <button type="button" className="btn demo-btn" id="demo-btn"></button>
      <Modal
        show={showConfirmModal}
        onHide={handleCloseConfirmModal}
        onExited={handleModalExited}
        className="confirm-modal"
        aria-labelledby="confirmModalLabel"
        centered
      >
        <Modal.Header className="justify-content-center border-bottom-0 px-0 pt-8 pt-lg-12 pb-0">
          <Modal.Title className="h4 fs-lg-3 text-primary-700" id="confirmModalLabel">
            貼心提醒
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center px-0 pt-4 pb-6 py-lg-8">
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
        </Modal.Body>
        <Modal.Footer className="flex-column flex-lg-row-reverse align-items-stretch border-top-0 border-top-lg gap-3 gap-lg-4 pb-8 pb-lg-12 pt-0 pt-lg-8 px-0">
          <button
            type="button"
            className="btn custom-btn-filled-primary custom-btn-pill-lg flex-grow-1 m-0"
            id="confirmModalCheckBtn"
            onClick={handleConfirmSubmit}
          >
            確認送出
          </button>
          <button
            type="button"
            className="btn custom-btn-outline-neutral custom-btn-pill-lg flex-grow-1 m-0"
            onClick={handleCloseConfirmModal}
          >
            繼續編輯
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SecondStep;
