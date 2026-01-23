import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { deleteProduct, fetchProducts } from '@/slice/product/adminProductSlice';

import Button from '@/components/Button';
import ProductRow from './components/ProductRow';

function Products() {
  // --- Redux Hooks ---
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);

  // --- Local State ---
  const [deleteId, setDeleteId] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  // --- Event Handlers ---
  const openDeleteModal = useCallback(
    id => {
      setModalShow(true);
      setDeleteId(id);
    },
    [setModalShow, setDeleteId],
  );

  const handleDeleteConfirm = async () => {
    setModalShow(false);
    try {
      await dispatch(deleteProduct(deleteId)).unwrap();
      await dispatch(fetchProducts({ page: 1 })).unwrap();
    } catch {
      // handle error
    } finally {
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setModalShow(false);
    setDeleteId(null);
  };

  // --- Side Effects ---
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
                <ProductRow key={product.id} product={product} openDeleteModal={openDeleteModal} />
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
      <Modal show={modalShow} onHide={handleDeleteCancel} contentClassName="rounded-0" size="sm" centered>
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
            onClick={handleDeleteCancel}
          >
            取消
          </Button>
          <Button
            type="button"
            variant="filled-primary"
            size="sm"
            shape="square"
            className="m-0"
            onClick={handleDeleteConfirm}
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Products;
