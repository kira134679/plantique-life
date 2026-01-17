import adminClient from './clients/adminClient';
import guestClient from './clients/guestClient';

import { attachAuthHandler, attachLoadingHandler } from './core/interceptorHandlers';

export default function setupAxiosInterceptors() {
  // See: https://github.com/axios/axios?tab=readme-ov-file#interceptor-execution-order
  // The request interceptor are executed in reverse order(LIFO). The last interceptor added is executed first.
  // The response interceptor are executed in the order they were added(FIFO).
  attachAuthHandler(adminClient);
  attachLoadingHandler(adminClient);

  attachLoadingHandler(guestClient);
}
