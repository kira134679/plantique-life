import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../../components/Button';

function CouponAdd() {
  return (
    <>
      <div className="container py-13">
        <h2 className="h3 mb-8">新增優惠券</h2>
        <form>
          <section className="py-6">
            <h3 className="h4 mb-6">基本設定</h3>
            <div className="mb-6 w-50 min-w-14rem">
              <label className="form-label text-neutral-700 fs-7" htmlFor="new-coupon-code">
                折扣碼<span className="text-danger">*</span>
              </label>
              <input id="new-coupon-code" className="form-control" type="text" placeholder="請輸入優惠券折扣碼" />
            </div>
            <div className="mb-6 w-50 min-w-14rem">
              <label className="form-label text-neutral-700 fs-7" htmlFor="new-coupon-title">
                名稱<span className="text-danger">*</span>
              </label>
              <input id="new-coupon-title" className="form-control" type="text" placeholder="請輸入優惠券名稱" />
            </div>
            <div className="mb-6 w-25 min-w-14rem">
              <label className="form-label text-neutral-700 fs-7" htmlFor="new-coupon-status">
                狀態<span className="text-danger">*</span>
              </label>
              <Dropdown className="checkout-dropdown">
                <Dropdown.Toggle
                  className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                  id="new-coupon-status"
                >
                  請選擇優惠券狀態
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item href="#">啟用</Dropdown.Item>
                  <Dropdown.Item href="#">停用</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="mb-6 w-25 min-w-14rem">
              <label className="form-label text-neutral-700 fs-7" htmlFor="new-coupon-discount">
                折扣<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input id="new-coupon-discount" className="form-control" type="number" placeholder="請輸入折扣" />
                <span className="input-group-text bg-primary-100">%</span>
              </div>
            </div>
            <div className="mb-6 w-25 min-w-14rem">
              <label className="form-label text-neutral-700 fs-7" htmlFor="new-coupon-duetime">
                結束時間<span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                id="new-coupon-duetime"
                name="new-coupon-duetime"
                min="2023-01-01T00:00"
                max="2028-12-30T00:00"
                className="form-control"
              />
            </div>
          </section>
          <div className="d-flex">
            <Button
              as="a"
              href="#/backstage/coupons"
              variant="outline-neutral"
              shape="pill"
              size="sm"
              className="ms-auto me-4"
            >
              放棄填寫
            </Button>
            <Button
              type="submit"
              variant="filled-primary"
              shape="pill"
              size="sm"
              onClick={e => {
                e.preventDefault();
              }}
            >
              新增優惠券
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CouponAdd;
