import App from '../App';
import ArticleDetail from '../views/ArticleDetail';
import Articles from '../views/Articles';
import { default as Home, default as Home } from '../views/Home';
import NotFound from '../views/NotFound';
import ShoppingCart from '../views/ShoppingCart';

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'article-detail', Component: ArticleDetail },
      { path: 'articles', Component: Articles },
      { path: 'shopping-cart', Component: ShoppingCart },
    ],
  },
  { path: '*', Component: NotFound },
];

export default routes;
