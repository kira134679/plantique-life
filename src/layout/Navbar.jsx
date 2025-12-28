import logoSm from 'assets/images/logo-primary-en-sm.svg';
import logoLg from 'assets/images/logo-primary-en-zh-lg.svg';
import { Link } from 'react-router';
import Button from '../components/Button';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top py-2 py-lg-4 bg-white z-index-1035">
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
                <button
                  className="btn cart-toggle-btn"
                  data-bs-toggle="offcanvas"
                  type="button"
                  data-bs-target="#headerOffcanvas"
                  aria-controls="headerOffcanvas"
                >
                  <div className="position-relative">
                    <span className="material-symbols-rounded d-block"> shopping_cart </span>
                    <span
                      className="badge rounded-pill text-bg-danger text-white lh-base py-0 px-1 position-absolute top-0 start-100 cart-badge"
                      id="header-offcanvas-text"
                    >
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
                <button
                  className="btn member-menu-toggle-btn collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#memberMenu"
                  aria-controls="memberMenu"
                  aria-expanded="false"
                  aria-label="Toggle member menu"
                >
                  <span className="material-symbols-rounded d-block"> person </span>
                </button>
                {/* <!-- 會員選單內容 --> */}
                <ul
                  className="collapse position-absolute list-unstyled bg-white text-center member-menu"
                  id="memberMenu"
                >
                  <ul className="list-unstyled p-6">
                    <li className="mb-3">
                      <a className="member-menu-link" href="#">
                        會員中心
                      </a>
                    </li>
                    <li>
                      <a className="member-menu-link" href="#">
                        訂單查詢
                      </a>
                    </li>
                  </ul>
                  <ul className="list-unstyled px-6 pb-6">
                    <li className="pt-6 separator-line-top">
                      <a className="member-menu-link py-1 d-flex justify-content-center align-items-center" href="#">
                        登出 <span className="ms-2 material-symbols-rounded"> logout </span>
                      </a>
                    </li>
                  </ul>
                </ul>
              </li>
            </ul>
          </div>
          {/* <!-- 手機版漢堡選單按鈕 --> */}
          <button
            id="custom-nav-toggle-btn"
            className="btn custom-nav-toggle-btn d-block d-lg-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-rounded d-block d-lg-none"> density_medium </span>
          </button>
          {/* <!-- 手機版導覽列連結 --> */}
          <div
            className="collapse d-lg-none position-absolute text-center bg-white custom-navbar-collapse-mobile"
            id="navbarNav"
          >
            <ul className="navbar-nav p-6 gap-3">
              <li>
                <a className="custom-nav-link" href="#">
                  關於品牌
                </a>
              </li>
              <li>
                <a className="custom-nav-link" href="#">
                  最新消息
                </a>
              </li>
              <li>
                <a className="custom-nav-link" href="product-list.html">
                  植感商品
                </a>
              </li>
              <li>
                <a className="custom-nav-link" href="article-list.html">
                  植藝專欄
                </a>
              </li>
            </ul>
            {/* <!-- 未登入 --> */}
            <ul className="navbar-nav px-6 pb-6 guest">
              <li className="pt-6 separator-line-top">
                <a className="custom-nav-link" href="#">
                  會員登入
                </a>
              </li>
            </ul>
            {/* <!-- 登入後 --> */}
            <ul className="navbar-nav px-6 pb-6 member">
              <li className="pt-6 separator-line-top">
                <a className="custom-nav-link mb-3" href="#">
                  會員中心
                </a>
              </li>
              <li className="pb-6">
                <a className="custom-nav-link" href="#">
                  訂單查詢
                </a>
              </li>
              <li className="pt-6 separator-line-top">
                <a className="custom-nav-link py-1 d-flex justify-content-center align-items-center" href="#">
                  登出 <span className="ms-2 material-symbols-rounded"> logout </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- 手機版導覽列遮罩 --> */}
      <div id="custom-nav-overlay" className="custom-nav-overlay z-index-1034 d-none d-lg-none"></div>
      {/* <!-- 購物車內容 --> */}
      <div
        className="offcanvas offcanvas-end header-offcanvas border-start-0"
        data-bs-scroll="true"
        tabIndex="-1"
        id="headerOffcanvas"
        aria-labelledby="headerOffcanvasLabel"
      >
        <div className="offcanvas-header position-relative">
          <p className="h5 text-primary-700 offcanvas-title" id="headerOffcanvasLabel">
            購物車
          </p>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <ul
            className="header-offcanvas-cart list-unstyled d-flex flex-column gap-4 mb-8"
            id="header-offcanvas-cart"
          ></ul>
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
        </div>
      </div>
    </>
  );
}
