import Cookies from 'js-cookie';
import { hideLoading, showLoading } from '../../slice/loadingSlice';

export function attachAuthHandler(instance) {
  instance.interceptors.request.use(config => {
    const token = Cookies.get('auth_token');

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `${token}`;
    }

    return config;
  });
}

export function attachLoadingHandler(instance, store) {
  instance.interceptors.request.use(
    config => {
      if (config?.preventGlobalLoading !== true) {
        store.dispatch(showLoading());
      }
      return config;
    },
    error => {
      if (error.config?.preventGlobalLoading !== true) {
        store.dispatch(hideLoading());
      }
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      if (response.config?.preventGlobalLoading !== true) {
        store.dispatch(hideLoading());
      }

      return response.data;
    },
    error => {
      if (error.config?.preventGlobalLoading !== true) {
        store.dispatch(hideLoading());
      }

      return Promise.reject(error.response?.data?.message || error.message);
    },
  );
}
