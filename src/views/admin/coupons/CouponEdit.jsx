import { useState } from 'react';
import { useParams } from 'react-router';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../../components/Button';

// 套件
import DatePicker from 'react-datepicker';

// 自訂時間輸入框
const CustomTimeInput = ({ date, onChangeCustom }) => {
  const value = date instanceof Date && !isNaN(date) ? date.toLocaleTimeString('it-IT') : '';
  return (
    <input
      type="time"
      step="1"
      value={value}
      onChange={event => onChangeCustom(date, event.target.value)}
      className="form-control form-control-sm is-invalid"
    />
  );
};

function CouponEdit() {
  const { id } = useParams();
  const isUpdateMode = id !== undefined;

  // 選日期時間套件的資料處理
  const [startDate, setStartDate] = useState(new Date());
  const handleChangeTime = (date, time) => {
    const [hh, mm, ss] = time.split(':');
    const targetDate = date instanceof Date && !isNaN(date) ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    setStartDate(targetDate);
  };

  return (
    <>
      <div className="container py-13">
        <h2 className="h3 mb-8">{isUpdateMode ? '更改優惠券' : '新增優惠券'}</h2>
        <form>
          <section className="py-6">
            <h3 className="h4 mb-6">基本設定</h3>
            <div className="mb-6 w-50 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-code`}
              >
                折扣碼<span className="text-danger">*</span>
              </label>
              <input
                id={`${isUpdateMode ? 'update-' : 'new-'}coupon-code`}
                className="form-control"
                type="text"
                defaultValue={isUpdateMode ? id : null}
                placeholder="請輸入優惠券折扣碼"
              />
              <div className="invalid-feedback">必填欄位</div>
            </div>
            <div className="mb-6 w-50 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-title`}
              >
                名稱<span className="text-danger">*</span>
              </label>
              <input
                id={`${isUpdateMode ? 'update-' : 'new-'}coupon-title`}
                className="form-control"
                type="text"
                placeholder="請輸入優惠券名稱"
              />
              <div className="invalid-feedback">必填欄位</div>
            </div>
            <div className="mb-6 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-status`}
              >
                狀態<span className="text-danger">*</span>
              </label>
              <Dropdown className="checkout-dropdown">
                <Dropdown.Toggle
                  className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                  id={`${isUpdateMode ? 'update-' : 'new-'}coupon-status`}
                >
                  請選擇優惠券狀態
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item href="#">啟用</Dropdown.Item>
                  <Dropdown.Item href="#">停用</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="invalid-feedback">必填欄位</div>
            </div>
            <div className="mb-6 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-discount`}
              >
                折扣<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  id={`${isUpdateMode ? 'update-' : 'new-'}coupon-discount`}
                  className="form-control"
                  type="number"
                  placeholder="請輸入折扣"
                />
                <span className="input-group-text bg-primary-100">%</span>
              </div>
              <div className="invalid-feedback">必填欄位</div>
            </div>
            <div className="mb-6 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-duetime`}
              >
                結束時間<span className="text-danger">*</span>
              </label>
              <DatePicker
                id={`${isUpdateMode ? 'update-' : 'new-'}coupon-duetime`}
                selected={startDate}
                onChange={date => setStartDate(date)}
                onChangeRaw={e => e.preventDefault()}
                onFocus={e => e.target.blur()}
                dateFormat="yyyy/MM/dd HH:mm:ss"
                showTimeInput
                customTimeInput={<CustomTimeInput onChangeCustom={handleChangeTime} />}
                className="form-control is-invalid"
                popperClassName="z-5"
              />
              <div className="invalid-feedback d-block">時間區間錯誤</div>
            </div>
          </section>
          <div className="d-flex">
            <Button
              as="a"
              href="#/admin/coupons"
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
              儲存變更
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CouponEdit;
