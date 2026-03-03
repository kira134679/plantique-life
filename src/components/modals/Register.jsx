import clsx from 'clsx';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import Button from '@/components/Button';
import { flushPendingBuyNowItem, migrateGuestCart } from '@/slice/cartSlice';
import { guestRegister } from '@/slice/guestAuthSlice';
import { closeModal } from '@/slice/uiSlice';

function Register({ onSwitchToLogin }) {
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      receiveNews: false,
    },
  });

  const onSubmit = async data => {
    const { name, email, password, receiveNews } = data;
    try {
      const submitData = {
        name,
        email,
        password,
        receiveNews,
      };
      // 註冊
      await dispatch(guestRegister(submitData)).unwrap();

      // 處理畫面顯示
      setIsError(false);
      setErrorMessage('');
      dispatch(closeModal());
      toast.success('註冊成功');

      // 將「立即購買」暫存商品加入 localStorage
      dispatch(flushPendingBuyNowItem());

      // localstorage 資訊加入購物車
      const result = await dispatch(migrateGuestCart());
      if (migrateGuestCart.rejected.match(result)) {
        toast.error(result.payload);
      }
      if (migrateGuestCart.fulfilled.match(result)) {
        const failedItemCount = result.payload;
        if (failedItemCount) {
          toast.error(`有 ${failedItemCount} 個產品加入購物車失敗`);
        }
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error);
    }
  };

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Modal.Header className="border-bottom-0" closeButton />
      <Modal.Body>
        <div className="d-flex align-items-center mb-4">
          <h5 className="text-primary-700 border-start border-primary-700 border-5 ps-2">註冊</h5>
          <p className="fs-sm text-neutral-600 ms-auto">已經是會員？</p>
          <Button
            type="button"
            variant="link-primary"
            size="sm"
            className="fs-sm rounded-0 p-0 ms-2"
            onClick={onSwitchToLogin}
          >
            登入會員
          </Button>
        </div>
        <p className="text-secondary mb-4">註冊植感會員</p>
        <div>
          <div className="row g-3 align-items-center mb-3">
            <div className="col-3 align-self-start">
              <div className="d-flex align-items-center">
                <label htmlFor="name" className="col-form-label fs-sm fs-lg-8">
                  姓名
                </label>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip className="auth-tooltip fs-xs fs-lg-sm">
                      姓名提示：
                      <ul className="d-flex flex-column gap-1 ps-6 mt-2">
                        <li>包含 2 ~ 20 個字元</li>
                        <li>可使用中文、英文大小寫字母</li>
                        <li>可包含空格</li>
                        <li>不可包含數字或特殊符號</li>
                      </ul>
                    </Tooltip>
                  }
                >
                  <Button type="button" shape="circle" size="sm" className="auth-tooltip-btn border-0 p-0 ms-2">
                    <span className="custom-btn-icon material-symbols-rounded fs-6">help</span>
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
            <div className="col-8 ms-auto">
              <input
                type="text"
                id="name"
                className={clsx('form-control', errors.name && 'is-invalid')}
                {...register('name', {
                  required: '姓名是必填欄位',
                  minLength: { value: 2, message: '姓名至少2個字元' },
                  maxLength: { value: 20, message: '姓名最多20個字元' },
                  pattern: { value: /^[\u4e00-\u9fa5a-zA-Z ]{2,20}$/, message: '姓名格式有誤' },
                })}
              />
              <p className="fs-xs fs-lg-sm text-danger mt-1">{errors.name?.message}</p>
            </div>
          </div>
          <div className="row g-3 align-items-center mb-3">
            <div className="col-3 align-self-start">
              <label htmlFor="email" className="col-form-label fs-sm fs-lg-8">
                電子郵件
              </label>
            </div>
            <div className="col-8 ms-auto">
              <input
                type="email"
                id="email"
                className={clsx('form-control', errors.email && 'is-invalid')}
                {...register('email', {
                  required: '電子郵件是必填欄位',
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '電子郵件不符合格式' },
                })}
              />
              <p className="fs-xs fs-lg-sm text-danger mt-1">{errors.email?.message}</p>
            </div>
          </div>
          <div className="row g-3 align-items-center mb-3">
            <div className="col-3 align-self-start">
              <div className="d-flex align-items-center">
                <label htmlFor="password" className="col-form-label fs-sm fs-lg-8">
                  密碼
                </label>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip className="auth-tooltip fs-xs fs-lg-sm">
                      密碼提示：
                      <ul className="d-flex flex-column gap-1 ps-6 mt-2">
                        <li>包含 6 ~ 16 個字元</li>
                        <li>至少要有英文大小寫字母或數字</li>
                        <li>建議加入特殊符號，已提升密碼強度</li>
                        <li>密碼不可與帳號相同</li>
                        <li>不建議使用連續字元或常見密碼</li>
                      </ul>
                    </Tooltip>
                  }
                >
                  <Button type="button" shape="circle" size="sm" className="auth-tooltip-btn border-0 p-0 ms-2">
                    <span className="custom-btn-icon material-symbols-rounded fs-6">help</span>
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
            <div className="col-8 ms-auto">
              <input
                type="password"
                id="password"
                className={clsx('form-control', errors.password && 'is-invalid')}
                {...register('password', {
                  required: '密碼是必填欄位',
                  minLength: { value: 6, message: '密碼至少6個字元' },
                  maxLength: { value: 16, message: '密碼最多16個字元' },
                  pattern: { value: /^(?=.*[a-zA-Z0-9])\S{6,16}$/, message: '密碼須包含至少一個英文字母或數字' },
                  validate: value => value !== getValues('email') || '密碼不可與帳號相同',
                  onChange: () => {
                    if (getValues('passwordConfirm')) {
                      trigger('passwordConfirm');
                    }
                  },
                })}
              />
              <p className="fs-xs fs-lg-sm text-danger mt-1">{errors.password?.message}</p>
            </div>
          </div>
          <div className="row g-3 align-items-center mb-4">
            <div className="col-3 align-self-start">
              <label htmlFor="passwordConfirm" className="col-form-label fs-sm fs-lg-8 text-nowrap">
                再次輸入密碼
              </label>
            </div>
            <div className="col-8 ms-auto">
              <input
                type="password"
                id="passwordConfirm"
                className={clsx('form-control', errors.passwordConfirm && 'is-invalid')}
                {...register('passwordConfirm', {
                  required: '再次輸入密碼是必填欄位',
                  validate: value => value === getValues('password') || '密碼不一致',
                })}
              />
              <p className="fs-xs fs-lg-sm text-danger mt-1">{errors.passwordConfirm?.message}</p>
            </div>
          </div>
          <div className="form-check">
            <input type="checkbox" id="receiveNews" className="form-check-input" {...register('receiveNews')} />
            <label htmlFor="receiveNews" className="fs-sm fs-lg-8">
              我願意收到植感生活的最新優惠消息
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-start border-top-0 mb-8">
        <Button variant="filled-primary" shape="square" size="md" className="w-100" type="submit" form="register-form">
          註冊
        </Button>
        <p className="fs-xs text-neutral-500 align-self-start">
          註冊即表示您同意本網站的{' '}
          <Link to="/privacy-policy" target="_blank">
            隱私權政策
          </Link>{' '}
          和{' '}
          <Link to="/terms" target="_blank">
            使用者條款
          </Link>
        </p>
        {isError && <p className="fs-xs text-danger mt-2">註冊失敗：{errorMessage}</p>}
      </Modal.Footer>
    </form>
  );
}

export default Register;
