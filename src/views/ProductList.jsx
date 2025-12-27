import newsImg1 from 'assets/images/news/img_news_01.png';
import newsImg2 from 'assets/images/news/img_news_02.png';
import newsImg3 from 'assets/images/news/img_news_03.png';
import productImg1 from 'assets/images/products/img_product_01.png';
import productImg2 from 'assets/images/products/img_product_02.png';
import productImg3 from 'assets/images/products/img_product_03.png';
import productImg4 from 'assets/images/products/img_product_04.png';
import productImg5 from 'assets/images/products/img_product_05.png';
import productImg7 from 'assets/images/products/img_product_07.png';
import productImg8 from 'assets/images/products/img_product_08.png';
import productImg9 from 'assets/images/products/img_product_09.png';
import productImg10 from 'assets/images/products/img_product_10.png';
import productImg11 from 'assets/images/products/img_product_11.png';
import productImg12 from 'assets/images/products/img_product_12.png';
import productImg13 from 'assets/images/products/img_product_13.png';
import { Fragment } from 'react';
import { Accordion } from 'react-bootstrap';
import { NavLink } from 'react-router';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';

const events = [
  {
    title: '送禮不只月餅\n中秋綠意禮盒預購中！',
    description: '結合優雅設計與療癒綠意。\n這個秋天，送出專屬於你的植感心意！',
    image: newsImg1,
    link: '#',
    start_at: '2025/08/01',
    end_at: '2025/09/20',
  },
  {
    title: '本月打卡活動開跑！\n# 我的療癒角落，抽盆器好禮！',
    description: '迷你多肉，輕鬆點綴辦公桌。\n在忙碌與螢幕之間，留一點空間給綠意。',
    image: newsImg2,
    link: '#',
    start_at: '2025/08/01',
    end_at: '2025/08/30',
  },
  {
    title: '新會員募集中！\n加入即享首購金 250 元',
    description: '結合優雅設計與療癒綠意。\n這個秋天，送出專屬於你的植感心意！',
    image: newsImg3,
    link: '#',
    start_at: '2025/07/01',
    end_at: '2025/12/31',
  },
];

const products = [
  {
    alt: '雪夜之森',
    image: productImg7,
    tag: '質感精選',
    title: '雪夜之森',
    price: 'NT$2,400',
  },
  {
    alt: '植語時光',
    image: productImg8,
    tag: '質感精選',
    title: '植語時光',
    price: 'NT$3,000',
  },
  {
    alt: '異國風情',
    image: productImg10,
    tag: '質感精選',
    title: '異國風情',
    price: 'NT$3,500',
  },
  {
    alt: '森語花信',
    image: productImg9,
    tag: '質感精選',
    title: '森語花信',
    price: 'NT$3,500',
  },
  {
    alt: '垂綠星河',
    image: productImg11,
    tag: '質感精選',
    title: '垂綠星河',
    price: 'NT$3,600',
  },
  {
    alt: '綠庭物語',
    image: productImg12,
    tag: '質感精選',
    title: '綠庭物語',
    price: 'NT$2,400',
  },
  {
    alt: '荒原綠影',
    image: productImg13,
    tag: '質感精選',
    title: '荒原綠影',
    price: 'NT$2,400',
  },
  {
    alt: '泡泡森林',
    image: productImg1,
    tag: '質感精選',
    title: '泡泡森林',
    price: 'NT$6,200',
  },
  {
    alt: '向陽而生',
    image: productImg2,
    tag: '質感精選',
    title: '向陽而生',
    price: 'NT$7,200',
  },
  {
    alt: '暮光角落',
    image: productImg3,
    tag: '質感精選',
    title: '暮光角落',
    price: 'NT$7,500',
  },
  {
    alt: '雲深處靜',
    image: productImg4,
    tag: '質感精選',
    title: '雲深處靜',
    price: 'NT$6,600',
  },
  {
    alt: '玉露女王',
    image: productImg5,
    tag: '質感精選',
    title: '玉露女王',
    price: 'NT$5,200',
  },
];

