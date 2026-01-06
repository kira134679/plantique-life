import productImg1 from 'assets/images/products/img_product_01.png';
import productImg2 from 'assets/images/products/img_product_02.png';

import { useState } from 'react';
import { Link } from 'react-router';

import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../components/Button';

function Products() {
  // Modal 資料控制
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="container py-13">
        <h2 className="h3 mb-4">產品概覽</h2>
        <Button
          as={Link}
          to="/backstage/products/edit"
          variant="filled-primary"
          shape="pill"
          size="sm"
          rightIcon={true}
          iconName="add"
          className="ms-auto w-fit"
        >
          新增商品
        </Button>
        <section className="py-10">
          {/* 商品列表表頭 */}
          <ul className="row list-unstyled py-4 border-bottom mb-4 text-neutral-400">
            <li className="col-4">名稱</li>
            <li className="col-2">價格</li>
            <li className="col-2">類別</li>
            <li className="col-4">狀態</li>
          </ul>
          {/* 商品列表*/}
          {/* 商品 1 */}
          <ul className="row list-unstyled align-items-center mb-4">
            <li className="col-4">
              <div className="row g-0 align-items-center">
                <div className="col-4">
                  <div className="me-4">
                    <div className="ratio ratio-1x1">
                      <img className="object-fit-cover" src={productImg1} alt="productImg1" />
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <h4 className="h6 mb-2">泡泡森林</h4>
                  <p className="fs-sm text-neutral-400 text-truncate">-L9tH8jxVb2Ka_ DYPwng</p>
                </div>
              </div>
            </li>
            <li className="col-2 fs-7 text-primary-700 noto-serif-tc fw-bold">NT$2400</li>
            <li className="col-2">
              <span className="px-3 py-1 text-primary bg-primary-100">組盆</span>
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
                to="/backstage/products/edit/-L9tH8jxVb2Ka_DYPwng"
                variant="outline-neutral"
                shape="circle"
                size="sm"
                className="me-2"
              >
                <span className="custom-btn-icon material-symbols-rounded">edit</span>
              </Button>
              <Button type="button" variant="outline-danger" shape="circle" size="sm" onClick={handleShow}>
                <span className="custom-btn-icon material-symbols-rounded">delete</span>
              </Button>
            </li>
          </ul>
          {/* 商品 2 */}
          <ul className="row list-unstyled align-items-center mb-4">
            <li className="col-4">
              <div className="row g-0 align-items-center">
                <div className="col-4">
                  <div className="me-4">
                    <div className="ratio ratio-1x1">
                      <img className="object-fit-cover" src={productImg2} alt="productImg2" />
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <h4 className="h6 mb-2">向陽而生</h4>
                  <p className="fs-sm text-neutral-400 text-truncate">-Oh5ZDdgEvRErn5csfA2</p>
                </div>
              </div>
            </li>
            <li className="col-2 fs-7 text-primary-700 noto-serif-tc fw-bold">NT$2400</li>
            <li className="col-2">
              <span className="px-3 py-1 text-primary bg-primary-100">單品</span>
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
                to="/backstage/products/edit/-Oh5ZDdgEvRErn5csfA2"
                variant="outline-neutral"
                shape="circle"
                size="sm"
                className="me-2"
              >
                <span className="custom-btn-icon material-symbols-rounded">edit</span>
              </Button>
              <Button type="button" variant="outline-danger" shape="circle" size="sm" onClick={handleShow}>
                <span className="custom-btn-icon material-symbols-rounded">delete</span>
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
      <Modal show={show} onHide={handleClose} className="square-modal" size="sm" centered>
        <Modal.Header closeButton className="border-bottom-0 p-6">
          <Modal.Title className="h5 text-primary">刪除商品</Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-6 py-2">
          <p className="text-center">確定要將商品刪除嗎？</p>
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

export default Products;
