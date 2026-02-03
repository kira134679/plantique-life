import { Outlet } from 'react-router';

// 前台頁面
import App from '../App';
import About from '../views/About';
import ArticleDetail from '../views/ArticleDetail';
import Articles from '../views/Articles';
import Home from '../views/Home';
import Member from '../views/Member.jsx';
import OrderList from '../views/member/OrderList.jsx';
import ProductDetail from '../views/ProductDetail';
import ProductList from '../views/ProductList';
import ShoppingCart from '../views/ShoppingCart';

// 後台管理頁面
import RequireAuth from '../components/RequireAuth.jsx';
import Admin from '../views/Admin.jsx';
import CouponEdit from '../views/admin/coupons/CouponEdit.jsx';
import Coupons from '../views/admin/coupons/Coupons.jsx';
import Orders from '../views/admin/Orders.jsx';
import ProductEdit from '../views/admin/products/ProductEdit.jsx';
import Products from '../views/admin/products/Products.jsx';
import Login from '../views/Login.jsx';

import NotFound from '../views/NotFound';

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
      { path: 'about', Component: About },
      {
        path: 'member',
        Component: Member,
        handle: { breadcrumb: () => '會員中心' },
        children: [
          { index: true, Component: () => <h2>基本資訊</h2> },
          { path: 'orders', Component: OrderList, handle: { breadcrumb: () => '訂單查詢' } },
          {
            path: 'orders/:orderId',
            Component: () => <h2>訂單明細</h2>,
            handle: { breadcrumb: match => `${match.params.orderId}` },
          },
          { path: 'wishlist', Component: () => <h2>願望清單</h2>, handle: { breadcrumb: () => '願望清單' } },
        ],
      },
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
