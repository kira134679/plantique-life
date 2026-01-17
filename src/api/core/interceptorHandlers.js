import Cookies from 'js-cookie';

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

export function attachLoadingHandler(instance) {
  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error.response?.data?.message || error.message);
    },
  );
}
