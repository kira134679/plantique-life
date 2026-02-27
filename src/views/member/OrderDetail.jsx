import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';
import toast, { ErrorIcon } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router';

import { guestOrderApi, payApi } from '@/api';
import Button from '@/components/Button';
import { addAndRefetchCarts } from '@/slice/cartSlice';

function OrderDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { orderId } = useParams();

  const isFromOrderList = state?.fromOrderList || false;

  const [orderDetail, setOrderDetail] = useState(() => {
    // 如果 state 中有訂單資料，且訂單編號相同，則使用 state 中的訂單資料，否則使用 API 取得訂單資料
    // 初始為 null，表示還沒有取得訂單資料
    if (state?.orderDetail && state.orderDetail.id === orderId) {
      return state.orderDetail;
    }
    return null;
  });

  // coupon 資訊
  const [coupon, setCoupon] = useState(null);

  // 是否正在新增訂單產品到購物車
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  // 返回訂單列表
  const handleGoBack = () => {
    if (isFromOrderList) {
      navigate(-1); // 回到上一頁
    } else {
      navigate('/member/orders'); // 回到訂單列表頁
    }
  };

  // 訂單產品加入購物車
  const handleAddToCart = async () => {
    // 取出訂單產品的 id 和 qty
    const products = Object.values(orderDetail.products).map(product => ({
      id: product.product.id,
      qty: product.qty,
    }));

    // 新增多筆產品到購物車
    const results = [];
    setAddToCartLoading(true);
    for (const product of products) {
      try {
        const response = await dispatch(
          addAndRefetchCarts({ data: { product_id: product.id, qty: product.qty }, preventGlobalLoading: true }),
        ).unwrap();
        results.push({ status: 'fulfilled', value: response });
      } catch (error) {
        results.push({ status: 'rejected', reason: error });
      }
    }
    setAddToCartLoading(false);
    // 檢查結果
    const failedItems = results.filter(r => r.status === 'rejected');
    if (failedItems.length > 0) {
      toast.error(`有 ${failedItems.length} 個產品加入購物車失敗`);
    } else {
      toast.success('產品加入購物車成功！');
    }
  };

  // 重新付款
  const processCreditCardPayment = async orderId => {
    try {
      const res = await payApi.createPayment(orderId);
      // api 僅更新欄位 is_paid，所以不再重新呼叫訂單資訊
      setOrderDetail(prev => ({ ...prev, is_paid: true }));
      toast.success(res.message);
    } catch (error) {
      toast(
        t => (
          <div className="d-flex align-items-center gap-3">
            <ErrorIcon />
            <p>{error}</p>
            <Button
              type="button"
              variant="outline-neutral"
              shape="circle"
              size="sm"
              className="border-0"
              onClick={() => toast.dismiss(t.id)}
            >
              <span className="custom-btn-icon material-symbols-rounded">close</span>
            </Button>
          </div>
        ),
        { duration: Infinity },
      );
    }
  };

  useEffect(() => {
    // 如果 orderDetail 已經有資料，且訂單編號相同，則不重複呼叫 API
    // 如果 orderDetail 為空物件，表示訂單不存在或是取得訂單資料失敗
    if (orderDetail && (Object.keys(orderDetail).length === 0 || orderDetail.id === orderId)) {
      return;
    }

    (async () => {
      try {
        const response = await guestOrderApi.fetchOrderById(orderId);
        if (!response.order) {
          // 訂單不存在，API 會回傳 null，不會觸發 catch 區塊
          setOrderDetail({});
        } else {
          setOrderDetail(response.order);
        }
      } catch (error) {
        toast.error(error);
        setOrderDetail({});
      }
    })();
  }, [orderId, orderDetail]);

  // 有訂單資料時（不論來自 state 或 API）都要取得 coupon 資訊
  useEffect(() => {
    // orderDetail 沒有 products 資料，表示還沒有取得訂單資料
    if (!orderDetail?.products) return;

    (() => {
      // coupon 紀錄在每一組 product 中，只取第一組的 coupon 資訊並計算總折扣金額
      const products = Object.values(orderDetail.products);
      setCoupon({
        title: products[0]?.coupon?.title || '',
        discount: products.reduce((acc, product) => acc + (product.total - product.final_total), 0) || 0,
      });
    })();
  }, [orderDetail]);

  // 訂單資料正在讀取中
  if (orderDetail === null) {
    return <div className="text-center text-neutral-400 py-10">Loading...</div>;
  }

  // 訂單資料不存在
  if (Object.keys(orderDetail).length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="fs-7 noto-sans-tc text-neutral-400 text-center">訂單資料不存在</h2>
        <Button
          as={Link}
          to="/member/orders"
          type="button"
          variant="filled-primary"
          shape="pill"
          size="lg"
          className="mt-10"
        >
          返回訂單列表
        </Button>
      </div>
    );
  }

  return (
    <div className="my-8 mt-lg-0 mb-lg-0">
      <div className="d-flex flex-wrap align-items-center mb-lg-6">
        <Button
          onClick={handleGoBack}
          type="button"
          variant="outline-neutral"
          shape="circle"
          size="lg"
          className="border-0"
        >
          <span className="custom-btn-icon material-symbols-rounded">chevron_left</span>
        </Button>
        <Button
          type="button"
          variant="outline-neutral"
          shape="pill"
          size="lg"
          className="order-1 order-lg-2 ms-auto"
          disabled
        >
          申請退貨
        </Button>
        <p className="h6 fs-lg-5 order-2 order-lg-1 w-100 w-lg-auto mt-12 mt-lg-0 ms-lg-2">
          訂單編號：{orderDetail.id}
        </p>
      </div>
      <div className="d-flex align-items-center mb-3 mb-lg-4 pt-5 pt-lg-10">
        <p className="text-neutral-400 fs-sm fs-lg-8">
          付款狀態：
          <span
            className={clsx(
              'fs-xs fs-lg-sm px-3 py-1 ms-1',
              orderDetail.is_paid ? 'bg-primary-100 text-primary' : 'bg-secondary-100 text-secondary',
            )}
          >
            {orderDetail.is_paid ? '已付款' : '未付款'}
          </span>
        </p>
        {orderDetail.user?.payment === '信用卡一次付清' && !orderDetail.is_paid && (
          <Button
            type="button"
            variant="filled-primary"
            shape="pill"
            size="sm"
            className="ms-4"
            onClick={() => processCreditCardPayment(orderDetail.id)}
          >
            重新付款
          </Button>
        )}
      </div>
      <p className="text-neutral-400 fs-sm fs-lg-8 mb-3 mb-lg-4">
        總額：
        <span className="noto-serif-tc fw-bold text-primary-700 ms-1">NT${orderDetail.total.toLocaleString()}</span>
      </p>
      <p className="text-neutral-400 fs-sm fs-lg-8 mb-6 mb-lg-10">
        付款方式：<span className="ms-1">{orderDetail.user?.payment}</span>
      </p>
      {/* 訂購資訊 */}
      <p className="order-detail-spacing mb-6 mb-lg-10">
        <span className="fs-8 fs-lg-7 text-neutral-400">訂購資訊</span>
      </p>
      <p className="fs-sm fs-lg-8 text-neutral-400 mb-3 mb-lg-4">訂購人姓名：{orderDetail.user?.purchaserName}</p>
      <p className="fs-sm fs-lg-8 text-neutral-400 mb-3 mb-lg-4">訂購人電話：{orderDetail.user?.purchaserPhone}</p>
      <p className="fs-sm fs-lg-8 text-neutral-400 mb-6 mb-lg-10">訂購人電子郵件：{orderDetail.user?.purchaserEmail}</p>
      {/* 配送資訊 */}
      <p className="order-detail-spacing mb-6 mb-lg-10">
        <span className="fs-8 fs-lg-7 text-neutral-400">配送資訊</span>
      </p>
      <p className="fs-sm fs-lg-8 text-neutral-400 mb-3 mb-lg-4">配送方式：{orderDetail.user?.delivery}</p>
      <p className="fs-sm fs-lg-8 text-neutral-400 mb-3 mb-lg-4">收件人姓名：{orderDetail.user?.name}</p>
      <p className="fs-sm fs-lg-8 text-neutral-400 mb-3 mb-lg-4">收件人電話：{orderDetail.user?.tel}</p>
      <p className="fs-sm fs-lg-8 text-neutral-400 mb-3 mb-lg-4">收件人電子郵件：{orderDetail.user?.email}</p>
      <p className="fs-sm fs-lg-8 text-neutral-400 mb-6 mb-lg-10">收件人地址：{orderDetail.user?.address}</p>
      {/* 商品資訊 */}
      <p className="order-detail-spacing mb-6 mb-lg-10">
        <span className="fs-8 fs-lg-7 text-neutral-400">商品資訊</span>
      </p>
      <div className="row mb-6 mb-lg-10 gy-6">
        {Object.values(orderDetail.products).map(product => (
          <Fragment key={product.id}>
            <div className="col-6 col-lg-3">
              <img
                src={product.product.imageUrl}
                alt={product.product.title}
                className="order-detail-product-img img-fluid w-100 object-fit-cover"
              />
            </div>
            <div className="col-6 col-lg-9">
              <div className="row flex-column flex-lg-row justify-content-center align-items-lg-center h-100">
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <p className="h6 fs-lg-5 text-neutral-700 mb-lg-2">{product.product.title}</p>
                  <div className="d-flex align-items-center">
                    <p className="fs-8 fs-lg-7 noto-serif-tc fw-bold text-primary-700">
                      NT${product.product.price.toLocaleString()}
                    </p>
                    {product.product.origin_price && (
                      <del className="fs-sm fs-lg-8 noto-serif-tc fw-bold text-neutral-400 ms-1">
                        ${product.product.origin_price.toLocaleString()}
                      </del>
                    )}
                  </div>
                </div>
                <div className="col-lg-2 mb-3 mb-lg-0">
                  <p className="fs-sm fs-lg-8 text-neutral-400">x {product.qty}</p>
                </div>
                <div className="col-lg-4 align-content-end">
                  <p className="fs-7 fs-lg-6 noto-serif-tc fw-bold text-primary-700 text-lg-end">
                    NT${product.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      {/* 優惠券、運費、訂單總金額 */}
      <div className="border-top py-6 py-lg-10">
        <div className="d-flex align-items-center mb-3 mb-lg-4">
          <span className="fs-sm fs-lg-8 text-neutral-400">優惠券：</span>
          {coupon?.title && (
            <span className="fs-xs fs-lg-sm bg-secondary-100 text-secondary px-2 py-1 ms-1">{coupon?.title}</span>
          )}
          <span className="fs-sm fs-lg-8 noto-serif-tc fw-bold text-primary-700 ms-auto">
            {coupon?.discount > 0 && '-'} NT${coupon?.discount?.toLocaleString()}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-5 mb-lg-6">
          <span className="fs-sm fs-lg-8 text-neutral-400">運費：</span>
          <span className="fs-sm fs-lg-8 noto-serif-tc fw-bold text-primary-700">
            NT$0<del className="fs-xs fs-lg-sm text-neutral-400 ms-1">$120</del>
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="h6 fs-lg-5">訂單總金額</span>
          <span className="h6 fs-lg-5">NT${orderDetail.total.toLocaleString()}</span>
        </div>
      </div>
      {/* 發票資訊 */}
      <div className="border-top py-6 py-lg-10">
        <p className="fs-sm fs-lg-8 text-neutral-400 mb-3 mb-lg-4">發票種類：{orderDetail.user?.invoice}</p>
        {orderDetail.user?.invoice === '雲端載具' && (
          <p className="fs-sm fs-lg-8 text-neutral-400">手機條碼：{orderDetail.user?.mobileBarcode}</p>
        )}
        {orderDetail.user?.invoice === '統一編號' && (
          <p className="fs-sm fs-lg-8 text-neutral-400">統一編號：{orderDetail.user?.ubn}</p>
        )}
      </div>
      {/* 再買一次按鈕 */}
      <div className="text-center mt-lg-6">
        <Button
          variant="filled-primary"
          shape="pill"
          size="lg"
          leftIcon={!addToCartLoading}
          iconName="shopping_cart"
          className="d-inline-flex"
          onClick={handleAddToCart}
          disabled={addToCartLoading}
        >
          {addToCartLoading ? (
            <div className="d-flex align-items-center justify-content-center">
              <div className="spinner-border spinner-border-sm text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="ms-2">加入購物車中...</span>
            </div>
          ) : (
            '再買一次'
          )}
        </Button>
      </div>
    </div>
  );
}

export default OrderDetail;
