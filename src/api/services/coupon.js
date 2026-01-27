import guestClient from '../clients/guestClient';
import { GUEST_API_PATH } from '../core/constants';

export const guestCouponApi = {
  applyCoupon: (data, preventGlobalLoading) =>
    guestClient.post(`${GUEST_API_PATH}/coupon`, { data }, { preventGlobalLoading }),
};
