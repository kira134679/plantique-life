import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import productImg7 from 'assets/images/products/img_product_07.png';
import productImg8 from 'assets/images/products/img_product_08.png';
import productImg9 from 'assets/images/products/img_product_09.png';
import productImg132 from 'assets/images/products/img_product_13-2.png';
import productImg133 from 'assets/images/products/img_product_13-3.png';
import productImg13 from 'assets/images/products/img_product_13.png';
import { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { useLoaderData } from 'react-router';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 7,
    alt: '雪夜之森',
    image: productImg7,
    tag: '質感精選',
    title: '雪夜之森',
    price: 2400,
  },
  {
    id: 8,
    alt: '植語時光',
    image: productImg8,
    tag: '質感精選',
    title: '植語時光',
    price: 3000,
  },
  {
    id: 9,
    alt: '森語花信',
    image: productImg9,
    tag: '質感精選',
    title: '森語花信',
    price: 3500,
  },
  {
    id: 13,
    alt: '荒原綠影',
    image: productImg13,
    tag: '質感精選',
    title: '荒原綠影',
    price: 2400,
  },
];

export default function ProductDetail() {
  const { product } = useLoaderData().productData;
  const [thumbSwiper, setThumbSwiper] = useState(null);

  const displayImagesUrl = [product.imageUrl, ...product.imagesUrl].filter(url => url?.length > 0);
  const hasImagesToDisplay = displayImagesUrl.length > 0;

  return (
    <>
      <section className="py-8 py-lg-13">
        <div className="container">
          <div className="mb-6 mb-lg-12">
            <Breadcrumb />
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="gx-0 gx-sm-6 col-lg-7">
              <div className="mb-3 mb-lg-0">
                <Swiper
                  className="product-swiper-container"
                  modules={[Navigation, Thumbs, Pagination]}
                  thumbs={{ swiper: thumbSwiper }}
                  loop={true}
                  spaceBetween={16}
                  pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                  }}
                >
                  {hasImagesToDisplay &&
                    displayImagesUrl.map((url, idx) => (
                      <SwiperSlide>
                        <img src={`${url}`} alt={`${product.title}_${idx + 1}`} />
                      </SwiperSlide>
                    ))}
                  <div className="swiper-pagination d-flex d-lg-none justify-content-center"></div>
                </Swiper>

                <Swiper
                  className="thumb-swiper d-none d-lg-flex pt-6"
                  modules={Pagination}
                  onSwiper={setThumbSwiper}
                  spaceBetween={16}
                  slidesPerView={4}
                  pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                  }}
                >
                  {hasImagesToDisplay &&
                    displayImagesUrl.map((url, idx) => (
                      <SwiperSlide>
                        <img src={`${url}`} alt={`${product.title}_${idx + 1}`} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-8 gap-md-5 gap-xl-4 gap-xxl-10">
                {/* <!-- info --> */}

                <div className="d-flex flex-column gap-1 gap-xl-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-xs fs-lg-sm text-primary bg-primary-100 px-2 px-lg-3 py-1">質感精選</span>
                    <button type="button" className="btn bg-transparent border-0 p-0">
                      <span className="material-symbols-rounded text-neutral-700 p-2 p-lg-3 bg-white bg-opacity-40 rounded-circle">
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="fs-5 fs-lg-4 text-neutral-700">荒原綠影</h2>
                  </div>

                  <p className="noto-serif-tc fw-bold fs-5 fs-lg-4 lh-sm text-primary-700">NT$2,400</p>
                </div>

                {/* <!-- payment --> */}

                <div className="fs-sm fs-lg-8 text-neutral-400">
                  <div className="d-flex gap-lg-6">
                    <span>付款方式</span>
                    <ul className="d-flex flex-column">
                      <li>全館滿 5,000 免運</li>
                      <li>仙人掌系列買五送一</li>
                    </ul>
                  </div>
                </div>

                <div className="d-lg-flex flex-lg-column flex-lg-wrap flex-xl-row justify-content-lg-between align-items-center gap-lg-4 gap-xl-3">
                  <div className="d-flex justify-content-lg-between align-items-center flex-lg-grow-1 gap-3 gap-lg-6 mb-4 mb-lg-0">
                    <div className="w-50 w-lg-auto d-flex justify-content-between align-items-center gap-1 gap-lg-2">
                      <button
                        type="button"
                        className="btn d-flex justify-content-center align-items-center p-4 rounded-circle border border-2 flex-shrink-0 flex-grow-0 btn-circle-lg"
                      >
                        <span className="material-symbols-rounded align-bottom"> remove </span>
                      </button>
                      <span className="noto-serif-tc fw-bold fs-6 lh-sm text-center product-counter">1</span>
                      <button
                        type="button"
                        className="btn d-flex justify-content-center align-items-center p-4 rounded-circle border border-2 flex-lg-shrink-0 btn-circle-lg"
                      >
                        <span className="material-symbols-rounded align-bottom"> add_2 </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="w-50 w-lg-auto btn fs-lg-7 border border-2 border-neutral-200 rounded-pill d-flex justify-content-center align-items-center px-6 px-lg-7 py-3 py-lg-4 flex-lg-shrink-0"
                    >
                      <span className="material-symbols-rounded me-2"> shopping_cart </span>
                      加入購物車
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn border-0 fs-lg-7 text-white bg-primary rounded-pill px-6 px-lg-7 py-3 py-lg-4 w-100 w-xl-auto flex-grow-1"
                  >
                    立即購買
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- upper-part-end --> */}

      {/* <!-- bottom-part-start --> */}

      {/* <!-- 產品細節 Tab 區塊 --> */}
      <section className="py-8 py-lg-13">
        {/* <!-- Tab 按鈕 --> */}
        <Tab.Container defaultActiveKey="introduction">
          <div className="custom-container-lg">
            <Nav as="ul" className="nav d-flex flex-nowrap gap-3 gap-lg-6 text-center border-bottom mb-6 mb-lg-12">
              <Nav.Item as="li" className="w-100">
                <Nav.Link
                  as="button"
                  eventKey="introduction"
                  className="btn px-0 py-4 w-100 rounded-0 border-0 fs-7 text-neutral-400 custom-tab-btn"
                >
                  介紹
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="w-100">
                <Nav.Link
                  as="button"
                  eventKey="care"
                  className="btn px-0 py-4 w-100 rounded-0 border-0 fs-7 text-neutral-400 custom-tab-btn"
                >
                  照顧方式
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="w-100">
                <Nav.Link
                  as="button"
                  eventKey="notice"
                  className="btn px-0 py-4 w-100 rounded-0 border-0 fs-7 text-neutral-400 custom-tab-btn"
                >
                  注意事項
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="introduction">
              <div className="container mb-lg-10">
                <div className="row align-items-center">
                  <div className="card border-0 col-lg-6">
                    <div className="card-body px-0 py-3 p-lg-6">
                      <h3 className="card-title h4 text-neutral-700">荒原綠影</h3>
                      <p className="card-text text-neutral-400">
                        以三款仙人掌組成的荒漠組盆。我們精心挑選各式仙人掌，它們身形各異，有的高聳挺拔，有的嬌小圓潤，有的則滿佈刺毛，每一株都是荒野中的獨立角色。
                      </p>
                    </div>
                  </div>
                  <img className="d-lg-block d-none col-lg-6" src={productImg133} alt="product_13-3" />
                </div>
              </div>
              <img className="d-block d-lg-none mb-6 w-100" src={productImg133} alt="product_13-3" />
              {/* <!-- 組盆內容 --> */}
              <div className="container">
                <p className="text-primary ps-lg-6 section-decoration-line-right overflow-hidden">組盆內容</p>
                <div className="row align-items-center py-6 py-lg-40">
                  <div className="card border-0 col-xl-4 mb-3 mb-lg-0">
                    <div className="card-body px-0 py-3 p-lg-6">
                      <h3 className="card-title h4 text-neutral-700">白烏帽子</h3>
                      <h6 className="card-subtitle mt-0 mb-2 text-primary noto-sans-tc fs-sm lh-base fw-medium">
                        Opuntia microdasys var. albispina
                      </h6>
                      <p className="card-text text-neutral-400">
                        掌狀莖覆滿白色細緻絨毛狀刺座，外觀柔和卻兼具仙人掌的堅韌特性，是造型獨特且充滿可愛感的品種。
                      </p>
                    </div>
                  </div>
                  <div className="card border-0 col-xl-4 mb-3 mb-lg-0">
                    <div className="card-body px-0 py-3 p-lg-6">
                      <h3 className="card-title h4 text-neutral-700">緋牡丹錦</h3>
                      <h6 className="card-subtitle mt-0 mb-2 text-primary noto-sans-tc fs-sm lh-base fw-medium">
                        Gymnocalycium mihanovichii var. ufriedrichii
                      </h6>
                      <p className="card-text text-neutral-400">
                        以鮮紅、橙黃、粉紫等錦斑色澤聞名，宛如一朵小小的彩色牡丹，鮮豔奪目，是觀賞價值極高的仙人掌種類。
                      </p>
                    </div>
                  </div>
                  <div className="card border-0 col-xl-4">
                    <div className="card-body px-0 py-3 p-lg-6">
                      <h3 className="card-title h4 text-neutral-700">熊童子</h3>
                      <h6 className="card-subtitle mt-0 mb-2 text-primary noto-sans-tc fs-sm lh-base fw-medium">
                        Cotyledon tomentosa
                      </h6>
                      <p className="card-text text-neutral-400">
                        圓潤厚實的葉片覆有細絨毛，葉尖呈爪狀，宛如小熊的掌心，造型療癒，深受多肉愛好者喜愛。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="custom-container-lg">
                <img className="d-block" src={productImg132} alt="product_13-2" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="care">{/* 照顧方式 */}</Tab.Pane>
            <Tab.Pane eventKey="notice">{/* 注意事項 */}</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </section>
      {/* <!-- 相關商品區塊 --> */}
      <section className="container py-12 py-lg-15">
        <p className="text-neutral-400 fs-7 mb-8 mb-lg-10 section-decoration-line-both overflow-hidden">相關商品</p>
        {/* <!-- 相關商品卡片 --> */}
        <div className="row px-6px px-lg-0">
          {products.map((item, idx) => (
            <div className="col-6 col-lg-3 gx-3 gx-lg-6 gy-6 gy-lg-0 adjust-product-card-img-size" key={idx}>
              <ProductCard
                id={item.id}
                title={item.title}
                imageUrl={item.image}
                alt={item.alt}
                tag={item.tag}
                originPrice={item.originPrice}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
