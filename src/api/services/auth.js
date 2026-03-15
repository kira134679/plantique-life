import adminClient from '../clients/adminClient';
import { guestAuthClient } from '../clients/guestClient';

export const authApi = {
  login: data => adminClient.post('/admin/signin', data),
  check: () => adminClient.post('/api/user/check'),
  logout: () => adminClient.post('/logout'),
};

export const guestAuthApi = {
  register: (data, preventGlobalLoading = false) => guestAuthClient.post('/register', data, { preventGlobalLoading }),
  login: (data, preventGlobalLoading = false) => guestAuthClient.post('/login', data, { preventGlobalLoading }),
  check: (userId, preventGlobalLoading = false) => guestAuthClient.get(`/users/${userId}`, { preventGlobalLoading }),
};
