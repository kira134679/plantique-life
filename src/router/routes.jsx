import App from '../App';
import RequireAuth from '../components/RequireAuth.jsx';
import ArticleDetail from '../views/ArticleDetail';
import Articles from '../views/Articles';
import Home from '../views/Home';
import Login from '../views/Login.jsx';
import NotFound from '../views/NotFound';
import ProductDetail from '../views/ProductDetail';
import ProductList from '../views/ProductList';
import ShoppingCart from '../views/ShoppingCart';

// 後台管理頁面
import { Outlet } from 'react-router';
import Admin from '../views/Admin.jsx';
import CouponEdit from '../views/admin/coupons/CouponEdit.jsx';
import Coupons from '../views/admin/coupons/Coupons.jsx';
import Orders from '../views/admin/orders/Orders.jsx';
import ProductEdit from '../views/admin/products/ProductEdit.jsx';
import Products from '../views/admin/products/Products.jsx';

const routes = [
  {
    path: '/',
    Component: App,
    handle: { breadcrumb: () => '首頁' },
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: ProductList, handle: { breadcrumb: () => '植感精選' } },
      { path: 'products/:productId', Component: ProductDetail },
      { path: 'articles/:articleId', Component: ArticleDetail },
      { path: 'articles', Component: Articles },
      { path: 'shopping-cart', Component: ShoppingCart },
    ],
  },
  { path: '/login', Component: Login },
  {
    Component: RequireAuth,
    children: [
      {
        path: 'admin',
        Component: Admin,
        children: [
          {
            index: true,
            Component: () => <h2>首頁</h2>,
          },
          {
            path: 'products',
            Component: () => <Outlet />,
            children: [
              { index: true, Component: Products },
              { path: 'edit/:id?', Component: ProductEdit },
            ],
          },
          {
            path: 'coupons',
            Component: () => <Outlet />,
            children: [
              { index: true, Component: Coupons },
              { path: 'edit/:id?', Component: CouponEdit },
            ],
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
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export default routes;
