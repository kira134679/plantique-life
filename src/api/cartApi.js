import { apiClient } from './instances/apiClient';

const apiPath = import.meta.env.VITE_API_PATH;

export const cartApi = {
  // 取得購物車列表
  fetchCarts: async () => {
    const response = await apiClient.get(`/api/${apiPath}/cart`);
    return response.data;
  },

  // 新增產品到購物車
  createCart: async data => {
    const response = await apiClient.post(`/api/${apiPath}/cart`, { data });
    return response.data;
  },

  // 更新購物車產品資訊
  updateCart: async (id, data) => {
    const response = await apiClient.put(`/api/${apiPath}/cart/${id}`, { data });
    return response.data;
  },

  // 刪除購物車產品
  deleteCart: async id => {
    const response = await apiClient.delete(`/api/${apiPath}/cart/${id}`);
    return response.data;
  },

  // 刪除購物車全部產品
  deleteCarts: async () => {
    const response = await apiClient.delete(`/api/${apiPath}/carts`);
    return response.data;
  },
};
