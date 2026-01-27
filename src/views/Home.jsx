import headingDecorationSm from 'assets/images/index/heading-decoration-sm.svg';
import headingDecoration from 'assets/images/index/heading-decoration.svg';
import textLg from 'assets/images/index/img_banner_text02_lg.svg';
import categoryImg1 from 'assets/images/index/img_category_01.png';
import categoryImg2 from 'assets/images/index/img_category_02.png';
import categoryImg3 from 'assets/images/index/img_category_03.png';
import categoryImg4 from 'assets/images/index/img_category_04.png';
import titleLg from 'assets/images/index/img_title_lg.svg';
import newsImg1 from 'assets/images/news/img_news_01.png';
import newsImg2 from 'assets/images/news/img_news_02.png';
import newsImg3 from 'assets/images/news/img_news_03.png';
import productImg1 from 'assets/images/products/img_product_01.png';
import productImg2 from 'assets/images/products/img_product_02.png';
import productImg3 from 'assets/images/products/img_product_03.png';
import productImg4 from 'assets/images/products/img_product_04.png';
import productImg5 from 'assets/images/products/img_product_05.png';
import productImg6 from 'assets/images/products/img_product_06.png';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { getArticles } from '../slice/article/guestArticleSlice';
import { timestampToDate } from '../utils/utils';

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

const category = [
  {
    title: '植 栽 單 品',
    subTitle: '獨株盆栽，生活的慢光景',
    description: '每一株植物都擁有獨特姿態，不需繁複裝飾，就能為你的空間帶來療癒氣息，讓生活充滿生機。',
    image: categoryImg1,
  },
  {
    title: '療 癒 組 盆',
    subTitle: '綠色風景，妝點專屬角落',
    description: '精心搭配的多肉組合，如同微型生態，讓你一次擁有豐富的綠意層次，創造屬於自己的心靈小天地。',
    image: categoryImg2,
  },
  {
    title: '客 製 禮 盒',
    subTitle: '綠意心意，植感而生',
    description: '將這份溫柔的植感心意化作禮物，為重要的人客製專屬組合，傳達獨特而真摯的祝福。',
    image: categoryImg3,
  },
  {
    title: '配 件 商 品',
    subTitle: '質感選物，植栽的日常絮語',
    description: '嚴選美觀又實用的質感配件，從花器到工具，讓你在照護植物的過程中，也能享受質感生活。',
    image: categoryImg4,
  },
];

const products = [
  {
    alt: '多肉植物組合盆栽',
    image: productImg1,
    tag: '質感精選',
    title: '泡泡森林',
    originPrice: '6666',
    price: 'NT$ 6,200',
  },
  {
    alt: '多肉植物組合盆栽',
    image: productImg2,
    tag: '質感精選',
    title: '向陽而生',
    originPrice: '',
    price: 'NT$ 7,280',
  },
  {
    alt: '多肉植物組合盆栽',
    image: productImg3,
    tag: '質感精選',
    title: '暮光角落',
    originPrice: '',
    price: 'NT$ 7,500',
  },
  {
    alt: '多肉植物組合盆栽',
    image: productImg4,
    tag: '質感精選',
    title: '雲深處靜',
    originPrice: '',
    price: 'NT$ 6,600',
  },
  {
    alt: '多肉植物組合盆栽',
    image: productImg5,
    tag: '質感精選',
    title: '玉露女王',
    price: 'NT$ 5,200',
  },
  {
    alt: '多肉植物組合盆栽',
    image: productImg6,
    tag: '質感精選',
    title: '玉扇食生',
    price: 'NT$ 4,600',
  },
];

const columnTabs = [
  { name: '全部', displayName: '全部' },
  { name: '養護指南', displayName: '#養護指南' },
  { name: '多肉圖鑑', displayName: '#多肉圖鑑' },
  { name: '生活提案', displayName: '#生活提案' },
];

const MAX_ARTICLES_DISPLAY_COUNT = 4;

