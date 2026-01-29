import { checkAuth } from '@/slice/authSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

export default function RequireAuth() {
  const { isAuth, authChecked } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!authChecked) return null; // 避免非同步的時間差，導致非預期的渲染結果

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
