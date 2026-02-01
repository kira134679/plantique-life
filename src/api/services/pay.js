import guestClient from '../clients/guestClient';
import { GUEST_API_PATH } from '../core/constants';

export const payApi = {
  // 付款
  createPayment: orderId => guestClient.post(`${GUEST_API_PATH}/pay/${orderId}`),
};