export default function Home() {
  const [activeColumnTab, setActiveColumnTab] = useState('全部');
  const dispatch = useDispatch();
  const { articleList, isLoading: isArticlesLoading } = useSelector(state => state.guestArticle);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const displayArticles = useMemo(() => {
    return (articleList || [])
      .filter(article => (activeColumnTab === '全部' ? true : article.tag.includes(activeColumnTab)))
      .slice(0, MAX_ARTICLES_DISPLAY_COUNT);
  }, [activeColumnTab, articleList]);

  return (
    <>
      {/* <!-- hero section start --> */}

      <section className="hero hero-py">
        <div className="container">
          <div className="row">
            <div className="col-md-2 d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-column justify-content-center" id="slogan">
                <img src={titleLg} alt="標語:植一抹綠，讓心寧靜。從多肉開始的療癒時刻" className="mb-10" />
                <Button
                  as={Link}
                  to="/products"
                  type="button"
                  variant="filled-primary"
                  shape="pill"
                  size="lg"
                  rightIcon={true}
                  iconName="arrow_right_alt"
                  className="text-nowrap"
                >
                  立即選購
                </Button>
              </div>
            </div>
            <div className="d-none d-sm-block col-md-10">
              <img src={textLg} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- hero section end --> */}

      {/* <!-- news section start --> */}

      <section className="py-12 py-md-15">
        <div className="container">
          <div className="row">
            {/* <!-- 標題 --> */}
            <div className="col-lg-2">
              <div className="d-flex flex-lg-column justify-content-center align-items-center gap-6 gap-lg-0">
                <img src={headingDecorationSm} alt="decorate-sm" className="d-lg-none d-block" />
                <div className="text-center d-flex flex-column justify-content-center align-items-center">
                  <h6 className="fs-8 fs-lg-7 text-primary mb-1 mb-lg-4">News</h6>
                  <h2 className="fs-3 fs-lg-2 m-0 text-neutral-700 news-title mb-8 mb-lg-4">
                    <span>最</span>
                    <span>新</span>
                    <span>消</span>
                    <span>息</span>
                  </h2>
                </div>
                <img src={headingDecoration} alt="decoration-lg" className="d-xl-block d-none" />
                <img src={headingDecorationSm} alt="decoration-sm" className="d-xl-none d-block" />
              </div>
            </div>

            {/* <!-- 資訊 --> */}
            <div className="col-lg-10">
              <Swiper
                modules={[Pagination, Autoplay]}
                direction="horizontal"
                loop
                autoHeight
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ el: '.swiper-pagination-news', clickable: true }}
                // 暫停動畫
                onTouchStart={swiper => {
                  swiper.el.classList.add('is-paused');
                }}
                // 恢復動畫
                onTouchEnd={swiper => {
                  swiper.el.classList.remove('is-paused');

                  // 重置 pagination 動畫
                  swiper.pagination.bullets.forEach(bullet => {
                    bullet.classList.remove('restart');
                    void bullet.offsetWidth;
                    bullet.classList.add('restart');
                  });
                }}
              >
                {events.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="d-flex flex-column">
                      <div className="d-lg-flex">
                        <div className="news-image">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-6 py-lg-5 gap-4 gap-lg-6 w-100">
                          <div>
                            <p className="fs-md fs-lg-7 text-primary-500 mb-1">2025.08.01 ~ 2025.09.20</p>
                            <h3 className="fs-4 fs-lg-3 text-neutral-700">
                              {item.title.split('\n').map((line, idx, arr) => (
                                <Fragment key={idx}>
                                  {line}
                                  {idx < arr.length - 1 && <br />}
                                </Fragment>
                              ))}
                            </h3>
                          </div>
                          <p className="fs-sm fs-lg-8 text-neutral-400">
                            {item.description.split('\n').map((line, idx, arr) => (
                              <Fragment key={idx}>
                                {line}
                                {idx < arr.length - 1 && <br />}
                              </Fragment>
                            ))}
                          </p>
                          <div className="d-flex justify-content-end">
                            <Button
                              as={Link}
                              to="/articles"
                              variant="link-primary"
                              href={item.link}
                              shape="link"
                              size="sm"
                              rightIcon={true}
                              iconName="arrow_right_alt"
                            >
                              活動詳情
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="d-flex justify-content-center justify-content-lg-start position-static mt-8 mt-lg-10 swiper-pagination-news"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- news section end --> */}

      {/* <!-- category section start --> */}

      <section className="py-12 py-lg-15">
        <div className="container mb-8 mb-lg-12">
          <hgroup className="d-flex justify-content-center align-items-end align-items-lg-center gap-6 gap-lg-10">
            <img src={headingDecoration} alt="heading-decoration" className="heading-decoration" />
            <div className="text-center">
              <small className="d-block fw-bold lh-sm fs-8 fs-lg-7 align-middle text-primary noto-serif-tc mb-1">
                Category
              </small>
              <h2 className="fs-3 fs-lg-2 text-neutral-700">主題挑選</h2>
            </div>
            <img src={headingDecoration} alt="decorate" className="heading-decoration" />
          </hgroup>
        </div>
        <div className="px-0 px-lg-15">
          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-lg-4 gap-6 gap-lg-0">
              {category.map((item, idx) => {
                return (
                  <div className="col" key={idx}>
                    <div className="pt-lg-10">
                      <div className="d-flex flex-column gap-4 gap-lg-6 position-relative category-card">
                        <div className="category-row">
                          <div className="category-col-9 col-lg">
                            <div className="overflow-hidden">
                              <img src={item.image} alt={item.title} className="category-card-img object-fit-cover" />
                            </div>
                          </div>
                          <div className="category-col-3 d-flex d-lg-none justify-content-center">
                            <Link to="/products" className="stretched-link">
                              <h3 className="vertical-lr fs-3 text-primary mx-0">{item.title}</h3>
                            </Link>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 d-none d-lg-flex justify-content-center">
                            <Link to="/products" className="stretched-link">
                              <h3 className="vertical-lr fs-3 fs-lg-2 text-primary mx-0">{item.title}</h3>
                            </Link>
                          </div>
                          <div className="col-lg-9 mt-lg-auto">
                            <h4 className="fs-7 fs-lg-6 text-neutral-700 mb-2 mb-lg-4">{item.subTitle}</h4>
                            <p className="fw-medium fs-sm fs-lg-8 text-neutral-400">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* <!-- category section end --> */}

      {/* <!-- recommend section start --> */}

      <section className="py-12 py-lg-15">
        {/* <!-- 標題 --> */}
        <div className="container mb-12">
          <div className="d-flex justify-content-center justify-content-md-between align-items-center align-items-md-end">
            <hgroup className="d-flex justify-content-start align-items-end align-items-lg-center gap-6 gap-lg-10">
              <img src={headingDecoration} alt="" className="d-sm-block d-none" />
              <img src={headingDecorationSm} alt="" className="d-sm-none d-block" />
              <div className="text-center">
                <small className="d-block fw-bold lh-sm fs-8 fs-lg-7 align-middle text-primary noto-serif-tc mb-1">
                  Recommend
                </small>
                <h2 className="fs-3 fs-lg-2 text-neutral-700">植感精選</h2>
              </div>
              <img src={headingDecoration} alt="" className="d-sm-block d-none" />
              <img src={headingDecorationSm} alt="" className="d-sm-none d-block" />
            </hgroup>
            <div className="d-none d-md-block">
              <Button
                as={Link}
                to="/products"
                type="button"
                variant="outline-neutral"
                shape="pill"
                size="lg"
                rightIcon={true}
                iconName="arrow_right_alt"
              >
                查看更多
              </Button>
            </div>
          </div>
        </div>

        {/* <!-- 產品卡片 --> */}
        <div className="px-0 px-lg-15">
          <div className="container-fiuid container-lg mb-8">
            <div className="position-relative">
              <Swiper
                modules={[Navigation]}
                direction="horizontal"
                loop={false}
                autoHeight
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                watchOverflow={false}
                breakpoints={{
                  0: {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    freeMode: true,
                    navigation: false,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                    freeMode: false,
                  },
                }}
                className="productSwiper"
              >
                {products.map((item, idx) => (
                  <SwiperSlide key={idx} className="swiper-slide-prouct">
                    <ProductCard
                      title={item.title}
                      image={item.image}
                      alt={item.alt}
                      tag={item.tag}
                      originPrice={item.originPrice}
                      price={item.price}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* <!-- 導航按鈕 --> */}
              <div className="swiper-button-prev">
                <span className="material-symbols-rounded">arrow_left_alt </span>
              </div>
              <div className="swiper-button-next">
                <span className="material-symbols-rounded"> arrow_right_alt </span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-md-none d-flex justify-content-center">
          <Button
            as={Link}
            to="/products"
            type="button"
            variant="outline-neutral"
            shape="pill"
            size="lg"
            rightIcon={true}
            iconName="arrow_right_alt"
          >
            查看更多
          </Button>
        </div>
      </section>

      {/* <!-- recommend section end --> */}

      {/* <!-- column section start --> */}

      <section className="column-section py-12" aria-labelledby="column-title">
        <div className="container-fluid container-lg">
          <div className="d-flex flex-column align-items-center flex-lg-row justify-content-lg-between mb-lg-12">
            <div className="d-flex justify-content-center">
              <picture className="align-self-end me-6">
                <source srcSet={headingDecoration} media="(min-width: 768px)" />
                <img src={headingDecorationSm} className="img-fluid" alt="heading-decoration" />
              </picture>
              <div className="d-flex flex-column align-items-center">
                <h3 className="text-primary fs-8 fs-lg-7 mb-1 mb-lg-2">Column</h3>
                <h2 className="fs-3 fs-lg-2 text-neutral-700" id="column-title">
                  植感專欄
                </h2>
              </div>
              <picture className="align-self-end ms-6">
                <source srcSet={headingDecoration} media="(min-width: 768px)" />
                <img src={headingDecorationSm} className="img-fluid" alt="heading-decoration" />
              </picture>
            </div>
            <div className="d-flex gap-2 gap-lg-4 my-8 align-self-lg-end my-lg-0">
              {columnTabs.map(tab => (
                <Button
                  key={tab.name}
                  type="button"
                  variant="tag"
                  className={activeColumnTab === tab.name ? 'active' : ''}
                  onClick={() => setActiveColumnTab(tab.name)}
                >
                  {tab.displayName}
                </Button>
              ))}
            </div>
          </div>
          {isArticlesLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status" variant="primary" className="">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : displayArticles?.length > 0 ? (
            <ul className="list-unstyled row g-6">
              {displayArticles.map(
                article =>
                  article.isPublic && (
                    <li key={article.id} className="col-lg-6 column-item">
                      <div className="card flex-lg-row border-0 rounded-0">
                        <img
                          src={article.image}
                          className="card-img-top object-fit-cover rounded-0 me-3 me-lg-4"
                          alt={article.title}
                        />
                        <div className="card-body d-lg-flex flex-lg-column p-0 pt-3 pt-lg-0">
                          <h4 className="card-title fs-7 fs-lg-6 text-neutral-700">{article.title}</h4>
                          {article.tag && article.tag.length > 0 && (
                            <ul className="list-unstyled d-flex gap-1">
                              {article.tag.map((tag, idx) => (
                                <li key={idx}>
                                  <span className="align-self-lg-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                                    {tag}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis mt-2">
                            {article.description}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-2 mt-lg-auto">
                            <p className="fs-xs fs-lg-sm text-primary-500">{timestampToDate(article.create_at)}</p>
                            <Button
                              as={Link}
                              variant="link-primary"
                              to={`/articles/${article.id}`}
                              shape="link"
                              size="sm"
                              rightIcon={true}
                              iconName="arrow_right_alt"
                            >
                              閱讀全文
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ),
              )}
            </ul>
          ) : (
            <div className="d-flex justify-content-center">
              <p className="fs-6 text-neutral-700">目前沒有文章</p>
            </div>
          )}
          <div className="d-flex justify-content-center mt-8 mt-lg-12 mx-auto">
            <Button
              as={Link}
              type="button"
              variant="outline-neutral"
              shape="pill"
              size="sm"
              rightIcon={true}
              iconName="arrow_right_alt"
              className="more-btn"
              to={'/articles'}
            >
              查看更多
            </Button>
          </div>
        </div>
      </section>

      {/* <!-- column section end --> */}

      {/* <!-- about section start --> */}

      <section className="about-section">
        <div className="container-fluid container-lg h-100">
          <div className="d-flex flex-column flex-lg-row h-100">
            <div className="about-text-wrapper col-lg-6 py-10 py-lg-0 pe-lg-3 my-lg-auto">
              <h3 className="fs-2 fs-lg-1 text-primary-900">
                植感生活
                <br />
                Plantique Life
              </h3>
              <p className="fs-sm fs-lg-8 my-4 my-lg-6">
                在繁忙的節奏裡，植感始終相信綠意能為生活帶來片刻的寧靜與療癒。
                <br />
                從多肉出發，讓植物成為你的日常風景，讓療癒成為一種生活態度。
              </p>
              <Button
                type="button"
                variant="filled-primary"
                shape="pill"
                size="lg"
                rightIcon={true}
                iconName="arrow_right_alt"
              >
                關於品牌
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- about section end --> */}
    </>
  );
}
