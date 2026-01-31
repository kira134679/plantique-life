import { adminOrderApi } from '@/api';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import { timestampToDate } from '@/utils/utils';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router';
import ConfirmModal from './ConfirmModal';
import OrderDatePicker from './OrderDatePicker';
import OrderDetailOffcanvas from './OrderDetailOffcanvas';

const orderTabs = ['全部訂單', '未付款', '已付款'];

function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const skipNextFetchRef = useRef(false);

  // 訂單詳情側邊欄
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderDetailShow, setOrderDetailShow] = useState(false);

  // 日期區間選擇
  const [dateRange, setDateRange] = useState([null, null]);

  // 訂單列表
  const [orders, setOrders] = useState(null);
  const [pagination, setPagination] = useState({});

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('');
  const confirmModalResolveRef = useRef(null);

  // 確認 Modal，回傳 Promise，讓呼叫者可以等待結果
  const openConfirmModal = message => {
    return new Promise(resolve => {
      // 將 resolve 函數存儲到 ref 中
      confirmModalResolveRef.current = resolve;
      setConfirmModalMessage(message);
      setShowConfirmModal(true);
    });
  };
  // Modal 確認按鈕點擊事件
  const handleConfirmModalAccept = () => {
    if (confirmModalResolveRef.current) {
      // 調用 resolve(true)，完成 Promise 並返回 true
      confirmModalResolveRef.current(true);
      confirmModalResolveRef.current = null;
    }
    setShowConfirmModal(false);
    setConfirmModalMessage('');
  };
  // Modal 取消按鈕點擊事件
  const handleConfirmModalClose = () => {
    if (confirmModalResolveRef.current) {
      // 調用 resolve(false)，完成 Promise 並返回 false
      confirmModalResolveRef.current(false);
      confirmModalResolveRef.current = null;
    }
    setShowConfirmModal(false);
    setConfirmModalMessage('');
  };

  const fetchOrders = useCallback(
    async (page = 1) => {
      try {
        const response = await adminOrderApi.fetchOrders(page);
        setOrders(response.orders);
        setPagination(response.pagination);

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

  const handleDeleteOrder = async orderId => {
    try {
      await adminOrderApi.deleteOrder(orderId);
      toast.success(`訂單 ${orderId} 已刪除`);
      await fetchOrders(pagination.current_page);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteOrders = async () => {
    // 調用 confirmModal，Promise 會在這裡「暫停」，等待用戶操作
    const result = await openConfirmModal('確定要刪除所有訂單嗎？');
    if (!result) {
      return;
    }
    // 確認後，刪除所有訂單
    try {
      await adminOrderApi.deleteOrders();
      toast.success('所有訂單已刪除');
      await fetchOrders(1);
    } catch (error) {
      toast.error(error);
    }
  };

  // 處理分頁按鈕點擊事件
  // 更新 URL 的 page 參數去觸發 useEffect，不直接使用 fetchOrders
  const handlePageChange = page => setSearchParams({ page });

  // 初始化時取得訂單列表
  useEffect(() => {
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
    <div className="d-flex flex-column admin-orders-container">
      <div className="flex-grow-1">
        <h2 className="mb-8">訂單列表</h2>
        <ul className="list-unstyled d-flex mb-3">
          {orderTabs.map((tab, idx) => (
            <li key={idx} className="me-2">
              <Button type="button" variant="tag" data-filter={tab}>
                {tab}
              </Button>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center mb-8">
          <div className="me-2">
            <label htmlFor="searchOrderInput" className="form-label d-none">
              訂單編號 / 姓名 / Email
            </label>
            <input type="text" className="form-control" id="searchOrderInput" placeholder="訂單編號 / 姓名 / Email" />
          </div>
          <OrderDatePicker id="searchOrderDate" selectsRange={true} date={dateRange} setDate={setDateRange} />
          <Button type="button" variant="outline-neutral" shape="circle" size="sm" className="border-0 ms-1">
            <span className="custom-btn-icon material-symbols-rounded">search</span>
          </Button>
          <Button
            type="button"
            variant="outline-danger"
            className="ms-auto"
            disabled={!orders?.length}
            onClick={handleDeleteOrders}
          >
            刪除全部訂單
          </Button>
        </div>
        <div className="table-responsive">
          <table className="table align-middle text-nowrap">
            <thead>
              <tr>
                <th scope="col" className="text-neutral-400 fw-medium">
                  訂單編號
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  姓名
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  Email
                </th>
                <th scope="col" className="text-neutral-400 fw-medium text-end">
                  訂單金額
                </th>
                <th scope="col" className="text-neutral-400 fw-medium text-center">
                  付款狀態
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  下單日期
                </th>
                <th scope="col" className="text-neutral-400 fw-medium text-center">
                  操作按鈕
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map(order => (
                  <tr key={order.id} className="fs-sm">
                    <td>{order.id}</td>
                    <td>{order.user.purchaserName}</td>
                    <td>{order.user.purchaserEmail}</td>
                    <td className="text-end">{`NT$${order.total.toLocaleString()}`}</td>
                    <td className="text-center">
                      {
                        <span
                          className={clsx(
                            'fs-xs fs-lg-sm px-2 px-lg-3 py-1',
                            order.is_paid ? 'text-primary bg-primary-100' : 'text-danger bg-danger-100',
                          )}
                        >
                          {order.is_paid ? '已付款' : '未付款'}
                        </span>
                      }
                    </td>
                    <td>{timestampToDate(order.create_at)}</td>
                    <td className="d-flex justify-content-center gap-2 py-5">
                      <Button
                        type="button"
                        variant="outline-neutral"
                        shape="circle"
                        size="sm"
                        onClick={() => {
                          setOrderDetail(order);
                          setOrderDetailShow(true);
                        }}
                      >
                        <span className="custom-btn-icon material-symbols-rounded">visibility</span>
                      </Button>
                      <Dropdown className="admin-orders-delete-dropdown">
                        <Dropdown.Toggle variant="" className="custom-btn-outline-danger custom-btn-circle-sm">
                          <span className="custom-btn-icon material-symbols-rounded">delete</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end" className="border-danger-100 gap-2 border-2 shadow-sm p-3">
                          <Dropdown.Item as={Button} bsPrefix="custom-btn-outline-neutral">
                            取消
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Button}
                            bsPrefix="custom-btn-outline-danger"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            確認刪除
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              {orders === null && (
                <tr>
                  <td colSpan="7" className="text-center">
                    <div className="text-neutral-500 py-15">載入中...</div>
                  </td>
                </tr>
              )}
              {orders && orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    <div className="text-neutral-500 py-15">目前沒有訂單資料</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={pagination.current_page || 0}
        totalPages={pagination.total_pages || 0}
        onPageChange={handlePageChange}
        className="justify-content-end mb-6"
      />
      {orderDetail && (
        <OrderDetailOffcanvas
          orderDetail={orderDetail}
          orderDetailShow={orderDetailShow}
          setOrderDetailShow={setOrderDetailShow}
          fetchOrders={() => fetchOrders(pagination.current_page)}
          openConfirmModal={openConfirmModal}
        />
      )}
      <ConfirmModal
        show={showConfirmModal}
        message={confirmModalMessage}
        onAccept={handleConfirmModalAccept}
        onClose={handleConfirmModalClose}
      />
    </div>
  );
}

export default Orders;
