import logoSm from 'assets/images/logo-primary-en-sm.svg';
import logoLg from 'assets/images/logo-primary-en-zh-lg.svg';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Collapse, Offcanvas } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

import { usePendingAuthAction } from '@/hook/usePendingAuthAction';
import {
  authAwareDeleteCart,
  authAwareInitCarts,
  authAwareUpdateCart,
  resetCart,
  selectHasItemLoading,
} from '@/slice/cartSlice';
import { guestAuthCheck, guestLogout } from '@/slice/guestAuthSlice';
import { closeModal, openModal } from '@/slice/uiSlice';
import Button from '../components/Button';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMemberMenu, setShowMemberMenu] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showDesktopMemberMenu, setShowDesktopMemberMemu] = useState(false);

  // 從 Redux 取得購物車資料
  const { carts, loadingItems, isLoading: cartLoading, isMigrating: cartMigrating } = useSelector(state => state.cart);
  // 購物車中是否有任何品項正在載入
  const hasItemLoading = useSelector(selectHasItemLoading);
  // 購物車是否正在處理中
  const isCartProcessing = cartLoading || hasItemLoading || cartMigrating;

  const { isAuth, isAuthChecked } = useSelector(state => state.guestAuth);
  const { requireAuth } = usePendingAuthAction();

  const handleCloseMemberMenu = () => setShowMemberMenu(false);
  const handleToggleMemberMenu = () => setShowMemberMenu(!showMemberMenu);

  const handleCloseCartDrawer = () => setShowCartDrawer(false);
  const handleToggleCartDrawer = () => setShowCartDrawer(!showCartDrawer);

  const toggleDesktopMemberMenu = () => setShowDesktopMemberMemu(!showDesktopMemberMenu);
  const closeDesktopMemberMenu = () => setShowDesktopMemberMemu(false);

  useEffect(() => {
    async function init() {
      try {
        // 驗證登入狀態，不使用 unwrap()，改用 match() 處理 rejected 結果
        // 避免未登入的情況被當作 exception 拋到 catch
        const result = await dispatch(guestAuthCheck({ preventGlobalLoading: true }));
        if (guestAuthCheck.rejected.match(result)) {
          toast.error(result.payload);
        }
        // 初始化購物車資料
        await dispatch(authAwareInitCarts(true));
      } catch (error) {
        toast.error(error);
      }
    }
    init();
  }, [dispatch]);

  // 更新購物車數量
  async function handleUpdateCart(cartItemId, productId, qty) {
    try {
      await dispatch(authAwareUpdateCart({ cartItemId, productId, qty, preventGlobalLoading: true }));
    } catch (error) {
      toast.error(error);
    }
  }

  // 刪除購物車項目
  async function handleDeleteCart(cartItemId) {
    try {
      await dispatch(authAwareDeleteCart({ cartItemId, preventGlobalLoading: true }));
      toast.success('刪除成功');
    } catch (error) {
      toast.error(error);
    }
  }

  function handleLogout() {
    dispatch(guestLogout());
    dispatch(resetCart());
    toast.success('登出成功');
    dispatch(closeModal());
    handleCloseMemberMenu();
    closeDesktopMemberMenu();
  }

  async function handleGoCart() {
    const callback = async () => {
      // 關閉所有展開內容
      handleCloseMemberMenu();
      closeDesktopMemberMenu();
      handleCloseCartDrawer();

      // 跳轉至購物車頁面
      navigate('/shopping-cart');
    };
    requireAuth(callback);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top py-2 py-lg-4 bg-white z-index-1046">
        <div className="container">
          {/* <!-- LOGO --> */}
          <Link className="d-none d-lg-block w-lg-30" to="/">
            <img src={logoLg} alt="Plantique Life 植感生活" />
          </Link>
          <Link className="d-lg-none" to="/" onClick={handleCloseMemberMenu}>
            <img src={logoSm} alt="Plantique Life 植感生活" />
          </Link>
          {/* <!-- 網頁版導覽列連結  --> */}
          <div className="d-none d-lg-flex justify-content-center w-lg-40">
            <ul className="navbar-nav">
              <li>
                <Link className="custom-nav-link" to="/about">
                  關於品牌
                </Link>
              </li>
              <li>
                <Link className="custom-nav-link" to="#">
                  最新消息
                </Link>
              </li>
              <li>
                <Link className="custom-nav-link" to="/products">
                  植感商品
                </Link>
              </li>
              <li>
                <Link className="custom-nav-link" to="/articles">
                  植藝專欄
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- 購物車、電腦版註冊登入、會員選單 --> */}
          <div className="ms-auto w-lg-30">
            <ul className="d-flex list-unstyled align-items-center justify-content-end">
              <li className="me-2 me-lg-4">
                <button type="button" className="btn cart-toggle-btn" onClick={handleToggleCartDrawer}>
                  <div className="position-relative">
                    <span className="material-symbols-rounded d-block"> shopping_cart </span>
                    <span className="badge rounded-pill text-bg-danger text-white lh-base py-0 px-1 position-absolute top-0 start-100 cart-badge">
                      {isCartProcessing ? (
                        <div className="navbar-spinner-wrapper d-flex align-items-center">
                          <span className="spinner-border spinner-border-sm text-white" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </span>
                        </div>
                      ) : (
                        carts.length
                      )}
                    </span>
                  </div>
                </button>
              </li>
              {isAuthChecked && !isAuth && (
                <>
                  <li className="d-none d-lg-block guest me-4">
                    <Button
                      type="button"
                      variant="filled-primary"
                      shape="pill"
                      size="sm"
                      className="text-nowrap"
                      onClick={() => dispatch(openModal('login'))}
                    >
                      登入
                    </Button>
                  </li>
                  <li className="d-none d-lg-block guest">
                    <Button
                      type="button"
                      variant="filled-primary"
                      shape="pill"
                      size="sm"
                      className="text-nowrap"
                      onClick={() => dispatch(openModal('register'))}
                    >
                      註冊
                    </Button>
                  </li>
                </>
              )}
              {/* <!-- 登入後 --> */}
              {/* <!-- 會員選單 --> */}
              {isAuthChecked && isAuth && (
                <li className="d-none d-lg-block position-relative member">
                  {/* <!-- 會員選單按鈕 --> */}

                  <Button type="button" className="member-menu-toggle-btn" onClick={toggleDesktopMemberMenu}>
                    <span className="material-symbols-rounded d-block"> person </span>
                  </Button>

                  {/* <!-- 會員選單內容 --> */}

                  <Collapse in={showDesktopMemberMenu}>
                    <ul className="position-absolute list-unstyled bg-white text-center member-menu">
                      <ul className="list-unstyled p-6">
                        <li className="mb-3">
                          <Link className="member-menu-link" to="/member" onClick={closeDesktopMemberMenu}>
                            會員中心
                          </Link>
                        </li>
                        <li>
                          <Link className="member-menu-link" to="/member/orders" onClick={closeDesktopMemberMenu}>
                            訂單查詢
                          </Link>
                        </li>
                      </ul>
                      <ul className="list-unstyled px-6 pb-6">
                        <li className="pt-6 separator-line-top">
                          <Button
                            type="button"
                            className="member-menu-link w-100 py-1 d-flex justify-content-center align-items-center"
                            onClick={handleLogout}
                          >
                            登出 <span className="ms-2 material-symbols-rounded"> logout </span>
                          </Button>
                        </li>
                      </ul>
                    </ul>
                  </Collapse>
                </li>
              )}
            </ul>
          </div>

          <button
            type="button"
            className="btn custom-nav-toggle-btn d-block d-lg-none"
            onClick={handleToggleMemberMenu}
          >
            <span className="material-symbols-rounded d-block d-lg-none"> density_medium </span>
          </button>

          {/* <!-- 手機版漢堡選單按鈕 --> */}

          <Offcanvas
            show={showMemberMenu}
            onHide={handleCloseMemberMenu}
            placement="top"
            scroll={true}
            className="mobile-menu-offcanvas"
          >
            <Offcanvas.Body className="d-lg-none text-center bg-white p-0">
              <ul className="navbar-nav p-6 gap-3">
                <li>
                  <Link className="custom-nav-link" to="/about" onClick={handleCloseMemberMenu}>
                    關於品牌
                  </Link>
                </li>
                <li>
                  <Link className="custom-nav-link" href="#">
                    最新消息
                  </Link>
                </li>
                <li>
                  <Link className="custom-nav-link" to="/products" onClick={handleCloseMemberMenu}>
                    植感商品
                  </Link>
                </li>
                <li>
                  <Link className="custom-nav-link" to="/articles" onClick={handleCloseMemberMenu}>
                    植藝專欄
                  </Link>
                </li>
              </ul>
              {/* <!-- 未登入 --> */}
              {isAuthChecked && !isAuth && (
                <ul className="navbar-nav px-6 pb-6 guest">
                  <li className="pt-6 separator-line-top">
                    <Button
                      type="button"
                      className="custom-nav-link w-100"
                      onClick={() => {
                        dispatch(openModal('login'));
                        handleCloseMemberMenu();
                      }}
                    >
                      會員登入
                    </Button>
                  </li>
                </ul>
              )}
              {/* <!-- 登入後 --> */}
              {isAuthChecked && isAuth && (
                <ul className="navbar-nav px-6 pb-6 member">
                  <li className="pt-6 separator-line-top">
                    <Link className="custom-nav-link mb-3" to="/member" onClick={handleCloseMemberMenu}>
                      會員中心
                    </Link>
                  </li>
                  <li className="pb-6">
                    <Link className="custom-nav-link" to="/member/orders" onClick={handleCloseMemberMenu}>
                      訂單查詢
                    </Link>
                  </li>
                  <li className="pt-6 separator-line-top">
                    <Button
                      type="button"
                      className="custom-nav-link w-100 py-1 d-flex justify-content-center align-items-center"
                      onClick={handleLogout}
                    >
                      登出 <span className="ms-2 material-symbols-rounded"> logout </span>
                    </Button>
                  </li>
                </ul>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>

      <Offcanvas
        show={showCartDrawer}
        onHide={handleCloseCartDrawer}
        placement="end"
        scroll={true}
        className="header-offcanvas border-start-0 z-index-1050"
        backdropClassName="z-index-1046"
      >
        <Offcanvas.Header closeButton className="position-relative">
          <Offcanvas.Title as="p" className="h5 text-primary-700 offcanvas-title">
            購物車
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <ul className="header-offcanvas-cart list-unstyled d-flex flex-column gap-4 mb-8">
            {!cartMigrating &&
              carts.map(cartItem => {
                const itemStatus = loadingItems[cartItem.id] || null;
                return (
                  <li key={cartItem.id} className="position-relative">
                    <div className="card border-0 flex-row">
                      <img
                        src={cartItem.product.imageUrl}
                        className="card-img-top w-25 rounded-0 object-fit-cover"
                        alt={cartItem.product.title}
                      />
                      <div className="card-body d-flex flex-column p-0 ms-3">
                        <p className="card-title fs-6 noto-serif-tc fw-bold text-neutral-700 mb-1">
                          {cartItem.product.title}
                        </p>
                        <div className="d-flex align-items-center mb-1">
                          <p className="card-text text-neutral-700 noto-serif-tc fw-bold me-1">{`NT$${cartItem.product.price.toLocaleString()}`}</p>
                        </div>
                        <div className="d-flex align-items-center mt-auto">
                          <Button
                            type="button"
                            variant="outline-neutral"
                            shape="circle"
                            size="sm"
                            className="p-1"
                            disabled={cartItem.qty <= 1 || itemStatus}
                            onClick={() => handleUpdateCart(cartItem.id, cartItem.product_id, cartItem.qty - 1)}
                          >
                            <span className="custom-btn-icon material-symbols-rounded">remove</span>
                          </Button>
                          <div className="text-center">
                            <span className="px-2 me-1" data-action="quantity">
                              {cartItem.qty}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="outline-neutral"
                            shape="circle"
                            size="sm"
                            className="p-1"
                            disabled={itemStatus}
                            onClick={() => handleUpdateCart(cartItem.id, cartItem.product_id, cartItem.qty + 1)}
                          >
                            <span className="custom-btn-icon material-symbols-rounded">add</span>
                          </Button>
                          {itemStatus === 'updating' && (
                            <div className="ms-3">
                              <span className="spinner-border spinner-border-sm text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </span>
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="outline-danger"
                            shape="circle"
                            size="sm"
                            className={clsx('p-1 ms-auto', itemStatus === 'deleting' && 'deleting-button px-2 z-1')}
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
                    {/* item 刪除時遮罩 */}
                    {itemStatus === 'deleting' && (
                      <div className="position-absolute top-0 start-0 w-100 h-100 bg-neutral-50 opacity-50"></div>
                    )}
                  </li>
                );
              })}
            {/* Migration spinner */}
            {cartMigrating && <li className="text-center text-neutral-500 py-12">正在同步您的購物車...</li>}
            {/* 購物車空狀態：非 migration 時，依 cartLoading 顯示 spinner，否則顯示提示文字 */}
            {carts.length === 0 &&
              !cartMigrating &&
              (cartLoading ? (
                <li className="text-center py-12">
                  <span className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </span>
                </li>
              ) : (
                <li className="text-center text-neutral-500 py-12">購物車內尚無商品</li>
              ))}
          </ul>
          <div className="mt-auto">
            <Button
              type="button"
              variant="filled-primary"
              shape="pill"
              size="sm"
              rightIcon={true}
              iconName="arrow_right_alt"
              className={clsx('justify-content-center w-100', (carts.length === 0 || isCartProcessing) && 'disabled')}
              onClick={handleGoCart}
            >
              去結帳
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
