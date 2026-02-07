import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Accordion, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router';
import { Autoplay, EffectFade, Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Breadcrumb from '@/components/Breadcrumb';
import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import { getNews, selectNewsList } from '@/slice/news/guestNewsSlice';
import { getProducts, selectCurrentPage, selectProductList, selectTotalPages } from '@/slice/product/guestProductSlice';

const menuItem = [
  { label: '全部', category: null, productType: null, path: '/products' },
  { label: '植栽單品', category: '植栽單品', productType: null, path: '/products?category=植栽單品' },
  { label: '療癒組盆', category: '療癒組盆', productType: null, path: '/products?category=療癒組盆' },
  { label: '客製禮盒', category: '客製禮盒', productType: null, path: '/products?category=客製禮盒' },
  {
    label: '配件商品',
    children: [
      {
        label: '土壤',
        category: '配件商品',
        productType: '土壤',
        path: '/products?category=配件商品&product_type=土壤',
      },
      {
        label: '盆器',
        category: '配件商品',
        productType: '盆器',
        path: '/products?category=配件商品&product_type=盆器',
      },
      {
        label: '裝飾物',
        category: '配件商品',
        productType: '裝飾物',
        path: '/products?category=配件商品&product_type=裝飾物',
      },
    ],
  },
];

const getMobileDropdownLabel = (category, productType) => {
  if (category === null) return '全部';

  if (productType) return productType;

  return category;
};

const isActiveCategory = (item, category, productType) => {
  if (item.category === null) return item.category === category;

  if (item.productType) return category === item.category && productType === item.productType;

  return category === item.category && !productType;
};

export default function ProductList() {
  const newsList = useSelector(selectNewsList);

  const productList = useSelector(selectProductList);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const hasProducts = productList?.length > 0;
  const hasNews = newsList?.length > 0;

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const productType = searchParams.get('product_type');
  const pageStr = searchParams.get('page');

  const mobileDropdownLabel = getMobileDropdownLabel(category, productType);
  const [mobileDropdownShow, setMobileDropdownShow] = useState(false);

  const onPageChange = targetPage => {
    setSearchParams(prev => {
      const newSearchParams = new URLSearchParams(prev);

      if (targetPage > 1) {
        newSearchParams.set('page', String(targetPage));
      } else {
        newSearchParams.delete('page');
      }

      return newSearchParams;
    });
  };

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts({ page: pageStr ? Number(pageStr) : undefined, category, productType }));
  }, [dispatch, pageStr, category, productType]);

  return (
    <>
      {hasNews ? (
        <div className="container-fluid px-0">
          <Swiper
            modules={[Autoplay, EffectFade, SwiperPagination]}
            className="news-swiper"
            effect="fade"
            slidesPerView={1}
            loop={newsList.length > 1}
            autoplay={{ delay: 5300 }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
            }}
          >
            {newsList.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="news-card w-100 position-relative d-lg-flex">
                  <div className="news-card-img-box h-100">
                    <img className="object-fit-cover w-100 h-100" src={item.image} alt={item.title} />
                  </div>
                  <div className="news-card-text flex-grow-1 bg-white bg-opacity-60 bg-opacity-lg-100 px-3 px-lg-10 pt-6 pt-lg-10 pt-xxl-15 position-absolute">
                    <p className="mb-2 mb-lg-3 fs-7 fs-lg-6 fw-bold lh-sm text-primary noto-serif-tc">NEWS</p>
                    <h2 className="mb-lg-3 fs-4 fs-lg-3 fw-bold text-prewrap">{item.title}</h2>
                    <p className="text-neutral-400 d-none d-lg-block text-prewrap">{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination d-flex justify-content-center justify-content-lg-start"></div>
          </Swiper>
        </div>
      ) : null}

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
              <Dropdown autoClose="outside" show={mobileDropdownShow} onToggle={show => setMobileDropdownShow(show)}>
                <Dropdown.Toggle variant={null} bsPrefix="form-select text-start py-4 rounded-0 border-0 border-bottom">
                  {mobileDropdownLabel}
                </Dropdown.Toggle>
                <Dropdown.Menu as="ul" className="dropdown-menu w-100 mt-3 rounded-0 p-3 border-0 dropdown-menu-shadow">
                  {menuItem.map((item, idx) => {
                    return item.children ? (
                      <li className="border-bottom" key={idx}>
                        <Accordion defaultActiveKey="0" bsPrefix={`d-block py-5 px-3`}>
                          <Accordion.Item eventKey="0">
                            <Accordion.Button className={`text-neutral-700 fw-medium d-flex`}>
                              {item.label}
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
                                      onClick={() => setMobileDropdownShow(false)}
                                      className={() =>
                                        clsx([
                                          'd-block border-0 pt-5 pb-0 px-0 fs-sm',
                                          isActiveCategory(item, category, productType)
                                            ? 'text-primary'
                                            : 'text-neutral-400',
                                        ])
                                      }
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
                      <li className="border-bottom" key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={() => setMobileDropdownShow(false)}
                          className={() =>
                            clsx([
                              'd-block fw-medium py-5 px-3',
                              isActiveCategory(item, category, productType) ? 'text-primary' : 'text-neutral-700',
                            ])
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* <!-- 手機版toggle --> */}
            <div className="col-6">
              <div className="d-flex text-center justify-content-around py-2">
                <span className="d-block w-50 fs-sm fw-medium text-primary">最新</span>
                <span className="d-block w-50 fs-sm fw-medium text-primary-400 border-start">熱門</span>
              </div>
            </div>
          </div>

          {/* <!-- 手機版products --> */}
          <div className="row d-lg-none">
            {hasProducts ? (
              productList.map(product => {
                return (
                  <div className="col-6 mb-6" key={product.id}>
                    <ProductCard
                      title={product.title}
                      image={product.imageUrl}
                      alt={product.title}
                      tag={product.category}
                      originPrice={product.origin_price}
                      price={product.price}
                    />
                  </div>
                );
              })
            ) : (
              <div className="col">
                <p className="text-center text-neutral-400 py-8">沒有符合條件的商品。</p>
              </div>
            )}
          </div>

          {/* <!-- 電腦版 --> */}
          <div className="d-none d-lg-block">
            <div className="row">
              <div className="col-3">
                <ul className="w-100 rounded-0 list-unstyled sticky-top product-list-lg-menu">
                  {menuItem.map((item, idx) => {
                    return item.children ? (
                      <li key={idx} className="border-bottom">
                        <Accordion defaultActiveKey="0" bsPrefix="p-6">
                          <Accordion.Item eventKey="0">
                            <Accordion.Button className="text-neutral-700 fs-6 fw-medium d-flex">
                              {item.label}
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
                                      className={() =>
                                        clsx([
                                          'd-block border-0 pt-5 pb-0 px-0 fs-8',
                                          isActiveCategory(item, category, productType)
                                            ? 'text-primary'
                                            : 'text-neutral-400 accessories-item',
                                        ])
                                      }
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
                        <NavLink
                          to={item.path}
                          className={() =>
                            clsx([
                              'd-block fs-6 fw-medium p-6',
                              isActiveCategory(item, category, productType) ? 'text-primary' : 'text-neutral-700',
                            ])
                          }
                        >
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
                    <span className="d-block w-50 fs-8 fw-medium text-primary">最新商品</span>
                    <span className="d-block w-50 fs-8 fw-medium text-primary-400 border-start">熱門商品</span>
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
                  {hasProducts ? (
                    productList.map(product => {
                      return (
                        <div className="col-4 mb-6" key={product.id}>
                          <ProductCard
                            title={product.title}
                            image={product.imageUrl}
                            alt={product.title}
                            tag={product.category}
                            originPrice={product.origin_price}
                            price={product.price}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="col">
                      <p className="text-center text-neutral-400 py-8">沒有符合條件的商品。</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- pagination --> */}
          <nav aria-label="Page" className="py-6 py-lg-10">
            <Pagination
              className="justify-content-end"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={page => onPageChange(page)}
            />
          </nav>
        </main>
      </div>
    </>
  );
}
