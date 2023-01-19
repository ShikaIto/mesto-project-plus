import { Router } from 'express';
import userRoutes from './user';
import cardRoutes from './card';

const routes = Router();

routes.use('/users', userRoutes);

routes.use('/cards', cardRoutes);

export default routes;
