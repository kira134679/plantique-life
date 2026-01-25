import adminClient from '../clients/adminClient';
import guestClient from '../clients/guestClient';
import { ADMIN_API_PATH, GUEST_API_PATH } from '../core/constants';

export const guestOrderApi = {
  // 建立訂單
  createOrder: data => guestClient.post(`${GUEST_API_PATH}/order`, { data }),
  // 取得所有訂單
  fetchOrders: () => guestClient.get(`${GUEST_API_PATH}/orders`),
  // 取得指定 ID 訂單
  fetchOrderById: orderId => guestClient.get(`${GUEST_API_PATH}/order/${orderId}`),
};

export const adminOrderApi = {
  // 取得訂單列表
  fetchOrders: (page = 1) => adminClient.get(`${ADMIN_API_PATH}/orders?page=${page}`),
  // 更新訂單資訊
  updateOrder: (id, data) => adminClient.put(`${ADMIN_API_PATH}/order/${id}`, { data }),
  // 刪除訂單
  deleteOrder: id => adminClient.delete(`${ADMIN_API_PATH}/order/${id}`),
  // 刪除全部訂單
  deleteOrders: () => adminClient.delete(`${ADMIN_API_PATH}/orders/all`),
};
