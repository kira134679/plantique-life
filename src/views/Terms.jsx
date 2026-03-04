import Button from '@/components/Button';
import { Link } from 'react-router';

export default function Terms() {
  return (
    <div className="legal-page py-12 py-lg-15">
      <div className="container">
        <h1 className="h3 fs-lg-2 text-primary-700 mb-2">使用者條款</h1>
        <p className="fs-sm fs-lg-8 text-neutral-400 ls-wide mb-8 mb-lg-10">Terms of Service</p>
        <p className="fs-xs text-neutral-400 mb-8">最後更新日期：2025 年 1 月 1 日</p>

        <div className="legal-content">
          <section className="legal-section mb-10">
            <p className="fs-sm fs-lg-8 text-neutral-500">
              歡迎使用「植感生活 Plantique Life」（以下簡稱「本網站」）所提供的各項服務。
              當您註冊成為本網站會員或使用本網站的任何服務時，即代表您已閱讀、瞭解並同意接受本使用者條款之所有內容。
              若您不同意本條款之任何部分，請勿使用本網站。
            </p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">一、服務範圍</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">本網站提供的服務包括但不限於：</p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                植栽單品、療癒組盆、客製禮盒及相關配件商品之展示與線上購買。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">植物養護知識、生活提案等專欄內容之瀏覽。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">會員帳號管理、訂單管理、願望清單等個人化功能。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                最新消息、行銷活動及優惠資訊之推播（需經您同意）。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">二、會員帳號</h2>
            <h3 className="fs-8 fs-lg-7 text-neutral-600 mt-5 mb-3">2.1 註冊與帳號安全</h3>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                您在註冊會員時，應提供真實、正確、完整之個人資料，並於資料變更時即時更新。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                您有義務妥善保管帳號及密碼，不得將帳號轉讓、借用或與他人共用。因帳號遭他人盜用或不當使用所生之損害，
                本網站不負擔任何責任。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                若您發現帳號遭到未經授權的使用，請立即通知本網站客服團隊。
              </li>
            </ul>
            <h3 className="fs-8 fs-lg-7 text-neutral-600 mt-5 mb-3">2.2 帳號停用與刪除</h3>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                若您違反本使用者條款或有不法行為，本網站得隨時暫停或終止您的帳號，恕不另行通知。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                您可隨時向本網站提出刪除帳號之申請，我們將依據
                <Button
                  as={Link}
                  to="/privacy-policy"
                  variant="link-primary"
                  shape="link"
                  size="sm"
                  className="vertical-baseline p-0"
                >
                  隱私權政策
                </Button>
                處理您的個人資料。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">三、購物與交易</h2>
            <h3 className="fs-8 fs-lg-7 text-neutral-600 mt-5 mb-3">3.1 商品資訊</h3>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                本網站上之商品圖片僅供參考，由於植物為自然生長之生物，實際商品可能因拍攝光線、螢幕顯色或自然生長差異而略有不同。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                商品價格、規格及庫存狀態以網站即時顯示為準，本網站保留隨時調整之權利。
              </li>
            </ul>
            <h3 className="fs-8 fs-lg-7 text-neutral-600 mt-5 mb-3">3.2 訂單成立</h3>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                當您提交訂單並完成付款後，即代表您已向本網站提出購買要約。本網站將以電子郵件或系統通知確認訂單，
                訂單經本網站確認後始正式成立。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                若因商品缺貨、價格標示錯誤或其他不可歸責於本網站之事由，本網站有權取消或修改訂單，
                並將已收款項全額退還予您。
              </li>
            </ul>
            <h3 className="fs-8 fs-lg-7 text-neutral-600 mt-5 mb-3">3.3 付款方式</h3>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">本網站目前支援以下付款方式：</p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">信用卡線上刷卡（Visa、MasterCard、JCB）</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">ATM 轉帳</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">貨到付款</li>
            </ul>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">所有線上付款均透過第三方金流服務商安全處理。</p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">四、配送服務</h2>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                本網站商品配送範圍以台灣本島為主。離島地區可能需加收運費，詳細費用將於結帳時顯示。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                一般訂單將於付款確認後 3～5 個工作天內出貨（客製商品除外）。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                植物商品因其特殊性質，僅於適宜配送之天氣條件下出貨，以確保植物品質。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                配送期間如遇不可抗力因素（天災、疫情、物流異常等），本網站將盡速通知您，出貨時間可能延後。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">五、退換貨政策</h2>
            <h3 className="fs-8 fs-lg-7 text-neutral-600 mt-5 mb-3">5.1 一般商品</h3>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                依據《消費者保護法》，您享有商品到貨後七日之猶豫期（鑑賞期）。於此期間內，您可申請退貨並獲得全額退款。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                退貨商品須保持原始包裝完整、未經使用且不影響二次銷售。
              </li>
            </ul>
            <h3 className="fs-8 fs-lg-7 text-neutral-600 mt-5 mb-3">5.2 植物商品</h3>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                由於植物為有生命之商品，若於收貨時發現植物明顯受損、枯萎或與訂購品項不符， 請於到貨後 24
                小時內拍照並聯繫客服，我們將協助您辦理退換貨。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                因個人照護不當所導致之植物損傷，恕不接受退換貨申請。
              </li>
            </ul>
            <h3 className="fs-8 fs-lg-7 text-neutral-600 mt-5 mb-3">5.3 客製商品</h3>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                客製化商品（如客製禮盒）因其特殊性質，除商品本身有瑕疵外，恕不接受退換貨。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">六、智慧財產權</h2>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                本網站上之所有內容，包括但不限於文字、圖片、影像、圖形設計、版面編排、程式碼及商標等，
                均屬本網站或其授權人所有，受中華民國著作權法及相關智慧財產權法律之保護。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                未經本網站事先書面同意，您不得以任何形式複製、轉載、公開傳輸、改作、散布或用於商業目的。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                您在本網站發布之內容（如商品評價、留言等），您同意授予本網站全球性、非專屬、免費之使用權利。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">七、使用規範</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">使用本網站時，您同意不會從事以下行為：</p>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                以任何方式干擾本網站之正常運作，包括但不限於發送惡意程式、進行攻擊或未經授權存取系統。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">冒充他人或以虛假資訊註冊帳號。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">利用本網站從事任何違法或侵害他人權益之活動。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">以自動化工具（如爬蟲程式）大量擷取本網站內容。</li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">發布不當、誹謗、歧視或色情之內容。</li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">八、免責聲明</h2>
            <ul className="ps-6 mb-4">
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                本網站之服務係以「現況」提供，我們不保證服務不會中斷或完全無誤。對於因不可抗力因素、
                系統維護或第三方服務異常所造成之服務中斷或損失，本網站不負擔賠償責任。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                本網站提供之植物養護資訊僅供參考，實際照護效果可能因環境條件不同而有所差異， 本網站不保證任何特定結果。
              </li>
              <li className="fs-sm fs-lg-8 text-neutral-500 mb-2">
                對於您因使用本網站、連結至第三方網站或依據本網站資訊所做之決策而產生的任何直接或間接損失，
                本網站在法律允許之最大範圍內不承擔責任。
              </li>
            </ul>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">九、條款之修訂</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              本網站保留隨時修訂本使用者條款之權利。修訂後的條款將公告於本頁面，並更新「最後更新日期」。
              若修訂內容涉及重大變更，我們將透過電子郵件或網站公告通知您。您於修訂後繼續使用本網站，
              即代表您同意接受修訂後之條款。
            </p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">十、準據法與管轄法院</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              本使用者條款之解釋與適用，以及與本條款有關之爭議，均以中華民國法律為準據法。
              因本條款所生之訴訟，雙方合意以台灣台北地方法院為第一審管轄法院。
            </p>
          </section>

          <section className="legal-section mb-10">
            <h2 className="h6 fs-lg-5 text-neutral-700 mb-4 pb-2 border-bottom">十一、聯絡我們</h2>
            <p className="fs-sm fs-lg-8 text-neutral-500 mb-3">
              若您對本使用者條款有任何疑問，歡迎透過以下方式與我們聯繫：
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
