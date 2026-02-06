import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router';

import Button from '../../components/Button';
import Pagination from '../../components/Pagination';

import { guestOrderApi } from '../../api';

function OrderList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 訂單資料，初始為 null，表示還沒有取得訂單資料
  const [orders, setOrders] = useState(null);
  const [pagination, setPagination] = useState({});

  const skipNextFetchRef = useRef(false);

  // 取得訂單資料
  const fetchOrders = useCallback(
    async (page = 1) => {
      try {
        const response = await guestOrderApi.fetchOrders(page);
        setOrders(response.orders);
        setPagination(response.pagination);
        // 後端 API 有控制 page 參數，如果超過總頁數，會回傳最後一頁的頁數
        // 如果有收到不同的 current_page，則更新 URL 的 page 參數
        const resCurrentPage = response.pagination?.current_page;
        if (page !== resCurrentPage && resCurrentPage > 0) {
          // 修改 searchParams 會造成 useEffect 重新執行，導致重複呼叫 API (fetchOrders)
          // 設定 skipNextFetchRef.current 為 true，跳過下一次的 useEffect
          skipNextFetchRef.current = true;
          // 用回傳的 current_page 更新 URL 的 page 參數
          setSearchParams(
            prev => {
              const next = new URLSearchParams(prev);
              next.set('page', resCurrentPage.toString());
              return next;
            },
            { replace: true },
          );
        }
      } catch (error) {
        toast.error(error);
      }
    },
    [setSearchParams],
  );

  // 處理分頁按鈕點擊事件
  // 更新 URL 的 page 參數去觸發 useEffect，不直接使用 fetchOrders
  const handlePageChange = page => setSearchParams({ page });

  // 依 URL 的 page 參數取得訂單資料
  useEffect(() => {
    // 如果 skipNextFetchRef.current 為 true，則跳過 useEffect 執行
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }

    // searchParams.keys() 回傳 iterator 物件，使用 ... 展開成陣列，再使用 some 找出是否有非 page 的參數
    const hasNonPageParam = [...searchParams.keys()].some(key => key !== 'page');
    // 如果有非 page 的參數，僅保留 page 參數
    if (hasNonPageParam) {
      setSearchParams(
        prev => {
          const page = prev.get('page');
          return page ? { page } : {};
        },
        { replace: true },
      );
      return; // 直接 return，觸發下一次 useEffect
    }

    // 取得 page 參數
    const currentPage = searchParams.get('page');

    // 如果 page 參數不存在，則取得第一頁的訂單資料
    if (currentPage === null) {
      (async () => await fetchOrders(1))();
      return;
    }

    // 將 page 參數轉換為數字
    const pageNum = Number(currentPage);

    // 如果 pageNum 不是數值，或不是整數，或小於 1，則清除 page 參數
    if (Number.isNaN(pageNum) || !Number.isInteger(pageNum) || pageNum < 1) {
      setSearchParams({}, { replace: true });
      return; // 直接 return，觸發下一次 useEffect
    }

    // 依 pageNum 呼叫 API 取得訂單資料
    (async () => await fetchOrders(pageNum))();
  }, [searchParams, fetchOrders, setSearchParams]);

  return (
    <div className="py-8 py-lg-0">
      {orders &&
        orders.map(order => (
          <div key={order.id} className="border-bottom py-6 px-3 py-lg-10 px-lg-6">
            <h3 className="fs-7 fs-lg-5">
              訂單編號：<span className="fs-8 fs-lg-5">{order.id}</span>
            </h3>
            <div className="d-flex flex-column flex-lg-row justify-content-lg-between mt-5 mt-lg-6">
              <div>
                <p className="text-neutral-400 mb-3 mb-lg-4 fs-sm fs-lg-8">
                  付款狀態：
                  <span
                    className={clsx(
                      'fs-xs fs-lg-sm px-3 py-1 ms-1',
                      order.is_paid ? 'bg-primary-100 text-primary' : 'bg-secondary-100 text-secondary',
                    )}
                  >
                    {order.is_paid ? '已付款' : '未付款'}
                  </span>
                </p>
                <p className="text-neutral-400 fs-sm fs-lg-8 mb-3 mb-lg-4">
                  總額：
                  <span className="noto-serif-tc fw-bold text-primary-700 ms-1">NT${order.total.toLocaleString()}</span>
                </p>
                <p className="text-neutral-400 fs-sm fs-lg-8">
                  付款方式：<span className="ms-1">{order.user.payment}</span>
                </p>
              </div>
              <div className="order-list-btn-container w-100 mt-5 mt-lg-0">
                <Button
                  as={Link}
                  to={`/member/orders/${order.id}`}
                  state={{ order }}
                  type="button"
                  variant="filled-primary"
                  shape="pill"
                  size="lg"
                  className="w-100"
                >
                  訂單明細
                </Button>
              </div>
            </div>
          </div>
        ))}
      {orders && orders.length === 0 && (
        <div className="text-center py-10">
          <h2 className="fs-7 noto-sans-tc text-neutral-400 text-center">尚無訂單資訊</h2>
          <Button
            as={Link}
            to="/products"
            type="button"
            variant="filled-primary"
            shape="pill"
            size="lg"
            className="mt-13"
          >
            前往選購商品
          </Button>
        </div>
      )}
      <Pagination
        currentPage={pagination.current_page || 0}
        totalPages={pagination.total_pages || 0}
        className="justify-content-end my-6 my-lg-10"
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default OrderList;
