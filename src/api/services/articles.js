import guestClient from '@/api/clients/guestClient';
import { GUEST_API_PATH } from '@/api/core/constants';

export const guestArticleApi = {
  getArticles: ({ preventGlobalLoading, ...params } = {}) =>
    guestClient.get(`${GUEST_API_PATH}/articles`, { preventGlobalLoading, params }),
};
