import App from '../App';
import Home from '../views/Home';
import Articles from '../views/Articles';
import NotFound from '../views/NotFound';

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'articles', Component: Articles },
    ],
  },
  { path: '*', Component: NotFound },
];

export default routes;
