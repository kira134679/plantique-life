import adminClient from '../clients/adminClient';
import { ADMIN_API_PATH } from '../core/constants';

export const uploadApi = {
  upload: data =>
    adminClient.post(`${ADMIN_API_PATH}/upload`, data, {
      headers: {
        'Content-Type': undefined, //覆蓋 api 實例設定，交由瀏覽器自行判斷
      },
    }),
};
