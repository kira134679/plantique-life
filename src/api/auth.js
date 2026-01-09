import { apiClient } from './instances/apiClient';

export const authApi = {
  login: data => apiClient.post('/admin/signin', data),
  check: () => apiClient.post('/api/user/check'),
  logout: () => apiClient.post('/logout'),
};
