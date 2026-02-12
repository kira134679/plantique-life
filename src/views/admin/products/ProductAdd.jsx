import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { createProduct } from '@/slice/product/adminProductSlice';

import ProductForm from './components/ProductForm';

function ProductAdd() {
  // --- Router ---
  const navigate = useNavigate();

  // --- Redux Hooks ---
  const dispatch = useDispatch();

  // --- Event Handlers (For Child Component) ---
  const handleFormSubmit = useCallback(
    async formData => {
      try {
        await dispatch(createProduct(formData)).unwrap();
        toast.success('商品新增成功！');
        navigate('/admin/products'); // 跳轉回商品一覽頁
      } catch (error) {
        toast.error(`商品新增失敗！錯誤說明：${error}`);
      }
    },
    [dispatch, navigate],
  );

  return (
    <div className="py-13">
      <h2 className="h3 mb-8">新增商品</h2>
      <ProductForm isEdit={false} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default ProductAdd;
