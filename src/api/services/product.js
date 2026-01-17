import adminClient from '../clients/adminClient';
import guestClient from '../clients/guestClient';
import { ADMIN_API_PATH, GUEST_API_PATH } from '../core/constants';

export const productApi = {
  /**
   * 取得所有商品資料。
   * @returns {Promise<{
   *   success: boolean,
   *   products: {
   *     category: string,
   *     content: string,
   *     description: string,
   *     id: string,
   *     imageUrl: string,
   *     imagesUrl: string[],
   *     is_enabled: number,
   *     origin_price: number,
   *     price: number,
   *     title: string,
   *     unit: string
   *   }[]
   * }>}
   */
  getAllProducts: (config = {}) => guestClient.get(`${GUEST_API_PATH}/products/all`, config),
  /**
   * 取得商品資料，支援分頁與分類篩選。
   * @param {object} params - 查詢參數
   * @param {number} [params.page] - 欲取得的頁碼
   * @param {string} [params.category] - 欲篩選的商品分類
   * @returns {Promise<{
   *   success: boolean,
   *   products: {
   *     category: string,
   *     content: string,
   *     description: string,
   *     id: string,
   *     imageUrl: string,
   *     imagesUrl: string[],
   *     is_enabled: number,
   *     num: number,
   *     origin_price: number,
   *     price: number,
   *     title: string,
   *     unit: string
   *   }[],
   *   pagination: {
   *     total_pages: number,
   *     current_page: number,
   *     has_pre: boolean,
   *     has_next: boolean,
   *     category: string,
   *   }
   *   messages: string[]
   * }>}
   */
  getProducts: ({ preventGlobalLoading, ...params } = {}) => {
    return guestClient.get(`${GUEST_API_PATH}/products`, { preventGlobalLoading, params });
  },
  /**
   * 取得特定 ID 的商品資料。
   * @param {string} productId
   * @returns {Promise<{
   *   success: boolean,
   *   product: {
   *     category: string,
   *     content: string,
   *     description: string,
   *     id: string,
   *     imageUrl: string,
   *     imagesUrl: string[],
   *     is_enabled: number,
   *     origin_price: number,
   *     price: number,
   *     title: string,
   *     unit: string
   *   }
   * }>}
   */
  getProductById: (productId, config = {}) => guestClient.get(`${GUEST_API_PATH}/products/${productId}`, config),
};

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
