import { fetchProducts } from '@/slice/productSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import Modal from 'react-bootstrap/Modal';
import Button from '../../../components/Button';

import StatusDropdown from './components/StatusDropdown';

function Products() {
  // Redux
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);

  // Modal 資料控制
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
  }, [dispatch]);

  return (
    <>
      <div className="py-13">
        <h2 className="h3 mb-4">產品概覽</h2>
        <Button
          as={Link}
          to="/admin/products/edit"
          variant="filled-primary"
          shape="pill"
          size="sm"
          rightIcon={true}
          iconName="add"
          className="ms-auto w-fit"
        >
          新增商品
        </Button>
        {/* 商品列表 */}
        <section className="table-responsive py-10">
          <table className="table align-middle">
            {/* 表頭 */}
            <thead>
              <tr>
                <th scope="col" className="text-neutral-400 fw-medium">
                  名稱
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  價格
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  類別
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  狀態
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  操作
                </th>
              </tr>
            </thead>
            {/* 表格內容*/}
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="row g-0 align-items-center">
                      <div className="col-4">
                        <div className="me-4">
                          <div className="ratio ratio-1x1">
                            <img className="object-fit-cover" src={product.imageUrl} alt={product.title} />
                          </div>
                        </div>
                      </div>
                      <div className="col-8">
                        <h4 className="h6 mb-2">{product.title}</h4>
                        <p className="fs-sm text-neutral-400 text-truncate">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="fs-7 text-primary-700 noto-serif-tc fw-bold">
                    {product.price === product.origin_price ? (
                      `NT$${product.price.toLocaleString()}`
                    ) : (
                      <>
                        NT${product.price.toLocaleString()}
                        <del className="ms-2 text-neutral-400 fs-sm">{product.origin_price.toLocaleString()}</del>
                      </>
                    )}
                  </td>
                  <td className="col-2">
                    <span className="px-3 py-1 text-primary bg-primary-100 text-nowrap">{product.category}</span>
                  </td>
                  <td>
                    <div>
                      <StatusDropdown isEnabled={product.is_enabled} />
                    </div>
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/products/edit/${product.id}`}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
