import Button from '@/components/Button';
import { timestampToDate } from '@/utils/utils';
import clsx from 'clsx';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DatePicker from 'react-datepicker';

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
    <div className="d-flex flex-column" style={{ minHeight: 'calc(100vh - 80px)' }}>
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
            <label htmlFor="exampleFormControlInput1" className="form-label d-none">
              訂單編號 / 姓名 / Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="訂單編號 / ​姓​名​ / Email"
            />
          </div>
          <OrderDatePicker selectsRange={true} date={dateRange} setDate={setDateRange} />
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

function OrderDetailOffcanvas({ orderDetail, orderDetailShow, setOrderDetailShow, draftOrder, setDraftOrder }) {
  // 安全解構，避免 draftOrder 為 null 時報錯
  const { editable = false, userName = '', userAddress = '', createDate = null } = draftOrder || {};

  const handleDraftOrderChange = (key, value) => {
    setDraftOrder(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // 關閉側邊欄
  const handleOffcanvasClose = () => {
    setOrderDetailShow(false);
    setDraftOrder({
      editable: false,
      userName: '',
      userAddress: '',
      createDate: null,
    });
  };

  return (
    <Offcanvas
      show={orderDetailShow}
      onHide={handleOffcanvasClose}
      placement="end"
      style={{ '--bs-offcanvas-width': '800px' }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>訂單詳情</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <section className="mb-10">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-1 mb-3">
            <h2 className="fs-6">買家資訊</h2>
            <Button
              type="button"
              variant={editable ? 'filled-primary' : 'outline-neutral'}
              shape="circle"
              size="sm"
              className="admin-orders-button"
              onClick={() => handleDraftOrderChange('editable', !editable)}
            >
              <span className="custom-btn-icon material-symbols-rounded">{editable ? 'check' : 'edit'}</span>
            </Button>
          </div>
          <div className="mb-2 row">
            <label htmlFor="userName" className="col-2 col-form-label">
              姓名
            </label>
            <div className="col-10">
              <input
                type="text"
                disabled={!editable}
                className="form-control"
                id="userName"
                value={userName}
                onChange={e => handleDraftOrderChange('userName', e.target.value)}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label htmlFor="userEmail" className="col-2 col-form-label">
              Email
            </label>
            <div className="col-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="userEmail"
                value={orderDetail.user.email}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label htmlFor="userTel" className="col-2 col-form-label">
              電話
            </label>
            <div className="col-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="userTel"
                value={orderDetail.user.tel}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label htmlFor="userAddress" className="col-2 col-form-label">
              地址
            </label>
            <div className="col-10">
              <input
                type="text"
                disabled={!editable}
                className="form-control"
                id="userAddress"
                value={userAddress}
                onChange={e => handleDraftOrderChange('userAddress', e.target.value)}
              />
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">訂購商品</h2>
          <ul className="list-unstyled">
            <li className="row mb-4">
              <p className="col-7 text-neutral-400">商品</p>
              <p className="col-2 text-neutral-400 text-center">數量</p>
              <p className="col-3 text-neutral-400 text-end">小計</p>
            </li>
            {Object.values(orderDetail.products).map(item => (
              <li key={item.id} className="row mb-3 align-items-center">
                <div className="col-3" style={{ height: '100px' }}>
                  <img src={item.product.imageUrl} alt={item.product.title} className="w-100 h-100 object-fit-cover" />
                </div>
                <div className="col-4">
                  <span
                    className={`fs-xs fs-lg-sm px-2 px-lg-3 py-1 ${item.product.category === '質感精選' ? 'text-primary bg-primary-100' : 'text-secondary bg-secondary-100'}`}
                  >
                    {item.product.category}
                  </span>
                  <p className="mt-1">{item.product.title}</p>
                  <div className="d-flex align-items-end mt-1">
                    <span className="card-text fs-7 fs-lg-6 text-primary-700 fw-bold noto-serif-tc lh-sm">
                      {`NT$${item.product.price.toLocaleString()}`}
                    </span>
                    {item.product.origin_price && (
                      <span className="card-text fs-sm text-neutral-400 noto-serif-tc text-decoration-line-through ms-xl-2 mt-2 mt-xl-0">
                        {`$${item.product.origin_price.toLocaleString()}`}
                      </span>
                    )}
                  </div>
                </div>
                <p className="col-2 text-center text-neutral-500 mb-1">x {item.qty}</p>
                <p className="col-3 fs-7 noto-serif-tc fw-bold text-end text-primary-700 mb-1">
                  NT${item.final_total.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="fs-6 border-bottom pb-2 mb-3">訂單資訊</h2>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderId" className="col-3 col-form-label">
                  訂單編號
                </label>
                <div className="col-9">
                  <input type="text" readOnly className="form-control-plaintext" id="orderId" value={orderDetail.id} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderAmount" className="col-3 col-form-label">
                  訂單金額
                </label>
                <div className="col-9">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext fs-7 noto-serif-tc fw-bold text-primary-700 text-end"
                    id="orderAmount"
                    value={`NT$${orderDetail.total.toLocaleString()}`}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderDate" className="col-3 col-form-label">
                  下單日期
                </label>
                <div className="col-9">
                  <OrderDatePicker
                    selectsRange={false}
                    date={createDate}
                    setDate={date => handleDraftOrderChange('createDate', date)}
                    disabled={!editable}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <label htmlFor="orderMessage" className="col-2 col-form-label">
                  留言
                </label>
                <div className="col-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="orderMessage"
                    value={orderDetail.message}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="outline-neutral" shape="pill" size="sm" onClick={handleOffcanvasClose}>
            取消
          </Button>
          <Button type="button" variant="filled-primary" shape="pill" size="sm">
            儲存
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
// 日期選擇器元件
const OrderDatePicker = ({ selectsRange, date, setDate, disabled = false }) => {
  return (
    <DatePicker
      selectsRange={selectsRange}
      // 如果是範圍選擇，則傳入 startDate 和 endDate，否則傳入 selected
      startDate={selectsRange ? date[0] : null}
      endDate={selectsRange ? date[1] : null}
      selected={selectsRange ? null : date}
      dateFormat="yyyy/MM/dd"
      onChange={update => setDate(update)}
      disabled={disabled}
      placeholderText={selectsRange ? '選擇日期範圍' : '選擇日期'}
      isClearable
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      className="form-control admin-orders-daypicker"
    />
  );
};

function Pagination() {
  return (
    <nav aria-label="Page" className="py-5">
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
  );
}

export default Orders;
