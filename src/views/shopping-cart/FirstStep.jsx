import { guestCouponApi } from '@/api';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { MAX_RECOMMEND_PRODUCTS_DISPLAY_COUNT } from '@/const/guestConst';
import { deleteAndRefetchCarts, fetchCarts, selectHasItemLoading, updateAndRefetchCarts } from '@/slice/cartSlice';
import { selectAllProducts } from '@/slice/product/guestProductSlice';
import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

// 模組載入時執行一次（非 render 期間），作為 PRNG 的初始種子
const SHUFFLE_SEED = Date.now();

function FirstStep({ handleSwitchStep }) {
  const dispatch = useDispatch();
  const {
    carts,
    total,
    finalTotal,
    isLoading: cartLoading,
    loadingItems,
    isMigrating: cartMigrating,
  } = useSelector(state => state.cart);

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

  const allProducts = useSelector(selectAllProducts);
  // 凍結推薦清單：計算一次後不再重算（避免後續購物車操作影響推薦結果）
  const frozenRecommendationsRef = useRef(null);
  const recommendProducts = useMemo(() => {
    // 已計算過，直接回傳凍結的推薦清單
    // eslint-disable-next-line react-hooks/refs -- 刻意在 useMemo 內讀取 ref 作為 guard，確保只計算一次
    if (frozenRecommendationsRef.current !== null) return frozenRecommendationsRef.current;

    // 等待 allProducts 與購物車初始載入或轉移都完成再計算，避免 carts 尚未就緒導致排除不完整
    if (!allProducts.length || cartLoading || cartMigrating) return [];

    // 排除購物車中已有的商品
    const cartProductIds = new Set(carts.map(item => item.product_id));
    const candidates = allProducts.filter(p => !cartProductIds.has(p.id));

    // Fisher-Yates 洗牌（以 LCG 偽隨機數生成器取代 Math.random()，避免觸發 react-hooks/purity 規則）
    // s 是閉包變數（Closure Variable）：rand 每次呼叫都會讀取並更新 s，使下次呼叫拿到不同的輸入，產生連續不重複的偽隨機數列
    let s = SHUFFLE_SEED;
    // 逗號運算子（Comma Operator）：括號內依序執行，回傳最後一個表達式的值
    // 等同於：先更新 s，再 return (s >>> 0) / 4294967296
    const rand = () => ((s = Math.imul(s, 1664525) + 1013904223), (s >>> 0) / 4294967296);
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    // 取前 N 筆，存入 ref 凍結
    const result = candidates.slice(0, MAX_RECOMMEND_PRODUCTS_DISPLAY_COUNT);
    // eslint-disable-next-line react-hooks/refs -- 刻意在 useMemo 內寫入 ref，凍結首次計算結果
    frozenRecommendationsRef.current = result;
    return result;
  }, [allProducts, cartLoading, cartMigrating, carts]);

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
            {!cartMigrating &&
              carts.map(cartItem => {
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
            {/* Migration spinner */}
            {cartMigrating && <li className="text-center text-neutral-500 py-15">正在同步您的購物車...</li>}
            {/* 購物車空狀態：非 migration 時，依 cartLoading 顯示 spinner，否則顯示提示文字 */}
            {carts.length === 0 &&
              !cartMigrating &&
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

      {/* recommend section start */}
      {recommendProducts.length > 0 && (
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
              {recommendProducts.map(product => (
                <div className="col-6 col-lg-3" key={product.id}>
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    imageUrl={product.imageUrl}
                    alt={product.title}
                    tag={product.category}
                    originPrice={product.origin_price}
                    price={product.price}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* recommend section end */}
    </>
  );
}

export default FirstStep;
