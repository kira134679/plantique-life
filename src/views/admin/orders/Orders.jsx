import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import { timestampToDate } from '@/utils/utils';
import clsx from 'clsx';
import { useState } from 'react';
import OrderDatePicker from './OrderDatePicker';
import OrderDetailOffcanvas from './OrderDetailOffcanvas';

const orderTabs = ['全部訂單', '未付款', '已付款'];
// 資料庫內容
const orderData = [
  {
    create_at: 1766326015,
    id: '-Oh0E0QZ1LpUoQBYhWrb',
    is_paid: false,
    message: '單項商品測試',
    products: {
      '-Oh0E0Ty_nLEqHz2eSMa': {
        final_total: 800,
        id: '-Oh0E0Ty_nLEqHz2eSMa',
        product: {
          category: 'yy',
          content: 'zz',
          description: 'zz',
          id: '-OgziyzKyFJO2-IhIvDJ',
          imageUrl:
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          is_enabled: 1,
          origin_price: 1000,
          price: 800,
          title: 'xx',
          unit: '個',
        },
        product_id: '-OgziyzKyFJO2-IhIvDJ',
        qty: 1,
        total: 800,
      },
    },
    total: 800,
    user: {
      address: '桃園市青埔路',
      email: 'testB@example.com',
      name: '測試人員B',
      tel: '0987654321',
    },
    num: 1,
  },
  {
    create_at: 1766312208,
    id: '-Oh-PLVLBuF8RcyqWJ--',
    is_paid: false,
    message: '這是測試訂單',
    products: {
      '-Oh-PLWdlE1Aw5MygTfy': {
        final_total: 800,
        id: '-Oh-PLWdlE1Aw5MygTfy',
        product: {
          category: 'yy',
          content: 'zz',
          description: 'zz',
          id: '-OgziyzKyFJO2-IhIvDJ',
          imageUrl:
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          is_enabled: 1,
          origin_price: 1000,
          price: 800,
          title: 'xx',
          unit: '個',
        },
        product_id: '-OgziyzKyFJO2-IhIvDJ',
        qty: 1,
        total: 800,
      },
      '-Oh-PLWeljPQKyxYEEf4': {
        final_total: 1500,
        id: '-Oh-PLWeljPQKyxYEEf4',
        product: {
          category: '測試分類',
          content: '測試的說明',
          description: '測試的描述',
          id: '-Ogz5dvvNFiLDY2gcyXC',
          imageUrl:
            'https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80',
          imagesUrl: [
            'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80',
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1948&q=80',
            'https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            'https://images.unsplash.com/photo-1511914265872-c40672604a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80',
          ],
          is_enabled: 1,
          origin_price: 1000,
          price: 500,
          title: '測試的產品',
          unit: '單位',
        },
        product_id: '-Ogz5dvvNFiLDY2gcyXC',
        qty: 3,
        total: 1500,
      },
    },
    total: 2300,
    user: {
      address: '台北市中央路',
      email: 'test@example.com',
      name: '測試人員',
      tel: '0912345678',
    },
    num: 2,
  },
  {
    create_at: 1766300899,
    id: '-OgzjCYAYYxlgdv5X8sL',
    is_paid: true,
    message: '包含兩個商品的測試訂單',
    num: 3,
    products: {
      '-OgzjCZfnXJkzx_27H96': {
        final_total: 500,
        id: '-OgzjCZfnXJkzx_27H96',
        product: {
          category: '測試分類',
          content: '測試的說明',
          description: '測試的描述',
          id: '-Ogz5dvvNFiLDY2gcyXC',
          imageUrl:
            'https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80',
          imagesUrl: [
            'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80',
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1948&q=80',
            'https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            'https://images.unsplash.com/photo-1511914265872-c40672604a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80',
          ],
          is_enabled: 1,
          origin_price: 1000,
          price: 500,
          title: '測試的產品',
          unit: '單位',
        },
        product_id: '-Ogz5dvvNFiLDY2gcyXC',
        qty: 1,
        total: 500,
      },
      '-OgzjCZfnXJkzx_27H97': {
        final_total: 800,
        id: '-OgzjCZfnXJkzx_27H97',
        product: {
          category: 'yy',
          content: 'zz',
          description: 'zz',
          id: '-OgziyzKyFJO2-IhIvDJ',
          imageUrl:
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          is_enabled: 1,
          origin_price: 1000,
          price: 800,
          title: 'xx',
          unit: '個',
        },
        product_id: '-OgziyzKyFJO2-IhIvDJ',
        qty: 1,
        total: 800,
      },
    },
    total: 1300,
    user: {
      address: '台北市測試路200號',
      email: 'multi@example.com',
      name: '多商品測試人員',
      tel: '0912345679',
    },
  },
];

function Orders() {
  // 訂單詳情側邊欄
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderDetailShow, setOrderDetailShow] = useState(false);
  // 編輯狀態與草稿訂單資料
  const [draftOrder, setDraftOrder] = useState(null);

  // 日期區間選擇
  const [dateRange, setDateRange] = useState([null, null]);

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
          <Button type="button" variant="outline-danger" className="ms-auto">
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
              {orderData.map(order => (
                <tr key={order.id} className="fs-sm">
                  <td>{order.id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.user.email}</td>
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
                        setDraftOrder({
                          editable: false,
                          userName: order.user.name,
                          userAddress: order.user.address,
                          createDate: new Date(order.create_at * 1000),
                        });
                        setOrderDetailShow(true);
                      }}
                    >
                      <span className="custom-btn-icon material-symbols-rounded">visibility</span>
                    </Button>
                    <Button type="button" variant="outline-danger" shape="circle" size="sm">
                      <span className="custom-btn-icon material-symbols-rounded">delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination />
      {orderDetail && draftOrder && (
        <OrderDetailOffcanvas
          orderDetail={orderDetail}
          orderDetailShow={orderDetailShow}
          setOrderDetailShow={setOrderDetailShow}
          draftOrder={draftOrder}
          setDraftOrder={setDraftOrder}
        />
      )}
    </div>
  );
}

export default Orders;
