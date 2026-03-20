import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, updateCoupon } from '../../../slice/coupon/adminCouponSlice';

import clsx from 'clsx';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';

// 套件
import DatePicker from 'react-datepicker';

function CouponEdit() {
  const { id } = useParams();
  const isUpdateMode = id !== undefined;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { coupons } = useSelector(state => state.adminCoupon);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      const payload = {
        ...data,
        is_enabled: Number(data.is_enabled),
        percent: Number(data.percent),
        due_date: data.due_date,
      };

      if (isUpdateMode) {
        await dispatch(updateCoupon({ id, data: payload })).unwrap();
        toast.success('修改成功');
      } else {
        await dispatch(createCoupon(payload)).unwrap();
        toast.success('已新增優惠券');
      }

      navigate('/admin/coupons');
    } catch {
      toast.error('操作失敗');
    }
  };

  useEffect(() => {
    if (isUpdateMode && coupons.length > 0) {
      const coupon = coupons.find(c => c.id === id);

      if (coupon) {
        reset({
          title: coupon.title,
          is_enabled: coupon.is_enabled,
          percent: coupon.percent,
          code: coupon.code,
          due_date: coupon.due_date,
        });
      }
    }
  }, [id, coupons, reset, isUpdateMode]);

  return (
    <>
      <div className="py-13">
        <h2 className="h3 mb-8">{isUpdateMode ? '更改優惠券' : '新增優惠券'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="py-6">
            <h3 className="h4 mb-6">基本設定</h3>

            {/* code */}
            <div className="mb-6 w-50 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-code`}
              >
                折扣碼<span className="text-danger">*</span>
              </label>
              <input
                id={`${isUpdateMode ? 'update-' : 'new-'}coupon-code`}
                className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                type="text"
                placeholder="請輸入優惠券折扣碼"
                {...register('code', {
                  required: '請輸入折扣碼',
                })}
              />
              {errors.code && <div className="text-danger">{errors.code.message}</div>}
            </div>

            {/* title */}
            <div className="mb-6 w-50 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-title`}
              >
                名稱<span className="text-danger">*</span>
              </label>
              <input
                id={`${isUpdateMode ? 'update-' : 'new-'}coupon-title`}
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                type="text"
                placeholder="請輸入優惠券名稱"
                {...register('title', {
                  required: '請輸入優惠券名稱',
                })}
              />
              {errors.title && <div className="text-danger">{errors.title.message}</div>}
            </div>

            {/* status */}
            <div className="mb-6 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-status`}
              >
                狀態<span className="text-danger">*</span>
              </label>
              <Controller
                name="is_enabled"
                control={control}
                rules={{ required: '請選擇優惠券狀態' }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    className={clsx('checkout-dropdown', errors.is_enabled && 'zod-validated is-invalid')}
                    onSelect={value => onChange(Number(value))}
                  >
                    <Dropdown.Toggle
                      className={clsx(
                        'btn bg-transparent border w-100 text-start fs-lg-8',
                        errors.is_enabled && 'is-invalid',
                        value !== undefined && 'text-neutral-700',
                        value === undefined && 'text-neutral-500',
                      )}
                      id={`${isUpdateMode ? 'update-' : 'new-'}coupon-status`}
                    >
                      {value === undefined || value === null ? '請選擇狀態' : Number(value) === 1 ? '啟用' : '停用'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item eventKey="1" as="button" type="button">
                        啟用
                      </Dropdown.Item>

                      <Dropdown.Item eventKey="0" as="button" type="button">
                        停用
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              />
              {errors.is_enabled && <p className="text-danger">{errors.is_enabled.message}</p>}
            </div>

            {/* discount */}
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
                  className={`form-control ${errors.percent ? 'is-invalid' : ''}`}
                  type="number"
                  placeholder="請輸入折扣"
                  {...register('percent', {
                    required: '請輸入折扣',
                    max: { value: 100, message: '折扣不能超過 100%' },
                    min: { value: 1, message: '折扣至少 1%' },
                  })}
                />
                <span className="input-group-text bg-primary-100">%</span>
              </div>
              {errors.percent && <div className="text-danger">{errors.percent.message}</div>}
            </div>

            {/* due_date */}
            <div className="mb-6 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}coupon-duetime`}
              >
                結束時間<span className="text-danger">*</span>
              </label>
              <Controller
                name="due_date"
                control={control}
                rules={{ required: '請選擇日期' }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    id={`${isUpdateMode ? 'update-' : 'new-'}coupon-duetime`}
                    // 將 timestamp 轉回 Date 物件供顯示
                    selected={value ? new Date(value * 1000) : null}
                    //選擇後將 Date 物件轉 timestamp 存入表單
                    onChange={date => {
                      if (date) {
                        onChange(Math.floor(date.getTime() / 1000));
                      }
                    }}
                    dateFormat="yyyy/MM/dd HH:mm:ss"
                    showTimeInput
                    className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}
                  />
                )}
              />
              {errors.due_date && <p className="text-danger">{errors.due_date.message}</p>}
            </div>
          </section>
          <div className="d-flex">
            <Button
              as={Link}
              to="/admin/coupons"
              variant="outline-neutral"
              shape="pill"
              size="sm"
              className="ms-auto me-4"
            >
              {isUpdateMode ? '取消修改' : '放棄填寫'}
            </Button>
            <Button type="submit" variant="filled-primary" shape="pill" size="sm">
              {isUpdateMode ? '儲存變更' : '新增優惠券'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CouponEdit;
