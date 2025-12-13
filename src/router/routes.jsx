import App from '../App';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

const routes = [
  {
    path: '/',
    Component: App,
    children: [{ index: true, Component: Home }],
  },
  { path: '*', Component: NotFound },
];

export default routes;
