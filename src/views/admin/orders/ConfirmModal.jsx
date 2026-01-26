import Button from '@/components/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ show, message, onAccept, onClose }) {
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title as="h5">警告</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex gap-2">
        <span className="material-symbols-rounded text-warning">warning</span>
        <span>{message}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-neutral" shape="square" size="sm" onClick={onClose}>
          取消
        </Button>
        <Button variant="outline-danger" shape="square" size="sm" onClick={onAccept}>
          確認
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
