import Button from '@/components/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OrderDatePicker from './OrderDatePicker';

function OrderDetailOffcanvas({ orderDetail, orderDetailShow, setOrderDetailShow, draftOrder, setDraftOrder }) {
  // 安全解構，避免 draftOrder 為 null 時報錯
  const { editable = false, userName = '', userAddress = '', createDate = null } = draftOrder || {};

  const handleDraftOrderChange = (key, value) => {
    setDraftOrder(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // 關閉側邊欄
  const handleOffcanvasClose = () => {
    setOrderDetailShow(false);
    setDraftOrder({
      editable: false,
      userName: '',
      userAddress: '',
      createDate: null,
    });
  };

  return (
    <Offcanvas show={orderDetailShow} onHide={handleOffcanvasClose} placement="end" className="admin-orders-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>訂單詳情</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <section className="mb-10">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-1 mb-3">
            <h2 className="fs-6">買家資訊</h2>
            <Button
              type="button"
              variant={editable ? 'filled-primary' : 'outline-neutral'}
              shape="circle"
              size="sm"
              className="admin-orders-button"
              onClick={() => handleDraftOrderChange('editable', !editable)}
            >
              <span className="custom-btn-icon material-symbols-rounded">{editable ? 'check' : 'edit'}</span>
            </Button>
          </div>
          <div className="mb-2 row">
            <label htmlFor="userName" className="col-2 col-form-label">
              姓名
            </label>
            <div className="col-10">
              <input
                type="text"
                disabled={!editable}
                className="form-control"
                id="userName"
                value={userName}
                onChange={e => handleDraftOrderChange('userName', e.target.value)}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label htmlFor="userEmail" className="col-2 col-form-label">
              Email
            </label>
            <div className="col-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="userEmail"
                value={orderDetail.user.email}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label htmlFor="userTel" className="col-2 col-form-label">
              電話
            </label>
            <div className="col-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="userTel"
                value={orderDetail.user.tel}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label htmlFor="userAddress" className="col-2 col-form-label">
              地址
            </label>
            <div className="col-10">
              <input
                type="text"
                disabled={!editable}
                className="form-control"
                id="userAddress"
                value={userAddress}
                onChange={e => handleDraftOrderChange('userAddress', e.target.value)}
              />
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">訂購商品</h2>
          <ul className="list-unstyled">
            <li className="row mb-4">
              <p className="col-7 text-neutral-400">商品</p>
              <p className="col-2 text-neutral-400 text-center">數量</p>
              <p className="col-3 text-neutral-400 text-end">小計</p>
            </li>
            {Object.values(orderDetail.products).map(item => (
              <li key={item.id} className="row mb-3 align-items-center">
                <div className="col-3 admin-orders-product-img">
                  <img src={item.product.imageUrl} alt={item.product.title} className="w-100 h-100 object-fit-cover" />
                </div>
                <div className="col-4">
                  <span
                    className={`fs-xs fs-lg-sm px-2 px-lg-3 py-1 ${item.product.category === '質感精選' ? 'text-primary bg-primary-100' : 'text-secondary bg-secondary-100'}`}
                  >
                    {item.product.category}
                  </span>
                  <p className="mt-1">{item.product.title}</p>
                  <div className="d-flex align-items-end mt-1">
                    <span className="card-text fs-7 fs-lg-6 text-primary-700 fw-bold noto-serif-tc lh-sm">
                      {`NT$${item.product.price.toLocaleString()}`}
                    </span>
                    {item.product.origin_price && (
                      <span className="card-text fs-sm text-neutral-400 noto-serif-tc text-decoration-line-through ms-xl-2 mt-2 mt-xl-0">
                        {`$${item.product.origin_price.toLocaleString()}`}
                      </span>
                    )}
                  </div>
                </div>
                <p className="col-2 text-center text-neutral-500 mb-1">x {item.qty}</p>
                <p className="col-3 fs-7 noto-serif-tc fw-bold text-end text-primary-700 mb-1">
                  NT${item.final_total.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">訂單資訊</h2>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderId" className="col-3 col-form-label">
                  訂單編號
                </label>
                <div className="col-9">
                  <input type="text" readOnly className="form-control-plaintext" id="orderId" value={orderDetail.id} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderAmount" className="col-3 col-form-label">
                  訂單金額
                </label>
                <div className="col-9">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext fs-7 noto-serif-tc fw-bold text-primary-700 text-end"
                    id="orderAmount"
                    value={`NT$${orderDetail.total.toLocaleString()}`}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderDate" className="col-3 col-form-label">
                  下單日期
                </label>
                <div className="col-9">
                  <OrderDatePicker
                    selectsRange={false}
                    date={createDate}
                    setDate={date => handleDraftOrderChange('createDate', date)}
                    disabled={!editable}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderMessage" className="col-2 col-form-label">
                  留言
                </label>
                <div className="col-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="orderMessage"
                    value={orderDetail.message}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="outline-neutral" shape="pill" size="sm" onClick={handleOffcanvasClose}>
            取消
          </Button>
          <Button type="button" variant="filled-primary" shape="pill" size="sm">
            儲存
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OrderDetailOffcanvas;
