import illusPlant from 'assets/images/about/illus_plant.svg';
import imgAbout02 from 'assets/images/about/img_about_02.png';
import imgAbout03 from 'assets/images/about/img_about_03.png';
import headingDecorationSm from 'assets/images/index/heading-decoration-sm.svg';
import headingDecoration from 'assets/images/index/heading-decoration.svg';
import imgTitle from 'assets/images/index/img_title_lg.svg';
import logo from 'assets/images/logo-primary-en-sm.svg';

function About() {
  return (
    <>
      <header className="about-banner">
        <div className="d-flex justify-content-center py-15">
          <picture className="align-self-end">
            <source srcSet={headingDecoration} media="(min-width: 992px)" />
            <img src={headingDecorationSm} className="img-fluid" alt="" />
          </picture>
          <h1 className="h2 fs-lg-1 d-flex flex-column gap-2 text-neutral-700 mx-6 mx-lg-10">
            <img src={logo} className="img-fluid" alt="Plantique Life logo" />
            <span>植感生活</span>
          </h1>
          <picture className="align-self-end">
            <source srcSet={headingDecoration} media="(min-width: 992px)" />
            <img src={headingDecorationSm} className="img-fluid" alt="" />
          </picture>
        </div>
      </header>
      <section className="about-intro container-md gx-12 mt-12 mt-lg-15 py-12 p-lg-15">
        <div className="row flex-column flex-lg-row">
          <div className="col-lg-6">
            <img src={illusPlant} className="img-fluid" alt="" />
            <h2 className="h3 fs-lg-2 text-primary-900 mt-2 mt-lg-3">
              在快節奏的城市中，<span className="d-block mt-2 mt-lg-3">我們渴望一個能喘息的角落</span>
            </h2>
          </div>
          <div className="col-lg-6 text-neutral-700 pb-8 pb-lg-15 mb-lg-5 mt-6 mt-lg-5">
            <picture>
              <source srcSet={headingDecoration} media="(min-width: 992px)" />
              <img src={headingDecorationSm} className="img-fluid d-block ms-auto ms-lg-0" alt="" />
            </picture>
            <p className="fs-sm fs-lg-8 mt-6 mt-lg-10">
              【植感生活】誕生於這份渴望，
              <br />
              致力於打造一個結合美感與療癒的多肉植物電商平台。
            </p>
            <p className="fs-sm fs-lg-8 mt-5 mt-lg-6">
              我們相信，每一株多肉都有它獨特的生命故事。圓潤、飽滿、色彩多變的葉片，就像生活中每一個溫柔的片刻，值得被呵護與珍藏。
            </p>
            <p className="fs-sm fs-lg-8 mt-5 mt-lg-6">
              在這裡，我們精選來自台灣在地小農與職人培育的健康多肉，搭配質感盆器與用心包裝，讓你不只是購買植物，更是帶回一份生活儀式與療癒時光。
            </p>
            <p className="fs-sm fs-lg-8 mt-5 mt-lg-6">
              透過專欄文章、照護指南、風格搭配靈感，讓植物成為你的日常風景、讓療癒成為一種生活態度。
            </p>
          </div>
        </div>
      </section>
      <div className="about-overlap-section container">
        <div className="row">
          <div className="col-lg-5 ms-lg-auto">
            <img
              src={imgAbout02}
              className="img-fluid about-max-width-260px about-max-width-lg-none w-lg-100 d-block mx-auto"
              alt=""
            />
          </div>
          <div className="col-lg-6 align-content-lg-end">
            <div className="d-flex flex-column gap-10 gap-lg-6 gap-xxl-10 align-items-center mt-10 mt-lg-0">
              <picture>
                <source srcSet={headingDecoration} media="(min-width: 1200px)" />
                <img src={headingDecorationSm} className="img-fluid" alt="" />
              </picture>
              <img src={imgTitle} className="img-fluid about-width-xxl-160px" alt="植一抹綠，讓心寧靜。" />
              <picture>
                <source srcSet={headingDecoration} media="(min-width: 1200px)" />
                <img src={headingDecorationSm} className="img-fluid" alt="" />
              </picture>
            </div>
          </div>
        </div>
      </div>
      <section className="container">
        <div className="row">
          <div className="col-lg-2 text-center mt-12 mt-lg-15">
            <p className="fs-8 fs-lg-7 noto-serif-tc fw-bold text-primary mb-4">Contact Us</p>
            <h2 className="h3 fs-lg-2 text-neutral-700 vertical-lr d-inline-block mb-4">聯絡我們</h2>
            <picture>
              <source srcSet={headingDecoration} media="(min-width: 992px)" />
              <img src={headingDecorationSm} className="img-fluid d-block mx-auto" alt="" />
            </picture>
          </div>
          <div className="col-lg-3 align-self-end pb-lg-15 mb-lg-15 mt-12 mt-lg-0">
            <div className="d-block text-primary-900 about-max-width-260px about-max-width-lg-none mx-auto ms-lg-auto about-me-lg-n6">
              <p className="fs-sm fs-lg-8 text-center text-lg-start mb-5 mb-lg-6">
                如果您有品牌合作、活動策劃、媒體採訪…等需求，都歡迎與我們隨時聯絡。
              </p>
              <p className="fs-sm fs-lg-8 text-center text-lg-start">
                請寄至
                <a href="mailto:plantique.life@gmail.com" className="link-primary-900">
                  plantique.life@gmail.com
                </a>
                <br />
                我們將盡速與您聯繫。
              </p>
            </div>
          </div>
          <div className="col-lg-6 ms-lg-auto">
            <img src={imgAbout03} className="img-fluid d-none d-lg-block mx-auto" alt="" />
          </div>
        </div>
      </section>
      <img src={imgAbout03} className="img-fluid d-block d-lg-none mt-12 mx-auto" alt="" />
    </>
  );
}

export default About;
