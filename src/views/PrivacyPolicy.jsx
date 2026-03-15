import Button from '@/components/Button';
import { Link } from 'react-router';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page py-12 py-lg-15">
      <div className="container">
        <h1 className="h3 fs-lg-2 text-primary-700 mb-2">隱私權政策</h1>
        <p className="fs-sm fs-lg-8 text-neutral-400 ls-wide mb-8 mb-lg-10">Privacy Policy</p>
        <p className="fs-xs text-neutral-400 mb-8">最後更新日期：2025 年 1 月 1 日</p>

        <div className="legal-content">
          <section className="legal-section mb-10">
            <p className="fs-sm fs-lg-8 text-neutral-500">
              歡迎您使用「植感生活 Plantique Life」（以下簡稱「本網站」）。我們非常重視您的隱私權及個人資料保護，
              並依據中華民國《個人資料保護法》及相關法規，制定本隱私權政策。請您在使用本網站服務前，詳細閱讀以下內容。
            </p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">一、個人資料之蒐集</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              當您使用本網站的各項服務時，我們可能會蒐集以下個人資料：
            </p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">註冊資訊：</strong>
                姓名、電子郵件、密碼等您在註冊會員時所提供之資料。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">訂單資訊：</strong>
                收件人姓名、聯絡電話、收件地址、發票資訊等您在購物時所提供之資料。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">瀏覽紀錄：</strong>
                您在本網站的瀏覽頁面、停留時間、點擊紀錄等使用行為資料。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">裝置資訊：</strong>
                您的 IP 位址、瀏覽器類型、作業系統、螢幕解析度等技術性資料。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">二、個人資料之使用目的</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">我們蒐集您的個人資料，將用於以下目的：</p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">提供會員註冊、登入及帳號管理服務。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                處理您的訂單，包括商品出貨、物流追蹤及退換貨服務。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">發送訂單通知、出貨通知及客服回覆等交易相關訊息。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                經您同意後，寄送行銷活動、優惠資訊及電子報等推廣訊息。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                進行網站使用分析，以改善使用者體驗及優化服務品質。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">遵循法律義務或配合司法機關之調查。</li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">三、Cookie 與追蹤技術</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              本網站使用 Cookie 及類似追蹤技術，以提升您的瀏覽體驗。Cookie
              是一小段儲存於您瀏覽器中的文字資料，可協助我們辨識您的身分、記住您的偏好設定，以及分析網站流量。
            </p>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">我們使用的 Cookie 類型包括：</p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">必要性 Cookie：</strong>
                維持網站基本功能運作所必需，例如保持登入狀態、記錄購物車內容等。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">分析性 Cookie：</strong>
                協助我們瞭解使用者如何與網站互動，用以改善網站設計與功能。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">行銷性 Cookie：</strong>
                用於追蹤使用者跨網站的瀏覽行為，以提供更符合您興趣的廣告內容。
              </li>
            </ul>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              您可透過瀏覽器設定管理或停用 Cookie，但部分功能可能因此無法正常運作。
            </p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">四、個人資料之保護</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              我們採用合理的安全技術與管理措施來保護您的個人資料，防止未經授權的存取、使用或洩漏。這些措施包括但不限於：
            </p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">使用 SSL/TLS 加密技術保護資料傳輸過程。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                密碼以加密形式儲存，任何人（包括本網站管理人員）均無法取得您的原始密碼。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                定期檢視與更新資訊安全措施，以因應最新的安全威脅。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                限制個人資料之存取權限，僅授權必要之工作人員處理。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">五、個人資料之第三方分享</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              我們不會將您的個人資料出售、交換或出租予任何第三方。但在以下情況下，我們可能會將您的資料分享予第三方：
            </p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">物流合作夥伴：</strong>
                為完成商品配送服務，我們會將收件人資訊提供予合作之物流業者。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">金流服務商：</strong>
                為處理線上付款，您的部分交易資訊會經由第三方金流服務商處理。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">法律要求：</strong>
                當法律要求、司法程序或政府機關合法請求時，我們可能依法揭露您的個人資料。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">六、您的權利</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">根據《個人資料保護法》，您享有以下權利：</p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">查詢或請求閱覽您的個人資料。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">請求製給個人資料複製本。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">請求補充或更正您的個人資料。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">請求停止蒐集、處理或利用您的個人資料。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">請求刪除您的個人資料。</li>
            </ul>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              如欲行使上述權利，請透過本網站的
              <Button as={Link} to="/" variant="link-primary" shape="link" size="sm" className="vertical-baseline p-0">
                聯絡我們
              </Button>
              頁面與我們聯繫，我們將於收到您的請求後，依法於合理期間內回覆處理。
            </p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">七、未成年人之保護</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              若您為未滿十八歲之未成年人，請在法定代理人的陪同下閱讀本隱私權政策，並於取得其同意後方可使用本網站之各項服務。
            </p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">八、隱私權政策之修訂</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              本網站保留隨時修訂本隱私權政策之權利。修訂後的政策將公告於本頁面，並更新「最後更新日期」。
              我們建議您定期檢視本政策，以瞭解我們如何保護您的個人資料。
            </p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">九、聯絡我們</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              若您對本隱私權政策有任何疑問或建議，歡迎透過以下方式與我們聯繫：
            </p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">電子郵件：</strong>plantique.life@gmail.com
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">客服專線：</strong>(02) 1234-5678
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                <strong className="text-neutral-600 me-1">服務時間：</strong>平日 09:00 - 21:00
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
