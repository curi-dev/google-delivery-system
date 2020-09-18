import { Router } from 'express';
import deliveries from './deliveries.routes';

const routes = Router();

routes.use('/deliveries', deliveries);


export default routes;