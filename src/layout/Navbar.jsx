import logoSm from 'assets/images/logo-primary-en-sm.svg';
import logoLg from 'assets/images/logo-primary-en-zh-lg.svg';
import { useState } from 'react';
import { Collapse, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router';
import Button from '../components/Button';

export default function Navbar() {
  const [showMemberMenu, setShowMemberMenu] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showDesktopMemberMenu, setShowDesktopMemberMemu] = useState(false);

  const handleCloseMemberMenu = () => setShowMemberMenu(false);
  const handleToggleMemberMenu = () => setShowMemberMenu(!showMemberMenu);

  const handleCloseCartDrawer = () => setShowCartDrawer(false);
  const handleToggleCartDrawer = () => setShowCartDrawer(!showCartDrawer);

  const toggleDesktopMemberMenu = () => setShowDesktopMemberMemu(!showDesktopMemberMenu);

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top py-2 py-lg-4 bg-white z-index-1046">
        <div className="container">
          {/* <!-- LOGO --> */}
          <Link className="d-none d-lg-block w-lg-30" to="/">
            <img src={logoLg} alt="Plantique Life 植感生活" />
          </Link>
          <Link className="d-lg-none" to="/">
            <img src={logoSm} alt="Plantique Life 植感生活" />
          </Link>
          {/* <!-- 網頁版導覽列連結  --> */}
          <div className="d-none d-lg-flex justify-content-center w-lg-40">
            <ul className="navbar-nav">
              <li>
                <Link className="custom-nav-link" to="#">
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
                      0
                    </span>
                  </div>
                </button>
              </li>
              <li className="d-none d-lg-block guest me-4">
                <Button type="button" variant="filled-primary" shape="pill" size="sm">
                  登入
                </Button>
              </li>
              <li className="d-none d-lg-block guest">
                <Button type="button" variant="filled-primary" shape="pill" size="sm">
                  註冊
                </Button>
              </li>
              {/* <!-- 登入後 --> */}
              {/* <!-- 會員選單 --> */}
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
                        <Link className="member-menu-link" href="#">
                          會員中心
                        </Link>
                      </li>
                      <li>
                        <Link className="member-menu-link" href="#">
                          訂單查詢
                        </Link>
                      </li>
                    </ul>
                    <ul className="list-unstyled px-6 pb-6">
                      <li className="pt-6 separator-line-top">
                        <Link
                          className="member-menu-link py-1 d-flex justify-content-center align-items-center"
                          href="#"
                        >
                          登出 <span className="ms-2 material-symbols-rounded"> logout </span>
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </Collapse>
              </li>
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
                  <Link className="custom-nav-link" href="#">
                    關於品牌
                  </Link>
                </li>
                <li>
                  <Link className="custom-nav-link" href="#">
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
              {/* <!-- 未登入 --> */}
              <ul className="navbar-nav px-6 pb-6 guest">
                <li className="pt-6 separator-line-top">
                  <Link className="custom-nav-link" href="#">
                    會員登入
                  </Link>
                </li>
              </ul>
              {/* <!-- 登入後 --> */}
              <ul className="navbar-nav px-6 pb-6 member">
                <li className="pt-6 separator-line-top">
                  <Link className="custom-nav-link mb-3" href="#">
                    會員中心
                  </Link>
                </li>
                <li className="pb-6">
                  <Link className="custom-nav-link" href="#">
                    訂單查詢
                  </Link>
                </li>
                <li className="pt-6 separator-line-top">
                  <Link className="custom-nav-link py-1 d-flex justify-content-center align-items-center" href="#">
                    登出 <span className="ms-2 material-symbols-rounded"> logout </span>
                  </Link>
                </li>
              </ul>
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
      >
        <Offcanvas.Header closeButton className="position-relative">
          <Offcanvas.Title as="p" className="h5 text-primary-700 offcanvas-title">
            購物車
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <ul className="header-offcanvas-cart list-unstyled d-flex flex-column gap-4 mb-8"></ul>
          <div className="mt-auto">
            <Button
              type="button"
              variant="filled-primary"
              shape="pill"
              size="sm"
              rightIcon={true}
              iconName="arrow_right_alt"
              dataId="headerGoCartBtn"
              className="justify-content-center w-100"
            >
              去結帳
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
