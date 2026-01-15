import { apiClient } from './instances/apiClient';

const apiPath = import.meta.env.VITE_API_PATH;

const productApi = {
  // 取得全部商品
  getAllProducts: async () => {
    const response = await apiClient.get(`/api/${apiPath}/admin/products/all`);
    return response.data;
  },

  // 取得商品列表（可依頁數、分類篩選）
  getProducts: async (page = 1, category = null) => {
    const response = await apiClient.get(`/api/${apiPath}/admin/products`, { params: { page, category } });
    // 會自動轉為 ?page=參數&category=參數 接在 api url 後面
    return response.data;
  },

  // 新增商品
  createProduct: async data => {
    const response = await apiClient.post(`/api/${apiPath}/admin/product`, data);
    return response.data;
  },

  // 更新特定商品資訊
  updateProduct: async (id, data) => {
    const response = await apiClient.put(`/api/${apiPath}/admin/product/${id}`, data);
    return response.data;
  },

  // 刪除特定商品
  deleteProduct: async id => {
    const response = await apiClient.delete(`/api/${apiPath}/admin/product/${id}`);
    return response.data;
  },
};

export default productApi;
