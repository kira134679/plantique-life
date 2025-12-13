import App from '../App';
import Home from '../views/Home';

const routes = [
  {
    path: '/',
    Component: App,
    children: [{ index: true, Component: Home }],
  },
];

export default routes;
