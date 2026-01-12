import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { checkAuth } from '../slice/authSlice';

export default function RequireAuth() {
  const { isAuth, authChecked } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!authChecked) return <>載入中...</>;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
