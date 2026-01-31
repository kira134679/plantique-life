import adminClient from '../clients/adminClient';
import { ADMIN_API_PATH } from '../core/constants';

export const adminProductApi = {
  // 取得全部商品
  getAllProducts: () => adminClient.get(`${ADMIN_API_PATH}/products/all`),

  // 取得商品列表（可依頁數、分類篩選）
  getProducts: (page = 1, category = null) =>
    adminClient.get(`${ADMIN_API_PATH}/products`, { params: { page, category } }),

  // 新增商品
  createProduct: data => adminClient.post(`${ADMIN_API_PATH}/product`, data),

  // 更新特定商品資訊
  updateProduct: (id, data) => adminClient.put(`${ADMIN_API_PATH}/product/${id}`, data),

  // 刪除特定商品
  deleteProduct: id => adminClient.delete(`${ADMIN_API_PATH}/product/${id}`),
};
