import { adminOrderApi } from '@/api';
import Button from '@/components/Button';
import { useEffect, useMemo, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import toast from 'react-hot-toast';
import OrderDatePicker from './OrderDatePicker';

function OrderDetailOffcanvas({
  orderDetail,
  orderDetailShow,
  setOrderDetailShow,
  draftOrder,
  setDraftOrder,
  fetchOrders,
  openConfirmModal,
}) {
  // 安全解構，避免 draftOrder 為 null 時報錯
  const { editable = false, userName = '', userAddress = '', createDate = null, isPaid = false } = draftOrder || {};
  const [hasChanged, setHasChanged] = useState(false);

  const handleDraftOrderChange = (key, value) => {
    setDraftOrder(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // 關閉側邊欄
  const handleOffcanvasClose = async (skipCheck = false) => {
    if (!skipCheck && hasChanged) {
      // 調用 openConfirmModal，Promise 會在這裡「暫停」，等待用戶操作
      const result = await openConfirmModal('有未儲存的變更，確定要離開嗎？');
      if (!result) {
        return;
      }
    }
    setOrderDetailShow(false);
    setDraftOrder({
      editable: false,
      userName: '',
      userAddress: '',
      createDate: null,
      isPaid: false,
    });
    setHasChanged(false);
  };

  const handleSaveDraftOrder = async () => {
    try {
      await adminOrderApi.updateOrder(orderDetail.id, {
        ...orderDetail,
        // 修改內容
        is_paid: draftOrder.isPaid,
        create_at: draftOrder.createDate.getTime() / 1000,
        user: {
          ...orderDetail.user,
          name: draftOrder.userName,
          address: draftOrder.userAddress,
        },
      });
      toast.success('訂單資訊已儲存');
      setHasChanged(false);
      handleOffcanvasClose(true); // 跳過檢查，因為已經儲存了
      await fetchOrders();
    } catch (error) {
      toast.error(error);
    }
  };

  // 計算是否有變更
  const computedHasChanged = useMemo(() => {
    if (!orderDetailShow) return false;
    return (
      userName !== orderDetail.user.name ||
      userAddress !== orderDetail.user.address ||
      createDate?.getTime() / 1000 !== orderDetail.create_at ||
      isPaid !== orderDetail.is_paid
    );
  }, [
    userName,
    userAddress,
    createDate,
    isPaid,
    orderDetail.create_at,
    orderDetail.is_paid,
    orderDetail.user.address,
    orderDetail.user.name,
    orderDetailShow,
  ]);

  // 同步 computedHasChanged 到狀態
  useEffect(() => {
    setHasChanged(computedHasChanged);
  }, [computedHasChanged]);

  return (
    <Offcanvas show={orderDetailShow} onHide={handleOffcanvasClose} placement="end" className="admin-orders-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="w-100">
          <div className="d-flex">
            訂單詳情
            <Button
              type="button"
              variant={editable ? 'outline-danger' : 'outline-neutral'}
              shape="circle"
              size="sm"
              className="admin-orders-button border-0 ms-auto me-2"
              onClick={() => handleDraftOrderChange('editable', !editable)}
            >
              <span className="custom-btn-icon material-symbols-rounded">{editable ? 'lock_open_right' : 'lock'}</span>
            </Button>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">訂單資訊</h2>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderId" className="col-4 col-form-label text-nowrap">
                  訂單編號
                </label>
                <div className="col-8">
                  <input type="text" readOnly className="form-control-plaintext" id="orderId" value={orderDetail.id} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderDate" className="col-4 col-form-label text-nowrap">
                  下單日期
                </label>
                <div className="col-8">
                  <OrderDatePicker
                    id="orderDate"
                    selectsRange={false}
                    date={createDate}
                    setDate={date => handleDraftOrderChange('createDate', date)}
                    disabled={!editable}
                    includeTime={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">訂購人資料</h2>
          <div className="row mb-2">
            <div className="col-6">
              <div className="row">
                <label htmlFor="purchaserName" className="col-4 col-form-label">
                  姓名
                </label>
                <div className="col-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="purchaserName"
                    value={orderDetail.user.purchaserName}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="purchaserPhone" className="col-4 col-form-label">
                  電話
                </label>
                <div className="col-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="purchaserPhone"
                    value={orderDetail.user.purchaserPhone}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <label htmlFor="purchaserEmail" className="col-2 col-form-label">
              Email
            </label>
            <div className="col-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="purchaserEmail"
                value={orderDetail.user.purchaserEmail}
              />
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">收件人資料</h2>
          <div className="row mb-2">
            <div className="col-6">
              <div className="row">
                <label htmlFor="userName" className="col-4 col-form-label">
                  姓名
                </label>
                <div className="col-8">
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
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="userTel" className="col-4 col-form-label">
                  電話
                </label>
                <div className="col-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="userTel"
                    value={orderDetail.user.tel}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2">
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
          <div className="row mb-2">
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
          <div className="d-flex">
            <label htmlFor="orderAmount" className="col-form-label text-nowrap">
              總金額
            </label>
            <input
              type="text"
              readOnly
              className="form-control-plaintext fs-7 noto-serif-tc fw-bold text-primary-700 text-end"
              id="orderAmount"
              value={`NT$${orderDetail.total.toLocaleString()}`}
            />
          </div>
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">運送及付款方式</h2>
          <div className="row mb-2">
            <label htmlFor="deliveryMethod" className="col-2 col-form-label">
              運送方式
            </label>
            <div className="col-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="deliveryMethod"
                value={orderDetail.user.delivery}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <div className="row">
                <label htmlFor="paymentMethod" className="col-4 col-form-label">
                  付款方式
                </label>
                <div className="col-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="paymentMethod"
                    value={orderDetail.user.payment}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <span className="col-4 col-form-label text-nowrap">是否已付款</span>
                <div className="col-8 d-flex align-items-center">
                  <div className="admin-orders-is-paid-container position-relative">
                    <input
                      type="radio"
                      id="isPaidFalse"
                      value="false"
                      checked={!isPaid}
                      className="visually-hidden admin-orders-is-paid-radio"
                      onChange={() => handleDraftOrderChange('isPaid', false)}
                      disabled={!editable}
                    />
                    <label htmlFor="isPaidFalse" className="border border-end-0 rounded-start px-2 py-1">
                      未付款
                    </label>
                    <input
                      type="radio"
                      id="isPaidTrue"
                      value="true"
                      checked={isPaid}
                      className="visually-hidden admin-orders-is-paid-radio"
                      onChange={() => handleDraftOrderChange('isPaid', true)}
                      disabled={!editable}
                    />
                    <label htmlFor="isPaidTrue" className="border border-start-0 rounded-end px-2 py-1">
                      已付款
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {orderDetail.user.payment === '信用卡一次付清' && (
            <>
              <div className="row mb-1">
                <label htmlFor="cardNumber" className="col-2 col-form-label">
                  信用卡卡號
                </label>
                <div className="col-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="cardNumber"
                    value={orderDetail.user.cardNumber}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <label htmlFor="cardExp" className="col-4 col-form-label">
                      卡片有效期限
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        id="cardExp"
                        value={orderDetail.user.cardExp}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <label htmlFor="cardCvc" className="col-4 col-form-label">
                      背面末三碼
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        id="cardCvc"
                        value={orderDetail.user.cardCvc}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">發票類型</h2>
          <div className="row mb-2">
            <div className="col-6">
              <div className="row">
                <label htmlFor="invoiceMethod" className="col-4 col-form-label">
                  發票類型
                </label>
                <div className="col-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="invoiceMethod"
                    value={orderDetail.user.invoice}
                  />
                </div>
              </div>
            </div>
            {['雲端載具', '統一編號'].includes(orderDetail.user.invoice) && (
              <div className="col-6">
                <div className="row">
                  <label htmlFor="mobileBarcodeOrUbn" className="col-4 col-form-label">
                    {orderDetail.user.invoice === '雲端載具' ? '手機條碼' : '統一編號'}
                  </label>
                  <div className="col-8">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="mobileBarcodeOrUbn"
                      value={
                        orderDetail.user.invoice === '雲端載具' ? orderDetail.user.mobileBarcode : orderDetail.user.ubn
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">留言</h2>
          <label htmlFor="orderMessage" className="col-form-label visually-hidden">
            留言
          </label>
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="orderMessage"
            value={orderDetail.message}
          />
        </section>
      </Offcanvas.Body>
      <div className="d-flex justify-content-end gap-2 p-4">
        <Button type="button" variant="outline-neutral" shape="pill" size="sm" onClick={() => handleOffcanvasClose()}>
          取消
        </Button>
        <Button
          type="button"
          variant="filled-primary"
          shape="pill"
          size="sm"
          onClick={handleSaveDraftOrder}
          disabled={!hasChanged}
        >
          儲存
        </Button>
      </div>
    </Offcanvas>
  );
}

export default OrderDetailOffcanvas;
