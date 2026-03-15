import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openModal } from '@/slice/uiSlice';

export function usePendingAuthAction() {
  const dispatch = useDispatch();

  const { isAuth } = useSelector(state => state.guestAuth);
  const activeModal = useSelector(state => state.ui.activeModal);

  const pendingCallback = useRef(null);

  useEffect(() => {
    // 登入成功且 Modal 關閉後（Login 所有非同步工作完成），執行待辦的 callback
    if (!activeModal && isAuth && pendingCallback.current) {
      const callback = pendingCallback.current;
      pendingCallback.current = null;
      callback();
      // Modal 關閉但未登入（使用者主動關閉 Modal），清除待辦的 callback
    } else if (!activeModal && !isAuth) {
      pendingCallback.current = null;
    }
  }, [isAuth, activeModal]);

  const requireAuth = callback => {
    if (isAuth) {
      callback();
    } else {
      pendingCallback.current = callback;
      dispatch(openModal('login'));
    }
  };

  return { requireAuth };
}
