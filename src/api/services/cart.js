import guestClient from '../clients/guestClient';
import { GUEST_API_PATH } from '../core/constants';

export const cartApi = {
  // 取得購物車列表
  fetchCarts: preventGlobalLoading => guestClient.get(`${GUEST_API_PATH}/cart`, { preventGlobalLoading }),
  // 新增產品到購物車
  addToCart: (data, preventGlobalLoading) =>
    guestClient.post(`${GUEST_API_PATH}/cart`, { data }, { preventGlobalLoading }),
  // 更新購物車產品資訊
  updateCart: (id, data, preventGlobalLoading) =>
    guestClient.put(`${GUEST_API_PATH}/cart/${id}`, { data }, { preventGlobalLoading }),
  // 刪除購物車產品
  deleteCart: (id, preventGlobalLoading) =>
    guestClient.delete(`${GUEST_API_PATH}/cart/${id}`, { preventGlobalLoading }),
  // 刪除購物車全部產品
  deleteCarts: preventGlobalLoading => guestClient.delete(`${GUEST_API_PATH}/carts`, { preventGlobalLoading }),
};
