import { adminOrderApi } from '@/api';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import { timestampToDate } from '@/utils/utils';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';
import OrderDatePicker from './OrderDatePicker';
import OrderDetailOffcanvas from './OrderDetailOffcanvas';

const orderTabs = ['全部訂單', '未付款', '已付款'];

function Orders() {
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

  const fetchOrders = async (page = 1) => {
    try {
      const response = await adminOrderApi.fetchOrders(page);
      setOrders(response.orders);
      setPagination(response.pagination);
    } catch (error) {
      toast.error(error);
    }
  };

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

  // 初始化時取得訂單列表
  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

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
        onPageChange={fetchOrders}
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
