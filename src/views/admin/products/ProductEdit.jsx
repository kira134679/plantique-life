import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';

import { fetchAllProducts, updateProduct } from '@/slice/product/adminProductSlice';
import { formatToForm } from './helpers';

import Button from '@/components/Button';
import ProductForm from './components/ProductForm';

function ProductEdit() {
  // --- Router ---
  const { id } = useParams();
  const navigate = useNavigate();

  // --- Local State ---
  const [isFetching, setIsFetching] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [fetchingError, setFetchingError] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  // --- Redux Hooks ---
  const dispatch = useDispatch();

  // --- Event Handlers (For Child Component) ---
  const handleFormSubmit = useCallback(
    async formData => {
      try {
        await dispatch(updateProduct({ id, data: formData })).unwrap();
        toast.success('商品更新成功！');
        navigate('/admin/products'); // 跳轉回商品一覽頁
      } catch (error) {
        toast.error(`商品更新失敗！錯誤說明：${error}`);
      }
    },
    [id, navigate, dispatch],
  );

  // --- Side Effects ---
  // 元件 mount 與網址 id 改變時，從後端取得商品資料，更新表單初始值
  useEffect(() => {
    setInitialData(null);
    setIsNotFound(false);
    setFetchingError(null);

    // 因後端未明確定義 id 的生成規則，為避免誤判，這裡暫不做 id 格式驗證

    const fetchInitialData = async () => {
      try {
        setIsFetching(true);
        const response = await dispatch(fetchAllProducts()).unwrap();
        const targetProduct = response.products[id];
        if (targetProduct) {
          setInitialData(formatToForm(targetProduct));
        } else {
          setIsNotFound(true); // 從後端成功取得所有商品，但所有商品的資料庫裡沒有這個商品
        }
      } catch (error) {
        setFetchingError(error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchInitialData();
  }, [id, dispatch]);

  // --- View State Logic ---
  const isError = !!fetchingError;
  const isLoading = isFetching && !isError;
  const isReady = !isError && !isLoading; // 已向後端發出取得所有商品請求，並獲得回覆(不論成功或失敗)
  const showForm = isReady && !isNotFound && !!initialData;

  return (
    <div className="py-13">
      <h2 className="h3 mb-8">更新商品</h2>
      {isError && (
        <div className="py-8 d-flex flex-column gap-4 align-items-center">
          <span className="material-symbols-rounded d-block fs-1 text-danger">cancel</span>
          <h3 className="h5 text-neutral-400">取得商品資料錯誤</h3>
          <p className="text-neutral-400">錯誤說明：{fetchingError}</p>
          <Button as={Link} to="/admin/products" variant="filled-primary" shape="pill" size="sm">
            回到商品一覽
          </Button>
        </div>
      )}
      {isNotFound && (
        <div className="py-8 d-flex flex-column gap-4 align-items-center">
          <span className="material-symbols-rounded d-block fs-1 text-danger">cancel</span>
          <h3 className="h5 text-neutral-400">找不到此商品</h3>
          <p className="text-neutral-400">錯誤說明：此商品可能已被刪除或 ID 不正確</p>
          <Button as={Link} to="/admin/products" variant="filled-primary" shape="pill" size="sm">
            回到商品一覽
          </Button>
        </div>
      )}
      {showForm && (
        <ProductForm isEditMode={true} onSubmit={handleFormSubmit} initialData={initialData} productId={id} />
      )}
    </div>
  );
}

export default ProductEdit;
