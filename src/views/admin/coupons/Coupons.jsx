import { useState } from 'react';
import { Link } from 'react-router';

import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../components/Button';

function Coupons() {
  // Modal 資料控制
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="py-13">
        <h2 className="h3 mb-4">優惠券管理</h2>
        <Button
          as={Link}
          to="/admin/coupons/edit"
          variant="filled-primary"
          shape="pill"
          size="sm"
          rightIcon={true}
          iconName="add"
          className="ms-auto w-fit"
        >
          新增優惠券
        </Button>
        <section className="py-10">
          {/* 優惠券列表表頭 */}
          <ul className="row list-unstyled py-4 border-bottom mb-4 text-neutral-400">
            <li className="col-3">名稱</li>
            <li className="col-2">折扣</li>
            <li className="col-3">結束時間</li>
            <li className="col-4">狀態</li>
          </ul>
          {/* 優惠券列表*/}
          {/* 優惠券 1 */}
          <ul className="row list-unstyled align-items-center mb-4 py-4 border-bottom border-1">
            <li className="col-3">
              <h4 className="fs-7 mb-2 p-1 bg-primary-100 d-inline-block">首購優惠 10 % OFF</h4>
              <p className="fs-sm text-neutral-400 text-truncate">plantique10</p>
            </li>
            <li className="col-2 fs-6 text-primary-700 noto-serif-tc fw-bold">10 %</li>
            <li className="col-3">
              <p>2026/01/01 00:00:00</p>
            </li>
            <li className="col-2">
              <div>
                <Dropdown className="checkout-dropdown">
                  <Dropdown.Toggle
                    className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                    id="product-status"
                  >
                    啟用
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item href="#">啟用</Dropdown.Item>
                    <Dropdown.Item href="#">停用</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
            <li className="col-2">
              <Button
                as={Link}
                to="/admin/coupons/edit/plantique10"
                variant="outline-neutral"
                shape="circle"
                size="sm"
                iconName="edit"
                className="me-2"
              >
                <span className="material-symbols-rounded d-block">edit</span>
              </Button>
              <Button
                type="button"
                variant="outline-danger"
                shape="circle"
                size="sm"
                iconName="edit"
                onClick={handleShow}
              >
                <span className="material-symbols-rounded d-block">delete</span>
              </Button>
            </li>
          </ul>
          {/* 優惠券 2 */}
          <ul className="row list-unstyled align-items-center mb-4 py-4 border-bottom border-1">
            <li className="col-3">
              <h4 className="fs-7 mb-2 p-1 bg-primary-100 d-inline-block">週年優惠 20 % OFF</h4>
              <p className="fs-sm text-neutral-400 text-truncate">anniv2026</p>
            </li>
            <li className="col-2 fs-6 text-primary-700 noto-serif-tc fw-bold">20 %</li>
            <li className="col-3">
              <p>2026/01/01 00:00:00</p>
            </li>
            <li className="col-2">
              <div>
                <Dropdown className="checkout-dropdown">
                  <Dropdown.Toggle
                    className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                    id="product-status"
                  >
                    啟用
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item href="#">啟用</Dropdown.Item>
                    <Dropdown.Item href="#">停用</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
            <li className="col-2">
              <Button
                as={Link}
                to="/admin/coupons/edit/anniv2026"
                variant="outline-neutral"
                shape="circle"
                size="sm"
                iconName="edit"
                className="me-2"
              >
                <span className="material-symbols-rounded d-block">edit</span>
              </Button>
              <Button
                type="button"
                variant="outline-danger"
                shape="circle"
                size="sm"
                iconName="edit"
                onClick={handleShow}
              >
                <span className="material-symbols-rounded d-block">delete</span>
              </Button>
            </li>
          </ul>
        </section>
        {/* 頁碼 */}
        <div className="pb-10">
          <p className="text-end text-neutral-400 mb-8">每頁顯示 10 列，總共 15 列</p>
          <nav aria-label="Page">
            <ul className="pagination justify-content-end">
              <li className="page-item me-4">
                <a className="page-link p-0 border-0 rounded-circle">
                  <span className="material-symbols-rounded p-2 text-neutral-700"> chevron_left </span>
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-white bg-primary" href="#">
                  1
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-neutral-700" href="#">
                  2
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-neutral-700" href="#">
                  3
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-neutral-700" href="#">
                  ...
                </a>
              </li>
              <li className="page-item me-4">
                <a className="page-link border-0 rounded-circle fs-7 w-40 text-center text-neutral-700" href="#">
                  20
                </a>
              </li>
              <li className="page-item">
                <a className="page-link p-0 border-0 rounded-circle text-neutral-700" href="#">
                  <span className="material-symbols-rounded p-2"> chevron_right </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} contentClassName="rounded-0" size="sm" centered>
        <Modal.Header closeButton className="border-bottom-0 p-6">
          <Modal.Title className="h5 text-primary">刪除優惠券</Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-6 py-1">
          <p className="text-center">確定要將優惠券刪除嗎？</p>
        </Modal.Body>

        <Modal.Footer className="border-top-0 justify-content-center gap-3 p-6">
          <Button
            type="button"
            variant="filled-primary"
            size="sm"
            shape="square"
            className="bg-neutral-400 m-0"
            onClick={handleClose}
          >
            取消
          </Button>
          <Button type="button" variant="filled-primary" size="sm" shape="square" className="m-0" onClick={handleClose}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Coupons;
