import 'assets/scss/main.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import Loading from './components/Loading.jsx';
import router from './router/index';
import store from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Loading />
    </Provider>
  </StrictMode>,
);
