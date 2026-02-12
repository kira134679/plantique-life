import Button from '@/components/Button';
import { Link } from 'react-router';

const formatDate = timestamp => {
  const date = new Date(timestamp);
  const pad = n => n.toString().padStart(2, '0');

  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

function ThirdStep({ orderInfo }) {
  return (
    <>
      <div className="completed-svg-wrapper mx-auto">
        <svg className="completed-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <circle className="completed-svg-circle-outline" cx="12" cy="12" r="11.5" />
            <circle className="completed-svg-circle-fill" cx="12" cy="12" r="11.5" />
            <circle className="completed-svg-circle-fill-center" cx="12" cy="12" r="11.5" />
            <path className="completed-svg-tick" d="M7 12 L10.5 15.5 L17.5 9" />
          </g>
        </svg>
      </div>
      <div className="completed-message-wrapper">
        <div className="text-center py-12">
          <p className="h4 fs-lg-3 text-neutral-700 mb-4">感謝您的訂購！</p>
          <p className="fs-6 fs-lg-5 text-neutral-700 mb-1">
            您的訂單編號 <span className="text-danger">{orderInfo.orderId}</span>
          </p>
          <p className="fs-8 fs-lg-7 text-neutral-400">商品會於出貨時再通知您。</p>
          <p className="fs-8 fs-lg-7 text-neutral-400">
            訂單確認郵件已經發送至您的電子信箱：<span>{orderInfo.email}</span>。<br />
            您可至「我的訂單」頁面查看訂單狀態，有任何問題或意見也歡迎透過線上客服聯繫我們，或撥打客服專線：
            <span className="text-nowrap">02-0800-0800</span>
          </p>
          {orderInfo.isTransfer && (
            <div className="d-flex flex-column align-items-center">
              <p className="fs-7 fs-lg-6 noto-serif-tc fw-bold text-neutral-600 my-3">繳費資訊</p>
              <div className="text-start text-neutral-600">
                <p className="fs-sm fs-lg-8 mb-1">銀行名稱 : 台灣銀行</p>
                <p className="fs-sm fs-lg-8 mb-1">銀行代碼 : 004</p>
                <p className="fs-sm fs-lg-8 mb-1">帳戶號碼 : 000000000000</p>
                <p className="fs-sm fs-lg-8">繳費截止時間 : {formatDate(orderInfo.transferDeadline)}</p>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-lg-8 mx-lg-auto">
            <div className="d-flex flex-column-reverse flex-lg-row gap-4">
              <Button type="button" variant="outline-neutral" shape="pill" size="lg" className="flex-grow-1">
                查看訂單
              </Button>
              <Button
                type="button"
                as={Link}
                to="/products"
                variant="filled-primary"
                shape="pill"
                size="lg"
                className="flex-grow-1"
              >
                繼續購物
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThirdStep;
