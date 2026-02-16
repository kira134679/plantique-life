import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '@/components/Button';
import Counter from '@/components/Counter';
import {
  MAX_PURCHASE_QTY_ONE_TIME_PER_PRODUCT,
  MAX_RECOMMEND_PRODUCTS_DISPLAY_COUNT,
  MIN_PRODUCT_PURCHASE_QTY,
  paymentOptions,
} from '@/const/guestConst';
import { addAndRefetchCarts } from '@/slice/cartSlice';
import { selectAllProducts } from '@/slice/product/guestProductSlice';
import { tryParseJson } from '@/utils/utils';
import { useMemo, useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { product } = useLoaderData().productData;
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const [purchaseQty, setPurchaseQty] = useState(MIN_PRODUCT_PURCHASE_QTY);
  const defaultPayload = { product_id: product.id, qty: MIN_PRODUCT_PURCHASE_QTY };
  const allProducts = useSelector(selectAllProducts);

  const displayImagesUrl = [product.imageUrl, ...product.imagesUrl].filter(url => url?.length > 0);
  const { ...intro } = tryParseJson(product.description);
  const { ...contents } = tryParseJson(product.content);
  const relatedProducts = useMemo(() => {
    const allProductsExcludeSelf = allProducts.filter(p => p.id !== product.id);
    const otherSameCategoryProducts = allProductsExcludeSelf.filter(p => p.category === product.category);

    if (otherSameCategoryProducts.length >= MAX_RECOMMEND_PRODUCTS_DISPLAY_COUNT) {
      return otherSameCategoryProducts.slice(-MAX_RECOMMEND_PRODUCTS_DISPLAY_COUNT);
    } else {
      const remainCountToPickup = MAX_RECOMMEND_PRODUCTS_DISPLAY_COUNT - otherSameCategoryProducts.length;
      return otherSameCategoryProducts.concat(allProductsExcludeSelf.slice(-remainCountToPickup));
    }
  }, [allProducts, product]);

  const hasImagesToDisplay = displayImagesUrl.length > 0;
  const isOnSale = product.price < product.origin_price;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      await dispatch(addAndRefetchCarts({ data: { ...defaultPayload, qty: purchaseQty } })).unwrap();
      toast.success('已加入購物車');
    } catch (error) {
      toast.error(error);
    }
  };

  const buyNow = async () => {
    try {
      await dispatch(addAndRefetchCarts({ data: defaultPayload })).unwrap();
      toast.success('已加入購物車');
      navigate('/shopping-cart');
    } catch (error) {
      toast.error(error);
    }
  };

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
                      <SwiperSlide key={url}>
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
                      <SwiperSlide key={url}>
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
                    <span className="fs-xs fs-lg-sm text-primary bg-primary-100 px-2 px-lg-3 py-1">
                      {product.category}
                    </span>
                    <button type="button" className="btn bg-transparent border-0 p-0">
                      <span className="material-symbols-rounded text-neutral-700 p-2 p-lg-3 bg-white bg-opacity-40 rounded-circle">
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="fs-5 fs-lg-4 text-neutral-700">{product.title}</h2>
                  </div>

                  <div className="d-flex align-items-end">
                    <p className="noto-serif-tc fw-bold fs-5 fs-lg-4 lh-sm text-primary-700">{`NT$${product.price.toLocaleString()}`}</p>
                    {isOnSale && (
                      <s className="fs-sm fs-lg-8 text-neutral-400 ms-1 ms-lg-2">{`$${product.origin_price.toLocaleString()}`}</s>
                    )}
                  </div>
                </div>

                {/* <!-- payment --> */}

                <div className="fs-sm fs-lg-8 text-neutral-400">
                  <div className="d-flex gap-lg-6">
                    <span>付款方式</span>
                    <ul className="d-flex flex-column">
                      {paymentOptions.map(opts => (
                        <li key={opts}>{opts}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="d-lg-flex flex-lg-column flex-lg-wrap flex-xl-row justify-content-lg-between align-items-center gap-lg-4 gap-xl-3">
                  <div className="d-flex justify-content-lg-between align-items-center flex-lg-grow-1 gap-3 gap-lg-6 mb-4 mb-lg-0">
                    <Counter
                      value={purchaseQty}
                      min={MIN_PRODUCT_PURCHASE_QTY}
                      max={MAX_PURCHASE_QTY_ONE_TIME_PER_PRODUCT}
                      onCountChange={setPurchaseQty}
                    />

                    <Button
                      type="button"
                      variant="outline-neutral"
                      shape="pill"
                      size="lg"
                      leftIcon={true}
                      iconName="shopping_cart"
                      className="w-50 w-lg-auto fs-lg-7 d-flex justify-content-center align-items-center px-6 px-lg-7 py-3 py-lg-4 flex-lg-shrink-0"
                      onClick={handleAddToCart}
                    >
                      加入購物車
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="filled-primary"
                    shape="pill"
                    size="lg"
                    className="fs-lg-7 px-6 px-lg-7 py-3 py-lg-4 w-100 w-xl-auto flex-grow-1"
                    onClick={buyNow}
                  >
                    立即購買
                  </Button>
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
                      <h3 className="card-title h4 text-neutral-700">{intro.title}</h3>
                      <p className="fs-sm text-primary mb-2">{intro.enName}</p>
                      <p className="card-text text-neutral-400 text-prewrap">{intro.description}</p>
                    </div>
                  </div>
                  <img className="d-lg-block d-none col-lg-6" src={product.imageUrl} alt={`${product.title}_主圖`} />
                </div>
              </div>
              <img className="d-block d-lg-none mb-6 w-100" src={product.imageUrl} alt={`${product.title}_主圖`} />
              {/* <!-- 組盆內容 --> */}
              {contents.bundle?.length > 0 && (
                <>
                  <div className="container">
                    <p className="text-primary ps-lg-6 section-decoration-line-right overflow-hidden">組盆內容</p>
                    <div className="row align-items-center py-6 py-lg-40 gap-3 gap-lg-0">
                      {contents.bundle.map((content, idx) => (
                        <div key={idx} className="card border-0 col-xl-4">
                          <div className="card-body px-0 py-3 p-lg-6">
                            <h3 className="card-title h4 text-neutral-700">{content.title}</h3>
                            <h6 className="card-subtitle mt-0 mb-2 text-primary noto-sans-tc fs-sm lh-base fw-medium">
                              {content.enName}
                            </h6>
                            <p className="card-text text-neutral-400 text-prewrap">{content.description}:</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="custom-container-lg">
                    <img className="d-block w-100" src={contents.imageUrl} alt={`${product.title}_副圖`} />
                  </div>
                </>
              )}
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
          {relatedProducts.map(product => (
            <div className="col-6 col-lg-3 gx-3 gx-lg-6 gy-6 gy-lg-0 adjust-product-card-img-size" key={product.id}>
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
      </section>
    </>
  );
}
