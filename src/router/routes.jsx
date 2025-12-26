import App from '../App';
import ArticleDetail from '../views/ArticleDetail';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'article-detail', Component: ArticleDetail },
    ],
  },
  { path: '*', Component: NotFound },
];

export default routes;
