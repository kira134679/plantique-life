import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { resetManualLogout } from '@/slice/guestAuthSlice';
import { openModal } from '@/slice/uiSlice';

const RequireGuestAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, isAuthChecked, isManualLogout } = useSelector(state => state.guestAuth);

  const isManualLogoutRef = useRef(isManualLogout);
  const prevIsAuthRef = useRef(undefined);

  // 監聽 isManualLogout 的變化
  // 須放在下一個 useEffect 之前，讓 isManualLogoutRef 的值先被更新
  // 手動登出時，isManualLogoutRef 的值需先被更新為 true，讓 login modal 不會被開啟
  useEffect(() => {
    isManualLogoutRef.current = isManualLogout;
  }, [isManualLogout]);

  // Navbar 會做驗證，這裡只等待驗證結果
  useEffect(() => {
    if (!isAuthChecked) return;

    if (!isAuth) {
      navigate('/');
      // 只有「已登入狀態下手動登出」才不顯示登入 Modal
      // 若元件重新掛載（例如手動輸入路由），prevIsAuthRef.current 為 undefined，
      // 不符合 wasLoggedIn，仍會顯示 Modal
      const wasLoggedIn = prevIsAuthRef.current === true;
      if (!wasLoggedIn || !isManualLogoutRef.current) {
        toast.error('請先登入');
        dispatch(openModal('login'));
      }
      dispatch(resetManualLogout());
    }

    prevIsAuthRef.current = isAuth;
  }, [isAuth, isAuthChecked, dispatch, navigate]);

  // 避免非同步的時間差，導致非預期的渲染結果
  if (!isAuthChecked) return null;

  // 驗證結束，沒登入
  if (!isAuth) return null;

  // 驗證結束，有登入
  return <Outlet />;
};

export default RequireGuestAuth;
