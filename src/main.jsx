import 'assets/scss/main.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import setupAxiosInterceptors from './api/setup';
import Loading from './components/Loading.jsx';
import router from './router/index';
import store from './store';

setupAxiosInterceptors(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
      <Loading />
    </Provider>
  </StrictMode>,
);
