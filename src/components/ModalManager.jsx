import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, openModal } from '@/slice/uiSlice';

// 引入 Modal
import Login from '@/components/modals/Login';
import Register from '@/components/modals/Register';

const ModalManager = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector(state => state.ui.activeModal);
  const isOpen = activeModal === 'login' || activeModal === 'register';

  // 統一關閉函式
  const handleClose = () => dispatch(closeModal());

  // 根據 activeModal 的字串，決定 Render 誰
  return (
    <Modal show={isOpen} onHide={handleClose} centered className="auth-modal">
      {activeModal === 'login' && (
        <Login onClose={handleClose} onSwitchToRegister={() => dispatch(openModal('register'))} />
      )}
      {activeModal === 'register' && (
        <Register onClose={handleClose} onSwitchToLogin={() => dispatch(openModal('login'))} />
      )}
    </Modal>
  );
};

export default ModalManager;
