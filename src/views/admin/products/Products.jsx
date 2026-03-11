import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router';

import { deleteProduct, fetchProducts } from '@/slice/product/adminProductSlice';

import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import ProductRow from './components/ProductRow';

function filterValidParams(params) {
  const validKeys = ['page'];
  const paramsEntries = Array.from(params.entries());
  const cleanEntries = paramsEntries.filter(
    ([key, value]) => validKeys.includes(key) && value !== null && value !== '',
  );
  return new URLSearchParams(cleanEntries);
}

function getPageValidationError(pageStr, total_pages) {
  const pageNum = Number(pageStr);
  if (!Number.isInteger(pageNum) || pageNum <= 0) {
    return '網址頁碼不符合格式';
  } else if (total_pages && pageNum > total_pages) {
    return '網址頁碼超過總頁數';
  }
  return null;
}

function Products() {
  // --- Redux Hooks ---
  const dispatch = useDispatch();
  const {
    products,
    pagination: { current_page, total_pages },
    errors: { fetch: fetchingError },
  } = useSelector(state => state.adminProduct);

  // --- Router ---
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Local State ---
  const [deleteId, setDeleteId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [pageError, setPageError] = useState(null);

  // --- Event Handlers ---
  const openDeleteModal = useCallback(id => {
    setModalShow(true);
    setDeleteId(id);
  }, []);

  const handleDeleteModalConfirm = async () => {
    setModalShow(false);
    try {
      await dispatch(deleteProduct(deleteId)).unwrap();
      toast.success('商品刪除成功！');
      if (current_page === 1 && products.length === 1 && searchParams.size === 0) {
        dispatch(fetchProducts());
      } else if (current_page === 1 && products.length === 1) {
        setSearchParams({}, { replace: true });
      } else if (products.length === 1) {
        setSearchParams({ page: current_page - 1 }, { replace: true });
      } else {
        dispatch(fetchProducts({ page: current_page }));
      }
    } catch {
      toast.error('商品刪除失敗！');
    } finally {
      setDeleteId(null);
    }
  };

  const handleDeleteModalCancel = () => {
    setModalShow(false);
    setDeleteId(null);
  };

  const handlePageChange = targetPage => {
    setSearchParams({ page: targetPage });
  };

  // --- Side Effects ---
  // 當 searchParams 有變更時，發送 API 請求，取得商品列表
  useEffect(() => {
    setPageError(null);

    // 無 searchParams 時，不須驗證，直接請求第一頁資料
    if (searchParams.size === 0) {
      dispatch(fetchProducts());
      return;
    }

    // API 回傳的商品列表為空時，強制清空 searchParams，觸發下一次 useEffect
    if (total_pages === 0) {
      setSearchParams({}, { replace: true });
      return;
    }

    // 確認 searchParams 是否包含無效 Key
    // 若包含，則替換為清洗後的 searchParams，觸發下一次 useEffect
    const cleanParams = filterValidParams(searchParams);
    if (searchParams.toString() !== cleanParams.toString()) {
      setSearchParams(cleanParams, { replace: true });
      return;
    }

    // 確認 searchParams 的 page 值是否符合格式
    // 不符合即寫入 pageError state，符合則請求對應頁資料
    const page = searchParams.get('page');
    const pageError = page ? getPageValidationError(page, total_pages) : null;
    setPageError(pageError);
    if (!pageError) {
      dispatch(fetchProducts({ page }));
      return;
    }
  }, [searchParams, total_pages, dispatch, setSearchParams]);

  // --- View State Logic ---
  const isInvalidUrl = !!pageError;
  const isFetchingError = !!fetchingError;
  const isNormalProducts = !isFetchingError && !isInvalidUrl && total_pages > 0;
  const hasNoProducts = !isFetchingError && !isInvalidUrl && total_pages === 0;

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
              {isInvalidUrl && (
                <tr>
                  <td colSpan="5" className="border-0 py-6 text-center">
                    <div className="py-8 d-flex flex-column gap-4 align-items-center">
                      <span className="material-symbols-rounded d-block fs-1 text-danger">cancel</span>
                      <h3 className="h5 text-neutral-400">網址錯誤</h3>
                      <p className="text-neutral-400">錯誤說明：{pageError}</p>
                      <Button
                        as="button"
                        type="button"
                        variant="filled-primary"
                        shape="pill"
                        size="sm"
                        onClick={() => setSearchParams({}, { replace: true })}
                      >
                        回第一頁
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
              {isFetchingError && (
                <tr>
                  <td colSpan="5" className="border-0 py-6 text-center">
                    <div className="py-8 d-flex flex-column gap-4 align-items-center">
                      <span className="material-symbols-rounded d-block fs-1 text-danger">cancel</span>
                      <h3 className="h5 text-neutral-400">取得商品列表錯誤</h3>
                      <p className="text-neutral-400">錯誤說明：{fetchingError}</p>
                    </div>
                  </td>
                </tr>
              )}
              {hasNoProducts && (
                <tr>
                  <td colSpan="5" className="border-0 py-6 text-center">
                    <div className="py-8">
                      <img
                        src="https://storage.googleapis.com/vue-course-api.appspot.com/plantique-life/1769535353095.png"
                        alt="目前沒有商品"
                        className="mb-6 no-product-placeholder object-fit-cover"
                      />
                      <h3 className="h5 text-neutral-400">目前沒有商品</h3>
                    </div>
                  </td>
                </tr>
              )}
              {isNormalProducts &&
                products.map(product => (
                  <ProductRow key={product.id} product={product} openDeleteModal={openDeleteModal} />
                ))}
            </tbody>
          </table>
        </section>
        {/* 頁碼 */}
        {!!total_pages && total_pages > 0 && (
          <div className="pb-10">
            <p className="text-end text-neutral-400 mb-8">每頁顯示 10 列，總共 {total_pages} 頁</p>
            <Pagination
              currentPage={current_page}
              totalPages={total_pages}
              onPageChange={handlePageChange}
              className="justify-content-end"
            />
          </div>
        )}
      </div>
      {/* Modal */}
      <Modal show={modalShow} onHide={handleDeleteModalCancel} contentClassName="rounded-0" size="sm" centered>
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
            onClick={handleDeleteModalCancel}
          >
            取消
          </Button>
          <Button
            type="button"
            variant="filled-primary"
            size="sm"
            shape="square"
            className="m-0"
            onClick={handleDeleteModalConfirm}
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Products;
