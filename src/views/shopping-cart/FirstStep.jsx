import { guestCouponApi } from '@/api';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { deleteAndRefetchCarts, fetchCarts, selectHasItemLoading, updateAndRefetchCarts } from '@/slice/cartSlice';
import clsx from 'clsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function FirstStep({ productImages, handleSwitchStep }) {
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
  const dispatch = useDispatch();
  const { carts, total, finalTotal, isLoading: cartLoading, loadingItems } = useSelector(state => state.cart);

  // 優惠券輸入框
  const [coupon, setCoupon] = useState('');
  // 優惠券狀態
  const [couponStatus, setCouponStatus] = useState({
    isLoading: false,
    message: '',
    type: null, // 'success' | 'error' | null
  });

  // 檢查是否有任何項目正在載入
  const hasItemLoading = useSelector(selectHasItemLoading);
  // 整體載入狀態
  const isCartProcessing = cartLoading || couponStatus.isLoading || hasItemLoading;

  async function handleUpdateCart(id, product_id, qty) {
    // 清除優惠券訊息
    setCouponStatus({ isLoading: false, message: '', type: null });

    // 更新購物車數量
    try {
      const data = { product_id: product_id, qty: qty };
      await dispatch(updateAndRefetchCarts({ id, data, preventGlobalLoading: true })).unwrap();
    } catch (error) {
      toast.error(error);
    }
  }

  async function handleDeleteCart(id) {
    // 清除優惠券訊息
    setCouponStatus({ isLoading: false, message: '', type: null });

    // 刪除購物車產品
    try {
      await dispatch(deleteAndRefetchCarts({ id, preventGlobalLoading: true })).unwrap();
      toast.success('刪除成功');
    } catch (error) {
      toast.error(error);
    }
  }

  // 套用優惠券
  async function handleApplyCoupon(code) {
    if (code.trim() === '') {
      setCouponStatus({ isLoading: false, message: '未輸入優惠券代碼', type: 'error' });
      return;
    } else if (!/^[A-Z0-9]{8,}$/.test(code)) {
      setCouponStatus({
        isLoading: false,
        message: '優惠券代碼格式不符 (只允許大寫英數字且最少要 8 碼)',
        type: 'error',
      });
      return;
    }

    try {
      // pending 狀態
      setCouponStatus({ isLoading: true, message: '驗證中...', type: null });
      // 呼叫 API
      const couponRes = await guestCouponApi.applyCoupon({ code }, true);
      const cartsRes = await dispatch(fetchCarts(true)).unwrap();
      // 組合優惠券訊息
      const couponMsg = `${couponRes.message} (${cartsRes.data.carts[0].coupon.title})`;
      // 等待購物車更新完成後再顯示成功訊息
      setCouponStatus({ isLoading: false, message: couponMsg, type: 'success' });
      setCoupon('');
    } catch (error) {
      setCouponStatus({ isLoading: false, message: error, type: 'error' });
    }
  }

  // 前往結帳並重置優惠券輸入框及訊息
  const handleSwitchSecondStep = async () => {
    await handleSwitchStep(1);
    setCouponStatus({ isLoading: false, message: '', type: null });
    setCoupon('');
  };

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
          <ul className="cart-list list-unstyled border-top pt-6 pb-8">
            {carts.map(cartItem => {
              const itemStatus = loadingItems[cartItem.id] || false;
              return (
                <li key={cartItem.id} className="position-relative">
                  <div className="row gx-3 gx-lg-6">
                    <div className="col-6 col-lg-3">
                      <img
                        className="cart-product-img w-100 object-fit-cover"
                        src={cartItem.product.imageUrl}
                        alt={cartItem.product.title}
                      />
                    </div>
                    <div className="col-6 col-lg-9">
                      <div className="d-flex flex-column flex-lg-row align-items-lg-center h-100">
                        <div className="col-lg-4 pe-lg-6">
                          <h4 className="h6 fs-lg-5 text-neutral-700 text-nowrap mb-1 mb-lg-2">
                            {cartItem.product.title}
                          </h4>
                          <div className="d-flex mb-3 mb-lg-0 align-items-end">
                            <p className="fs-8 fs-lg-7 fw-bold lh-sm noto-serif-tc text-primary-700">
                              {`NT$${cartItem.product.price.toLocaleString()}`}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between col-lg-4 pe-lg-6 mb-3 mb-md-0">
                          <p className="d-lg-none fs-sm text-neutral-400">小計</p>
                          <p className="fs-7 fw-bold lh-sm fs-lg-6 noto-serif-tc text-primary-700">
                            {itemStatus === 'updating' ? (
                              <span className="spinner-border spinner-border-sm text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </span>
                            ) : (
                              `NT$${cartItem.total.toLocaleString()}`
                            )}
                          </p>
                        </div>
                        <div className="d-flex align-items-center col-lg-4 pe-lg-6 mt-auto mt-lg-0">
                          <Button
                            type="button"
                            variant="outline-neutral"
                            shape="circle"
                            size="sm"
                            className="me-1"
                            disabled={cartItem.qty <= 1 || itemStatus}
                            onClick={() => handleUpdateCart(cartItem.id, cartItem.product_id, cartItem.qty - 1)}
                          >
                            <span className="custom-btn-icon material-symbols-rounded">remove</span>
                          </Button>
                          <span className="cart-product-quantity fs-lg-7 fw-bold lh-sm noto-serif-tc text-black text-center me-1">
                            {cartItem.qty}
                          </span>
                          <Button
                            type="button"
                            variant="outline-neutral"
                            shape="circle"
                            size="sm"
                            className="me-1"
                            disabled={itemStatus}
                            onClick={() => handleUpdateCart(cartItem.id, cartItem.product_id, cartItem.qty + 1)}
                          >
                            <span className="custom-btn-icon material-symbols-rounded">add</span>
                          </Button>
                          <Button
                            type="button"
                            variant="outline-danger"
                            shape="circle"
                            size="sm"
                            className={clsx('ms-auto', itemStatus === 'deleting' && 'deleting-button px-3 z-1')}
                            disabled={itemStatus}
                            onClick={() => handleDeleteCart(cartItem.id)}
                          >
                            {itemStatus === 'deleting' ? (
                              <span className="spinner-border spinner-border-sm text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </span>
                            ) : (
                              <span className="custom-btn-icon material-symbols-rounded">delete</span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* item 刪除時遮罩 */}
                  {itemStatus === 'deleting' && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-neutral-50 opacity-50"></div>
                  )}
                </li>
              );
            })}
            {/* 購物車空狀態：載入中顯示 spinner，否則顯示提示文字 */}
            {carts.length === 0 &&
              (cartLoading ? (
                <li className="text-center py-15">
                  <span className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </span>
                </li>
              ) : (
                <li className="text-center text-neutral-500 py-15">購物車內尚無商品</li>
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
                  value={coupon}
                  disabled={carts.length === 0 || couponStatus.isLoading}
                  onChange={e => setCoupon(e.target.value)}
                />
                <Button
                  type="button"
                  variant="filled-primary"
                  shape="square"
                  size="md"
                  className="text-nowrap ms-4"
                  disabled={carts.length === 0 || couponStatus.isLoading}
                  onClick={() => handleApplyCoupon(coupon)}
                >
                  確認
                </Button>
              </div>
              <div className="fs-sm mt-2">
                {couponStatus.isLoading && (
                  <div className="d-flex align-items-center gap-2">
                    <div className="spinner-border spinner-border-sm text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="text-secondary">{couponStatus.message}</span>
                  </div>
                )}
                {couponStatus.message && !couponStatus.isLoading && (
                  <span className={couponStatus.type === 'success' ? 'text-success' : 'text-danger'}>
                    {couponStatus.message}
                  </span>
                )}
              </div>
            </div>
          </section>
          <section className="border border-2 p-4 p-lg-6">
            <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">訂單明細</h6>
            <div className="d-flex justify-content-between mb-3 mb-lg-4">
              <span className="fs-sm fs-lg-8 text-neutral-400">商品小計</span>
              <span className="fs-sm fs-lg-8 text-neutral-400">{`NT$${total.toLocaleString()}`}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 mb-lg-4">
              <span className="fs-sm fs-lg-8 text-neutral-400">折扣優惠</span>
              <span className="fs-sm fs-lg-8 text-secondary">{`NT$${(total - finalTotal).toLocaleString()}`}</span>
            </div>
            <div className="d-flex justify-content-between mb-4 mb-lg-8">
              <span className="fs-lg-7 text-neutral-700">總金額</span>
              <span className="fs-7 fs-lg-6 fw-bold lh-sm noto-serif-tc text-neutral-700">
                {`NT$${finalTotal.toLocaleString()}`}
              </span>
            </div>
            <Button
              type="button"
              variant="filled-primary"
              shape="pill"
              size="lg"
              className="w-100"
              disabled={carts.length === 0 || isCartProcessing}
              onClick={handleSwitchSecondStep}
            >
              前往結帳
            </Button>
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
              id={3}
              title={'天使環生長燈'}
              imageUrl={productAddImg03}
              alt={'多肉植物組合盆栽'}
              tag={'加購價'}
              originPrice={1000}
              price={799}
            />
          </div>
          <div className="col-6 col-lg-3">
            <ProductCard
              id={4}
              title={'陶瓷盆器'}
              imageUrl={productAddImg04}
              alt={'多肉植物組合盆栽'}
              tag={'加購價'}
              originPrice={350}
              price={300}
            />
          </div>
          <div className="col-6 col-lg-3">
            <ProductCard
              id={5}
              title={'園藝工具組'}
              imageUrl={productAddImg05}
              alt={'多肉植物組合盆栽'}
              tag={'加購價'}
              originPrice={650}
              price={500}
            />
          </div>
          <div className="col-6 col-lg-3">
            <ProductCard
              id={2}
              title={'日本赤玉土'}
              imageUrl={productAddImg02}
              alt={'多肉植物組合盆栽'}
              tag={'加購價'}
              originPrice={5900}
              price={3500}
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
                id={7}
                title={'雪夜之森'}
                imageUrl={productImg07}
                alt={'多肉植物組合盆栽'}
                tag={'質感精選'}
                price={2400}
              />
            </div>
            <div className="col-6 col-lg-3">
              <ProductCard
                id={8}
                title={'植語時光'}
                imageUrl={productImg08}
                alt={'多肉植物組合盆栽'}
                tag={'質感精選'}
                price={3000}
              />
            </div>
            <div className="col-6 col-lg-3">
              <ProductCard
                id={13}
                title={'荒原綠影'}
                imageUrl={productImg13}
                alt={'多肉植物組合盆栽'}
                tag={'質感精選'}
                price={2400}
              />
            </div>
            <div className="col-6 col-lg-3">
              <ProductCard
                id={9}
                title={'森語花信'}
                imageUrl={productImg09}
                alt={'多肉植物組合盆栽'}
                tag={'質感精選'}
                price={3500}
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
