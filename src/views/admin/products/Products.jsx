import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { deleteProduct, fetchProducts } from '@/slice/product/adminProductSlice';

import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import ProductRow from './components/ProductRow';

function Products() {
  // --- Redux Hooks ---
  const dispatch = useDispatch();
  const {
    products,
    pagination: { current_page, total_pages },
  } = useSelector(state => state.product);

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
      toast.success('商品刪除成功！');
      if (current_page === 1 && products.length === 1) {
        dispatch(fetchProducts());
      } else if (products.length === 1) {
        dispatch(fetchProducts({ page: current_page - 1 }));
      } else {
        dispatch(fetchProducts({ page: current_page }));
      }
    } catch {
      toast.error('商品刪除失敗！');
    } finally {
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setModalShow(false);
    setDeleteId(null);
  };

  const handlePageChange = targetPage => {
    dispatch(fetchProducts({ page: targetPage }));
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
          <p className="text-end text-neutral-400 mb-8">每頁顯示 10 列，總共 {total_pages} 頁</p>
          <Pagination
            currentPage={current_page}
            totalPages={total_pages}
            onPageChange={handlePageChange}
            className="justify-content-end"
          />
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
