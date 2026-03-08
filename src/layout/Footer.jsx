import logo from 'assets/images/logo-white-en-lg.svg';
import facebookIcon from 'assets/images/sns/facebook.svg';
import igIcon from 'assets/images/sns/ig.svg';
import lineIcon from 'assets/images/sns/line.svg';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="footer bg-primary-500 py-12 py-lg-15">
      <div className="container">
        <div className="row mb-10 mb-lg-6">
          {/* <!-- 營業資訊 --> */}
          <section className="col-lg-4 order-lg-2 mb-10 mb-lg-0">
            <div className="mb-4 mb-lg-6">
              <a className="d-block pt-3 pb-2" href="index.html">
                <img src={logo} alt="Plantique Life" />
              </a>
            </div>
            <p className="text-white mb-2 d-flex align-items-center">
              <span className="material-symbols-rounded align-bottom me-2 me-lg-3 fs-6"> schedule </span>平日&ensp;
              <time dateTime="09:00">09:00</time>&thinsp;-&thinsp;<time dateTime="21:00">21:00</time>
            </p>
            <p className="text-white mb-4 mb-lg-6 d-flex align-items-center">
              <span className="material-symbols-rounded align-bottom me-2 me-lg-3 fs-6"> mail </span>
              <a href="mailto:PlaniqueLife@example.invalid" className="text-white">
                PlaniqueLife@gmail.com
              </a>
            </p>
            <div className="d-flex column-gap-4">
              <button className="btn custom-btn-social" type="button">
                <img className="custom-btn-icon" src={facebookIcon} alt="icon-facebook" />
              </button>
              <button className="btn custom-btn-social" type="button">
                <img className="custom-btn-icon" src={lineIcon} alt="icon-line" />
              </button>
              <button className="btn custom-btn-social" type="button">
                <img className="custom-btn-icon" src={igIcon} alt="icon-instagram" />
              </button>
            </div>
          </section>
          {/* <!-- 網站地圖 --> */}
          <section className="col-lg-8 order-lg-1">
            <div className="d-flex justify-content-between gap-lg-6 justify-content-lg-start text-center">
              <div>
                <p className="text-primary-200 mb-4 mb-lg-6">Member</p>
                <ul className="list-unstyled">
                  <li className="mb-1 mb-lg-2">
                    <a className="link-white site-map-link" href="#">
                      會員權益
                    </a>
                  </li>
                  <li>
                    <a className="link-white site-map-link" href="#">
                      會員帳戶
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-primary-200 mb-4 mb-lg-6">About Us</p>
                <ul className="list-unstyled">
                  <li className="mb-1 mb-lg-2">
                    <Link className="link-white site-map-link" to="/about">
                      關於植感
                    </Link>
                  </li>
                  <li>
                    <Link className="link-white site-map-link" to="/articles">
                      植藝生活
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-primary-200 mb-4 mb-lg-6">Product</p>
                <ul className="list-unstyled">
                  <li className="mb-1 mb-lg-2">
                    <a className="link-white site-map-link" href="#">
                      植感精選
                    </a>
                  </li>
                  <li className="mb-1 mb-lg-2">
                    <a className="link-white site-map-link" href="product-list.html">
                      所有商品
                    </a>
                  </li>
                  <li>
                    <a className="link-white site-map-link" href="#">
                      配件商品
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-primary-200 mb-4 mb-lg-6">FAQs</p>
                <ul className="list-unstyled">
                  <li className="mb-1 mb-lg-2">
                    <a className="link-white site-map-link" href="#">
                      購物須知
                    </a>
                  </li>
                  <li>
                    <a className="link-white site-map-link" href="#">
                      退換貨政策
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        {/* <!-- Copyright --> */}
        <div className="d-flex flex-column text-center justify-content-center flex-lg-row justify-content-lg-start align-items-center text-lg-start">
          <p className="text-white me-0 mb-lg-0 me-lg-6 mb-1">© 2025 PlantiqueLife All rights reserved.</p>
          <ul className="d-flex list-unstyled">
            <li className="me-3 me-lg-6">
              <a className="link-white" href="#">
                隱私權政策
              </a>
            </li>
            <li>
              <a className="link-white" href="#">
                使用者條款
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
