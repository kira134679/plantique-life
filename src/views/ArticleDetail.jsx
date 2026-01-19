import articleImg7 from 'assets/images/articles/img_column_07.png';
import articleImg11 from 'assets/images/articles/img_column_11.png';
import articleImg12 from 'assets/images/articles/img_column_12.png';
import articleImg13 from 'assets/images/articles/img_column_13.png';
import articleImg14 from 'assets/images/articles/img_column_14.png';
import articleImg15 from 'assets/images/articles/img_column_15.png';
import headingDecorationSm from 'assets/images/index/heading-decoration-sm.svg';
import productImg7 from 'assets/images/products/img_product_07.png';
import productImg8 from 'assets/images/products/img_product_08.png';
import productImg9 from 'assets/images/products/img_product_09.png';
import productImg13 from 'assets/images/products/img_product_13.png';

import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

export default function ArticleDetail() {
  return (
    <>
      <div className="container-fluid container-lg">
        <div className="column-detail-banner"></div>
        <section className="py-8">
          <div className="d-flex align-items-center mb-4">
            <img className="me-3" src={headingDecorationSm} alt="heading-decoration" />
            <p className="fs-5 fs-lg-2 text-primary noto-serif-tc">養護專欄</p>
            <img className="ms-3" src={headingDecorationSm} alt="heading-decoration" />
          </div>
          <h1 className="h3 fs-lg-1 text-neutral-700 mb-12 pb-lg-4">
            多肉植物澆水指南：<span className="d-block mb-1"></span>澆多少？<span className="d-block d-lg-none"></span>
            幾天一次才剛好
          </h1>
          <div className="d-flex flex-column flex-lg-row justify-content-lg-between">
            <Breadcrumb
              items={[
                { name: '植藝生活', link: './article-list.html' },
                { name: '養護專欄', link: '#' },
                { name: '在陽台種一盆療癒：多肉植物打造你的綠意角落', link: '#' },
              ]}
            />
            <p className="fs-sm fs-lg-8 text-primary mt-6 mt-lg-0">2025/01/01</p>
          </div>
        </section>
        <section className="py-8 py-lg-12">
          <img className="column-detail-column-7 w-100 object-fit-cover" src={articleImg7} alt="column_07" />
          <h2 className="fs-7 fs-lg-5 noto-serif-tc fw-bold text-primary mt-4 mt-lg-6">
            多肉植物以「可愛、好養」著稱，<span className="d-block d-lg-none"></span>
            但最常讓新手困惑的問題，往往就是——到底要多久澆一次水？ 每次要澆多少？
          </h2>
          <p className="text-neutral-500 mt-4 pb-3">
            澆太多會爛根，澆太少又會乾扁，看似簡單的一盆小植物，其實藏著不少學問。這篇文章將帶你了解多肉植物的澆水原則、判斷方法與實用小技巧，讓你的多肉不再枯黃或爆水，永遠保持肉嘟嘟的狀態！
          </p>
          <div className="bg-primary-100 mt-4 mt-lg-6 px-4 px-lg-6 py-6">
            <h2 className="h6 fs-lg-5 text-primary">養多肉的小秘訣</h2>
            <ul className="column-detail-tips ps-4 mt-4">
              <li>
                <p className="fs-lg-7">
                  <span className="fw-bold">盆器排水要好：</span> 底部一定要有洞。
                </p>
              </li>
              <li>
                <p className="fs-lg-7">
                  <span className="fw-bold">土壤要透氣：</span>建議使用多肉專用介質。
                </p>
              </li>
              <li>
                <p className="fs-lg-7">
                  <span className="fw-bold">澆水原則：</span> 「乾透再澆透」，不要天天澆。
                </p>
              </li>
              <li>
                <p className="fs-lg-7">
                  <span className="fw-bold">給光線：</span>陽光足，多肉顏色才會更繽紛。
                </p>
              </li>
              <li>
                <p className="fs-lg-7">
                  <span className="fw-bold">避免積水與潮濕：</span>是新手最常犯的錯誤！
                </p>
              </li>
            </ul>
          </div>
          <div className="row gy-3 gy-lg-0 mt-6 mt-lg-12">
            <div className="col-lg-6">
              <img
                className="w-100 column-detail-img-h200 column-detail-img-lg-h600 object-fit-cover"
                src={articleImg11}
                alt="column_11"
              />
            </div>
            <div className="col-lg-6">
              <img
                className="w-100 column-detail-img-h200 column-detail-img-lg-h600 object-fit-cover"
                src={articleImg12}
                alt="column_12"
              />
            </div>
          </div>
          <h2 className="fs-7 fs-lg-5 noto-serif-tc fw-bold text-primary mt-6">先了解多肉的「體質」</h2>
          <p className="text-neutral-500 mt-4">
            多肉植物原產於乾旱地區，葉片或莖部能儲存大量水分，因此比一般植物更耐旱但怕積水。
            <span className="d-block mb-1"></span>
            換句話說，它寧可「乾一點」，也不要「濕太久」。多肉的根系喜歡空氣流通、怕悶熱潮濕，一旦長期泡在濕土裡，根部就容易腐爛。
          </p>
          <img
            className="w-100 column-detail-img-h200 column-detail-img-lg-h730 object-fit-cover mt-6 mt-lg-12"
            src={articleImg13}
            alt="column_13"
          />
          <h2 className="fs-7 fs-lg-5 noto-serif-tc fw-bold text-primary mt-6">每次要澆多少才剛好？</h2>
          <p className="text-neutral-500 mt-4">
            澆水原則只有一句：「乾透再澆透」。<span className="d-block mb-1"></span>
            也就是說，等土壤完全乾了之後，一次澆到水從盆底流出為止，讓整個介質都吸飽水分。
            <span className="d-block mb-1"></span>
            若你每次只「噴一點水」在表面，根部反而會長不深，容易造成虛根、徒長或整株變弱。
            <span className="d-block mb-1"></span>
            澆完水後記得放在通風、明亮的地方，讓多餘水分能迅速蒸發。
          </p>
          <div className="row gy-3 gy-lg-0 mt-6 mt-lg-12">
            <div className="col-lg-6">
              <img
                className="w-100 column-detail-img-h200 column-detail-img-lg-h600 object-fit-cover"
                src={articleImg14}
                alt="column_14"
              />
            </div>
            <div className="col-lg-6">
              <img
                className="w-100 column-detail-img-h200 column-detail-img-lg-h600 object-fit-cover"
                src={articleImg15}
                alt="column_15"
              />
            </div>
          </div>
          <h2 className="fs-7 fs-lg-5 noto-serif-tc fw-bold text-primary mt-6">不同環境的澆水建議</h2>
          <p className="text-neutral-600 mt-4">放室內</p>
          <p className="text-neutral-500 mt-2">
            光照不足、通風差時，水分蒸發慢，應減少澆水頻率。可改為約每兩週一次，並保持窗邊明亮環境。
            <br />
            若空氣太潮濕（如梅雨季），可暫時停澆。
          </p>
          <p className="text-neutral-600 mt-4">放戶外</p>
          <p className="text-neutral-500 mt-2">
            通風好、光線強時，多肉水分蒸散快，可略為增加頻率。
            <br />
            但仍要確保花盆有排水孔，並避免午後烈日直曬後立刻澆水，容易造成「熱震」。
          </p>
          <Button
            type="button"
            variant="filled-primary"
            shape="pill"
            size="lg"
            rightIcon={true}
            iconName="share"
            className="mt-6 mt-lg-12 mx-auto"
          >
            分享連結
          </Button>
        </section>
      </div>
      <section className="column-detail-recommend bg-neutral-100">
        <div className="container-fluid container-lg py-12 py-lg-15">
          <div className="d-flex gap-6 align-items-center text-primary mb-12">
            <div className="d-lg-none flex-grow-1 border-bottom border-primary"></div>
            <p className="column-detail-recommend-title">為您推薦</p>
            <div className="flex-grow-1 border-bottom border-primary"></div>
          </div>
          <div className="row gx-3 gx-lg-6 gy-6 gy-lg-0">
            <div className="col-6 col-lg-3">
              <ProductCard title="雪夜之森" image={productImg7} alt="product_07" tag="質感精選" price="NT$ 2,400" />
            </div>
            <div className="col-6 col-lg-3">
              <ProductCard title="植語時光" image={productImg8} alt="product_08" tag="質感精選" price="NT$ 3,000" />
            </div>
            <div className="col-6 col-lg-3">
              <ProductCard title="荒原綠影" image={productImg13} alt="product_13" tag="質感精選" price="NT$ 2,400" />
            </div>
            <div className="col-6 col-lg-3">
              <ProductCard title="森語花信" image={productImg9} alt="product_09" tag="質感精選" price="NT$ 3,500" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
