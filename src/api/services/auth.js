import adminClient from '../clients/adminClient';

export const authApi = {
  login: data => adminClient.post('/admin/signin', data),
  check: () => adminClient.post('/api/user/check'),
  logout: () => adminClient.post('/logout'),
};
