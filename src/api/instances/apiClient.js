import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const token = document.cookie
    .split(';')
    .map(s => s.trim())
    .find(s => s.startsWith('auth_token='))
    ?.split('=')[1];

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export { apiClient };
