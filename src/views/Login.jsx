import { zodResolver } from '@hookform/resolvers/zod';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import * as z from 'zod';
import { authApi } from '../api';
import { checkAuth, setIsAuth } from '../slice/authSlice';

export default function Login() {
  const { isAuth, authChecked } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminAuthSchema = z.object({
    username: z.email({ error: 'Email 格式錯誤' }),
    password: z
      .string()
      .min(6, { error: '長度至少6個字元' })
      .max(16, { error: '長度最多16個字元' })
      .refine(pwd => /[A-Z]/.test(pwd), { error: '至少包含1個大寫字母' })
      .refine(pwd => /[a-z]/.test(pwd), { error: '至少包含1個小寫字母' })
      .refine(pwd => /\d/.test(pwd), { error: '至少包含1位數字' }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(adminAuthSchema), criteriaMode: 'all' });

  const onSubmit = async data => {
    try {
      const res = await authApi.login(data);
      const { success, token, expired } = res.data;

      if (success) {
        Cookie.set('auth_token', token, { expires: new Date(expired) });
        dispatch(setIsAuth(true));
        navigate('/admin');
      } else {
        dispatch(setIsAuth(false));
        toast.error('未預期的錯誤');
      }
    } catch (error) {
      dispatch(setIsAuth(false));
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!authChecked) return <>載入中...</>;

  if (isAuth) return <Navigate to="/admin" />;

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h2>Login</h2>
          <div style={{ width: '500px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex flex-column gap-3 mb-8">
                <label className="form-label" htmlFor="email">
                  帳號
                </label>
                <input
                  type="email"
                  name="username"
                  id="email"
                  className="form-control"
                  placeholder="請輸入帳號"
                  {...register('username')}
                />
                <p className="text-danger">{errors.username?.message}</p>

                <label className="form-label" htmlFor="password">
                  密碼
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="請輸入密碼"
                  {...register('password')}
                />
                {errors.password?.types && (
                  <ul className="list-unstyled d-flex flex-column gap-1">
                    {Object.values(errors.password.types)
                      .flatMap(item => (Array.isArray(item) ? item : [item]))
                      .map((item, idx) => (
                        <li key={idx} className="text-danger">
                          {item}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              <input type="submit" value="登入" className="btn btn-primary w-100 text-white" disabled={isSubmitting} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
