import guestClient from '@/api/clients/guestClient';
import { GUEST_API_PATH } from '@/api/core/constants';
import { addAndRefetchCarts } from '@/slice/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function TestCart() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [resText, setResText] = useState({ state: 0, message: '' });

  const resTextClass = resText.state === 0 ? 'text-secondary' : resText.state === 1 ? 'text-success' : 'text-danger';

  // 初始讀取商品資料
  useEffect(() => {
    async function initFatch() {
      try {
        setResText({ state: 0, message: '讀取商品資訊中...' });
        const response = await guestClient.get(`${GUEST_API_PATH}/products/all`, { preventGlobalLoading: true });
        // console.log(response);
        setProducts(response.products);
        setResText({ state: 1, message: '讀取商品資訊成功' });
      } catch (error) {
        console.log('Error fetching products:', error);
        setResText({ state: 2, message: error });
      }
    }
    initFatch();
  }, [dispatch]);

  async function handleAddCart(id, preventGlobalLoading) {
    try {
      setResText({ state: 0, message: '新增產品中...' });
      const newItem = { product_id: id, qty: 1 };
      const res = await dispatch(addAndRefetchCarts({ data: newItem, preventGlobalLoading })).unwrap();
      // console.log('新增產品成功:', res);
      setResText({ state: 1, message: '新增商品至購物車成功' });
    } catch (error) {
      console.log('Error creating cart item:', error);
      setResText({ state: 2, message: error });
    }
  }

  return (
    <div className="py-6 px-4">
      <h1 className="mb-4">測試頁面：將產品新增至購物車</h1>
      <ul className="list-unstyled">
        {products &&
          products.map((product, index) => (
            <li key={index} className="mb-4">
              <button className="btn btn-primary-500 me-2" onClick={() => handleAddCart(product.id, true)}>
                新增產品「{product.title}」到購物車
              </button>
              <button className="btn btn-outline-primary-400" onClick={() => handleAddCart(product.id, false)}>
                全域 loading
              </button>
            </li>
          ))}
        {products.length === 0 && <li>目前沒有產品可顯示</li>}
      </ul>
      <p className={resTextClass}>{resText.message}</p>
      <p className="fs-sm text-neutral-500 mt-4">👉 點擊 Navbar 購物車按鈕去購物車頁面</p>
    </div>
  );
}

export default TestCart;
