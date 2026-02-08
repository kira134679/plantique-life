import { createHashRouter } from 'react-router';
import routes from './routes';

const createAppHashRouter = () => createHashRouter(routes);

export default createAppHashRouter;
