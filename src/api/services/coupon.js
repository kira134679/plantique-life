import guestClient from '../clients/guestClient';
import adminClient from '../clients/adminClient';
import { GUEST_API_PATH, ADMIN_API_PATH } from '../core/constants';

export const guestCouponApi = {
  applyCoupon: (data, preventGlobalLoading) =>
    guestClient.post(`${GUEST_API_PATH}/coupon`, { data }, { preventGlobalLoading }),
};

export const adminCouponApi = {
  getCoupons: page => adminClient.get(`${ADMIN_API_PATH}/coupons?page=${page}`),

  createCoupon: data => adminClient.post(`${ADMIN_API_PATH}/coupon`, { data }),

  updateCoupon: (id, data) => adminClient.put(`${ADMIN_API_PATH}/coupon/${id}`, { data }),

  deleteCoupon: id => adminClient.delete(`${ADMIN_API_PATH}/coupon/${id}`),
};
