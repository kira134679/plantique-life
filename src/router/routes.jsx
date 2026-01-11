import App from '../App';
import Articles from '../views/Articles';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
// 後台管理頁面
import Backstage from '../views/Backstage.jsx';
import Orders from '../views/Backstage/Orders.jsx';

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'articles', Component: Articles },
    ],
  },
  {
    path: '/admin',
    Component: Backstage,
    children: [
      {
        index: true,
        Component: () => <h2>首頁</h2>,
      },
      {
        path: 'products',
        Component: () => <h2>產品概覽</h2>,
      },
      {
        path: 'coupons',
        Component: () => <h2>優惠券管理</h2>,
      },
      {
        path: 'orders',
        Component: Orders,
      },
      {
        path: 'articles',
        Component: () => <h2>文章管理</h2>,
      },
      {
        path: 'data-overview',
        Component: () => <h2>數據概覽</h2>,
      },
      {
        path: 'sales-report',
        Component: () => <h2>銷售報表</h2>,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export default routes;
