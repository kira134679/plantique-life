import clsx from 'clsx';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Button from '@/components/Button';
import { guestLogin } from '@/slice/guestAuthSlice';
import { closeModal } from '@/slice/uiSlice';
import { useState } from 'react';

function Login({ onSwitchToRegister }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async data => {
    const { email, password } = data;
    try {
      await dispatch(guestLogin({ email, password })).unwrap();
      // 處理畫面顯示
      setIsError(false);
      setErrorMessage('');
      dispatch(closeModal());
      toast.success('登入成功');
      navigate('/'); // 會員中心未完成，先跳至首頁
    } catch (error) {
      setIsError(true);
      setErrorMessage(error);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Modal.Header className="border-bottom-0" closeButton />
      <Modal.Body>
        <div className="d-flex align-items-center mb-4">
          <h5 className="text-primary-700 border-start border-primary-700 border-5 ps-2">登入</h5>
          <p className="fs-sm text-neutral-600 ms-auto">還不是會員嗎？</p>
          <Button
            type="button"
            variant="link-primary"
            size="sm"
            className="fs-sm rounded-0 p-0 ms-2"
            onClick={onSwitchToRegister}
          >
            註冊會員
          </Button>
        </div>
        <p className="text-secondary mb-4">透過植感會員登入</p>
        <div>
          <div className="row g-3 align-items-center mb-3">
            <div className="col-3">
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
          <div className="row g-3 align-items-center">
            <div className="col-3">
              <label htmlFor="password" className="col-form-label fs-sm fs-lg-8">
                密碼
              </label>
            </div>
            <div className="col-8 ms-auto">
              <input
                type="password"
                id="password"
                className={clsx('form-control', errors.password && 'is-invalid')}
                {...register('password', { required: '密碼是必填欄位' })}
              />
              <p className="fs-xs fs-lg-sm text-danger mt-1">{errors.password?.message}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-top-0 mb-8">
        <Button variant="filled-primary" shape="square" size="md" className="w-100" type="submit" form="login-form">
          登入
        </Button>
        {isError && <p className="fs-xs text-danger mt-2">登入失敗：{errorMessage}</p>}
      </Modal.Footer>
    </form>
  );
}

export default Login;
