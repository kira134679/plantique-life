import headingDecoration from '../assets/images/index/heading-decoration.svg';
import headingDecorationSm from '../assets/images/index/heading-decoration-sm.svg';

import Button from '../components/Button';
import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router';
import { timestampToDate } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '@/slice/article/guestArticleSlice';

const ArticleCard = ({ article }) => (
  <div className="col-lg-4 column-item">
    <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
      <img src={article.image} className="articaleCard-img-top object-fit-cover" alt={article.title} />
      <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
        <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0">{article.title}</h4>
        <div className="d-flex flex-wrap gap-1">
          {article.tag.map((tag, idx) => (
            <span
              key={idx}
              className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100"
            >
              # {tag}
            </span>
          ))}
        </div>

        <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">{article.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="fs-xs fs-lg-sm text-primary-500">{timestampToDate(article.create_at)}</p>
          <Button
            as={Link}
            to={`/articles/${article.id}`}
            className="d-flex justify-content-end"
            variant="link-primary"
            shape="link"
            size="sm"
            rightIcon
            iconName="arrow_right_alt"
          >
            閱讀全文
          </Button>
        </div>
      </div>
    </div>
  </div>
);

function Articles() {
  const dispatch = useDispatch();
  const { articleList } = useSelector(state => state.guestArticle);

  const curingRef = useRef(null);
  const succulentRef = useRef(null);
  const lifeRef = useRef(null);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const displayArticles = useMemo(() => {
    const list = articleList || [];
    return {
      curing: list.filter(item => item.tag?.includes('養護指南') && item.isPublic),
      succulent: list.filter(item => item.tag?.includes('多肉圖鑑') && item.isPublic),
      life: list.filter(item => item.tag?.includes('生活提案') && item.isPublic),
    };
  }, [articleList]);

  const scrollToSection = ref => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/*life section start*/}
      <section className="life-section">
        <div className="container">
          <div className="d-flex flex-column flex-lg-row py-lg-15">
            <div className="life-text-wrapper col-lg-6 py-10 py-lg-0 pe-lg-15 my-lg-auto">
              <h6 className="card-text fs-5 fs-lg-4 text-primary mb-2">Plantique Life</h6>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column text-primary-900">
                  <h3 className="fs-2 fs-lg-1 mb-1">探索植感生活</h3>
                  <h3 className="fs-2 fs-lg-1">提案</h3>
                </div>
                <picture className="align-self-end me-6">
                  <source srcSet={headingDecoration} media="(min-width: 768px)" />
                  <img src={headingDecorationSm} className="img-fluid" alt="heading-decoration" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*life section end*/}

      {/*tags section start*/}
      <div className="container">
        <div
          className="d-flex gap-2 gap-lg-4 mt-12 mb-8 align-self-lg-end mt-lg-15 mb-lg-12 flex-wrap"
          id="column-filter"
        >
          <button
            type="button"
            className="column-tag fs-sm fs-md-md text-nowrap btn border border-primary rounded-2 text-primary py-2 px-3"
            onClick={() => scrollToSection(curingRef)}
          >
            #養護指南
          </button>
          <button
            href="#succulent"
            type="button"
            className="column-tag fs-sm fs-md-md text-nowrap btn border border-primary rounded-2 text-primary py-2 px-3"
            onClick={() => scrollToSection(succulentRef)}
          >
            #多肉圖鑑
          </button>
          <button
            href="#life"
            type="button"
            className="column-tag fs-sm fs-md-md text-nowrap btn border border-primary rounded-2 text-primary py-2 px-3"
            onClick={() => scrollToSection(lifeRef)}
          >
            #生活提案
          </button>
        </div>
      </div>
      {/*tags section end*/}

      {/*maintenance section start*/}
      <section className="column-section">
        <div className="container">
          <div className="mb-12 mb-md-15">
            {/* curing section start */}
            <div ref={curingRef} className="mb-8 mb-md-12 column-anchor">
              {/*title*/}
              <div className="mb-6">
                <h2 className="fs-md-2 text-neutral-700">
                  <span className="fs-7 text-primary align-top me-1">#</span>養護指南
                </h2>
              </div>
              {/*card*/}
              <div className="row gy-6">
                {displayArticles.curing.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
            {/* curing section end */}

            {/*succulent section start*/}
            <div ref={succulentRef} className="mb-8 mb-md-12 column-anchor">
              {/*title*/}
              <div className="mb-6">
                <h2 className="fs-md-2 text-neutral-700">
                  <span className="fs-7 text-primary align-top me-1">#</span>多肉圖鑑
                </h2>
              </div>
              {/*card*/}
              <div className="row gy-6">
                {displayArticles.succulent.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            {/*succulent section end*/}

            {/*life section start*/}
            <div ref={lifeRef} className="column-anchor">
              {/*title*/}
              <div className="mb-6">
                <h2 className="fs-md-2 text-neutral-700">
                  <span className="fs-7 text-primary align-top me-1">#</span>生活提案
                </h2>
              </div>
              {/*card*/}
              <div className="row gy-6">
                {displayArticles.life.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
            {/*life section end*/}
          </div>
        </div>
      </section>
      {/*maintenance section end*/}
    </>
  );
}

export default Articles;