const menuItem = [
  { label: '全部', path: '/products' },
  { label: '植栽單品', path: '/products?category=item' },
  { label: '療癒組盆', path: '/products?category=bundle' },
  { label: '客製禮盒', path: '/products?category=giftbox' },
  {
    label: '配件商品',
    children: [
      { label: '土壤', path: '/products?category=merchandise&product_type=soil' },
      { label: '盆器', path: '/products?category=merchandise&product_type=pots' },
      { label: '裝飾物', path: '/products?category=merchandise&product_type=accessories' },
    ],
  },
];

export default function ProductList() {
  return (
    <>
      <div className="news">
        <div className="swiper">
          <div className="swiper-wrapper">
            {events.map((item, idx) => {
              return (
                <div className="swiper-slide" key={idx}>
                  <div className="news-card w-100 position-relative d-lg-flex">
                    <div className="news-card-img-box h-100">
                      <img className="object-fit-cover w-100 h-100" src={item.image} alt={item.title} />
                    </div>
                    <div className="news-card-text bg-white bg-opacity-60 px-3 px-lg-10 pt-6 pt-lg-10 pt-xxl-15 position-absolute">
                      <p className="mb-2 mb-lg-3 fs-7 fs-lg-6 fw-bold lh-sm text-primary noto-serif-tc">NEWS</p>
                      <h2 className="mb-lg-3 fs-4 fs-lg-3 fw-bold">
                        {item.title.split('\n').map((line, idx, arr) => (
                          <Fragment key={idx}>
                            {line}
                            {idx < arr.length - 1 && <br />}
                          </Fragment>
                        ))}
                      </h2>
                      <p className="text-neutral-400 d-none d-lg-block">
                        {item.description.split('\n').map((line, idx, arr) => (
                          <Fragment key={idx}>
                            {line}
                            {idx < arr.length - 1 && <br />}
                          </Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      <div className="container">
        <div className="py-4 py-lg-6">
          <Breadcrumb />
        </div>

        <main className="py-8 py-lg-13">
          {/* <!-- 手機版search --> */}
          <form className="position-relative mb-4 d-lg-none">
            <span className="material-symbols-rounded align-bottom position-absolute top-50 start-0 translate-middle-y ps-4 text-primary">
              search
            </span>
            <input
              type="search"
              className="form-control py-3 ps-12 rounded-0"
              id="search-sm"
              placeholder="尋找你的療癒角落"
            />
          </form>

          {/* <!-- 手機版category --> */}
          <div className="row align-items-center mb-6 d-lg-none">
            <div className="col-6">
              <div className="dropdown">
                <button
                  className="form-select text-start py-4 rounded-0 border-0 border-bottom"
                  type="button"
                  id="catalog"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  全部
                </button>
                <ul
                  className="dropdown-menu w-100 mt-3 rounded-0 p-3 border-0 dropdown-menu-shadow"
                  aria-labelledby="catalog"
                >
                  <li className="border-bottom">
                    <a className="dropdown-item fw-medium py-5 px-3 text-neutral-700" href="#">
                      全部
                    </a>
                  </li>

                  <li className="border-bottom">
                    <a className="dropdown-item fw-medium py-5 px-3 text-neutral-700" href="#">
                      植栽單品
                    </a>
                  </li>

                  <li className="border-bottom">
                    <a className="dropdown-item fw-medium py-5 px-3 text-neutral-700" href="#">
                      療癒組盆
                    </a>
                  </li>

                  <li className="border-bottom">
                    <a className="dropdown-item fw-medium py-5 px-3 text-neutral-700" href="#">
                      客製禮盒
                    </a>
                  </li>

                  <li className="border-bottom py-5 px-3 accordion-item">
                    <button
                      type="button"
                      className="list-group-item list-group-item-action text-neutral-700 fw-medium d-flex accordion-header"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseAccessories"
                      aria-expanded="false"
                    >
                      配件商品
                      <span className="material-symbols-rounded align-bottom ms-auto accordion-icon">
                        keyboard_arrow_down
                      </span>
                    </button>

                    <div className="collapse" id="collapseAccessories">
                      <ul className="list-group list-unstyled">
                        <li>
                          <a
                            href="#"
                            className="list-group-item accessories-item border-0 pt-5 pb-0 px-0 fs-sm text-neutral-400"
                          >
                            土壤
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="list-group-item accessories-item border-0 pt-5 pb-0 px-0 fs-sm text-neutral-400"
                          >
                            盆器
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="list-group-item accessories-item border-0 pt-5 pb-0 px-0 fs-sm text-neutral-400"
                          >
                            裝飾物
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* <!-- 手機版toggle --> */}
            <div className="col-6">
              <div className="d-flex text-center justify-content-around py-2">
                <a href="#" className="d-block w-50 fs-sm fw-medium text-primary">
                  最新
                </a>
                <a href="#" className="d-block w-50 fs-sm fw-medium text-primary-400 border-start">
                  熱門
                </a>
              </div>
            </div>
          </div>

          {/* <!-- 手機版products --> */}
          <div className="row d-lg-none">
            {products.map((item, idx) => {
              return (
                <div className="col-6 mb-6" key={idx}>
                  <ProductCard
                    title={item.title}
                    image={item.image}
                    alt={item.alt}
                    tag={item.tag}
                    originPrice={item.originPrice}
                    price={item.price}
                  />
                </div>
              );
            })}
          </div>

          {/* <!-- 電腦版 --> */}
          <div className="d-none d-lg-block">
            <div className="row">
              <div className="col-3">
                <ul className="w-100 rounded-0 list-unstyled sticky-top product-list-lg-menu">
                  {menuItem.map((item, idx) => {
                    return item.children ? (
                      <li key={idx}>
                        <Accordion defaultActiveKey={['0']} bsPrefix="border-bottom p-6 accordion-item" alwaysOpen>
                          <Accordion.Item eventKey="0">
                            <Accordion.Button className="text-neutral-700 fs-6 fw-medium d-flex accordion-header">
                              配件商品
                              <span className="material-symbols-rounded align-bottom ms-auto accordion-icon">
                                keyboard_arrow_down
                              </span>
                            </Accordion.Button>
                            <Accordion.Body>
                              <ul className="list-unstyled">
                                {item.children.map(item => (
                                  <li key={item.path}>
                                    <NavLink
                                      to={item.path}
                                      className="d-block border-0 pt-5 pb-0 px-0 fs-8 text-neutral-400 accessories-item"
                                    >
                                      {item.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </li>
                    ) : (
                      <li className="border-bottom" key={idx}>
                        <NavLink to={item.path} className={`d-block fs-6 fw-medium p-6 text-neutral-700`}>
                          {item.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-9">
                <div className="d-flex gap-6 mb-6">
                  <div className="d-flex text-center justify-content-around w-100 py-3">
                    <a href="#" className="d-block w-50 fs-8 fw-medium text-primary">
                      最新商品
                    </a>
                    <a href="#" className="d-block w-50 fs-8 fw-medium text-primary-400 border-start">
                      熱門商品
                    </a>
                  </div>
                  <form className="position-relative w-100">
                    <span className="material-symbols-rounded align-bottom position-absolute top-50 start-0 translate-middle-y ps-4 text-primary">
                      search
                    </span>
                    <input
                      type="search"
                      className="form-control py-3 ps-12 rounded-0 border-box"
                      id="search-lg"
                      placeholder="尋找你的療癒角落"
                    />
                  </form>
                </div>

                {/* <!-- 產品列表 --> */}
                <div className="row">
                  {products.map((item, idx) => {
                    return (
                      <div className="col-4 mb-6" key={idx}>
                        <ProductCard
                          title={item.title}
                          image={item.image}
                          alt={item.alt}
                          tag={item.tag}
                          originPrice={item.originPrice}
                          price={item.price}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- pagination --> */}
          <nav aria-label="Page" className="py-6 py-lg-10">
            <ul className="pagination justify-content-end">
              <li className="page-item me-4">
                <a className="page-link p-0 border-0 rounded-circle">
                  <span className="material-symbols-rounded p-2 text-neutral-700"> chevron_left </span>
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-white bg-primary" href="#">
                  1
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-neutral-700" href="#">
                  2
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-neutral-700" href="#">
                  3
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-neutral-700" href="#">
                  ...
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-neutral-700" href="#">
                  20
                </a>
              </li>
              <li className="page-item">
                <a className="page-link p-0 border-0 rounded-circle text-neutral-700" href="#">
                  <span className="material-symbols-rounded p-2"> chevron_right </span>
                </a>
              </li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}
