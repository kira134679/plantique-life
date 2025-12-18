import App from '../App';
import ArticleDetail from '../views/ArticleDetail';
import Articles from '../views/Articles';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import ProductDetail from '../views/ProductDetail';
import ProductList from '../views/ProductList';
import ShoppingCart from '../views/ShoppingCart';

const routes = [
  {
    path: '/',
    Component: App,
    handle: { breadcrumb: () => '首頁' },
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: ProductList, handle: { breadcrumb: () => '植感精選' } },
      { path: 'products/:productId', Component: ProductDetail },
      { path: 'article-detail', Component: ArticleDetail },
      { path: 'articles', Component: Articles },
      { path: 'shopping-cart', Component: ShoppingCart },
    ],
  },
  { path: '*', Component: NotFound },
];

export default routes;
