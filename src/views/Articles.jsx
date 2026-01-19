import headingDecoration from '../assets/images/index/heading-decoration.svg';
import headingDecorationSm from '../assets/images/index/heading-decoration-sm.svg';
import column01 from '../assets/images/articles/img_column_01.png';
import column02 from '../assets/images/articles/img_column_02.png';
import column03 from '../assets/images/articles/img_column_03.png';
import column05 from '../assets/images/articles/img_column_05.png';
import column06 from '../assets/images/articles/img_column_06.png';
import column07 from '../assets/images/articles/img_column_07.png';
import column08 from '../assets/images/articles/img_column_08.png';
import column09 from '../assets/images/articles/img_column_09.png';
import column10 from '../assets/images/articles/img_column_10.png';
import animSm from '../assets/images/articles/btn_anim_sm.svg';
import animLg from '../assets/images/articles/btn_anim_lg.svg';

import Button from '../components/Button';
import { useRef } from 'react';
import { Link } from 'react-router';

function Articles() {
  const curingRef = useRef(null);
  const succulentRef = useRef(null);
  const lifeRef = useRef(null);

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
        <div className="d-flex gap-2 gap-lg-4 mt-12 mb-8 align-self-lg-end mt-lg-15 mb-lg-12" id="column-filter">
          <button
            type="button"
            className="column-tag fs-sm fs-md-md text-nowrap btn border border-primary rounded-2 text-primary py-2 px-3"
            onClick={() => curingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            #養護指南
          </button>
          <button
            href="#succulent"
            type="button"
            className="column-tag fs-sm fs-md-md text-nowrap btn border border-primary rounded-2 text-primary py-2 px-3"
            onClick={() => succulentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            #多肉圖鑑
          </button>
          <button
            href="#life"
            type="button"
            className="column-tag fs-sm fs-md-md text-nowrap btn border border-primary rounded-2 text-primary py-2 px-3"
            onClick={() => lifeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
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
            <div ref={curingRef} className="mb-8 mb-md-12 column-anchor">
              {/*title*/}
              <div className="d-flex justify-content-between align-items-center mb-6">
                <h2 className="fs-md-2 text-neutral-700">
                  <span className="fs-7 text-primary align-top me-1">#</span>養護指南
                </h2>
                <button type="button" className="btn p-0 bg-transparent">
                  <picture>
                    <source srcSet={animLg} media="(min-width: 768px)" />
                    <img src={animSm} alt="更多文章" className="img-fluid" />
                  </picture>
                </button>
              </div>
              {/*card*/}
              <div className="row gy-6">
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column01} className="articaleCard-img-top object-fit-cover" alt="column_01" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0">新手必看：五種不易失敗的多肉推薦</h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 養護指南
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        第一次養多肉就上手！
                        <br />
                        精選五款易照顧、好生長的多肉，輕鬆成為植栽達人。
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/08/03</p>
                        <a href="#" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column07} className="articaleCard-img-top object-fit-cover" alt="column_07" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0 text-truncate">
                        多肉植物澆水指南：澆多少？幾天一次才剛好？
                      </h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 養護指南
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        多肉植物看似好養，其實澆水最關鍵。澆太多會爛根，太少又會乾扁。記得遵守「乾透再澆透」原則，讓土壤完全乾再澆水至盆底流出為止。
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/08/03</p>
                        <Link to="/article-detail" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column06} className="articaleCard-img-top object-fit-cover" alt="column_06" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0 text-truncate">
                        在陽台種一盆療癒：多肉植物打造你的綠意角落
                      </h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 養護指南
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        多肉植物們擁有多樣的顏色、形狀與質地，也乘載著一種「氛圍感」。你會發現，當一盆多肉出現在書桌上,，氛圍感立刻不一樣
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/01/01</p>
                        <a href="./column-detail.html" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*succulent section start*/}
            <div ref={succulentRef} className="mb-8 mb-md-12 column-anchor">
              {/*title*/}
              <div className="d-flex justify-content-between align-items-center mb-6">
                <h2 className="fs-md-2 text-neutral-700">
                  <span className="fs-7 text-primary align-top me-1">#</span>多肉圖鑑
                </h2>
                <button type="button" className="btn p-0 bg-transparent">
                  <picture>
                    <source srcSet={animLg} media="(min-width: 768px)" />
                    <img src={animSm} alt="更多文章" className="img-fluid" />
                  </picture>
                </button>
              </div>
              {/*card*/}
              <div className="row gy-6">
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column08} className="articaleCard-img-top object-fit-cover" alt="column_08" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0">
                        用多肉妝點生活角落：6 種療癒系空間提案
                      </h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 多肉圖鑑
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        讓空間煥然一新。無論是放在玻璃瓶中營造清新感，或搭配木質擺件呈現自然氣息，多肉都能巧妙融入各種風格。讓植物成為日常的一部分，也讓心靈在一片綠意中得到休息。
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/08/03</p>
                        <a href="#" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column02} className="articaleCard-img-top object-fit-cover" alt="column_02" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0 text-truncate">
                        圓滾滾的療癒系：綠之鈴
                      </h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 多肉圖鑑
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        它喜歡明亮散光與乾爽環境，是懶人也能輕鬆照顧的多肉代表。懸掛於窗邊或書桌架上，隨微風輕輕搖曳的姿態，為空間增添柔和與生命力。每一顆小球，都是自然送來的療癒能量。
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/08/03</p>
                        <a href="#" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column05} className="articaleCard-img-top object-fit-cover" alt="column_05" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0 text-truncate">
                        從陽台到書桌，多肉如何成為你的生活陪伴？
                      </h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 多肉圖鑑
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        無論是晨光中的陽台，還是夜燈下的書桌，多肉植物都能成為最安靜的陪伴者。它們不需要語言，只以緩慢的成長提醒我們放慢腳步。
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/01/01</p>
                        <a href="#" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*succulent section end*/}
            {/*life section start*/}
            <div ref={lifeRef} className="column-anchor">
              {/*title*/}
              <div className="d-flex justify-content-between align-items-center mb-6">
                <h2 className="fs-md-2 text-neutral-700">
                  <span className="fs-7 text-primary align-top me-1">#</span>生活提案
                </h2>
                <button type="button" className="btn p-0 bg-transparent">
                  <picture>
                    <source srcSet={animLg} media="(min-width: 768px)" />
                    <img src={animSm} alt="更多文章" className="img-fluid" />
                  </picture>
                </button>
              </div>
              {/*card*/}
              <div className="row gy-6">
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column09} className="articaleCard-img-top object-fit-cover" alt="column_09" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0">銀白葉緣下的冷冽優雅：白銀之月</h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 生活提案
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        它的存在，讓任何空間瞬間多了幾分靜謐與格調。置於極簡風書房或水泥系花盆中，特別襯托現代感。陽光輕照時，那細緻的銀粉微微閃爍，彷彿一輪靜謐的月色，在你身邊悄然綻放。
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/08/03</p>
                        <a href="#" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column10} className="articaleCard-img-top object-fit-cover" alt="column_10" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0 text-truncate">
                        如冰似玉的晶透珍品：冰璃玉
                      </h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 生活提案
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        它喜歡陽光，也享受乾燥環境，是收藏級的療癒小寶石。放在玻璃花盆中觀賞，透光之間，映出自然最乾淨的美學。
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/08/03</p>
                        <a href="#" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 column-item">
                  <div className="card flex-lg-row d-lg-flex flex-lg-column border-0 rounded-0">
                    <img src={column03} className="articaleCard-img-top object-fit-cover" alt="column_03" />
                    <div className="card-body d-flex flex-column p-0 pt-3 pt-lg-0 mt-lg-3 gap-2 gap-lg-3">
                      <h4 className="card-title fs-7 fs-lg-6 text-neutral-700 m-0 text-truncate">
                        為你的空間選一種氣質：多肉的氛圍搭配提案
                      </h4>
                      <span className="align-self-start fs-xs fs-lg-sm text-secondary px-2 px-lg-3 py-1 bg-secondary-100">
                        # 生活提案
                      </span>
                      <p className="card-text fs-sm fs-lg-8 text-neutral-400 multiline-ellipsis">
                        不同多肉，有著不同的性格與氛圍。想打造柔和溫暖感，可選熊童子或星美人；若偏好冷調簡約，可搭配白銀之月或子持蓮華。小型多肉適合桌面布置，群植組合則能讓整體更有層次。
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-xs fs-lg-sm text-primary-500">2025/01/01</p>
                        <a href="#" className="d-flex justify-content-end">
                          <Button variant="link-primary" shape="link" size="sm" rightIcon iconName="arrow_right_alt">
                            閱讀全文
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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
