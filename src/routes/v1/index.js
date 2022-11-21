import { Router } from 'express';
import userRoute from './userRoutes.js';

const router = Router();

const defaultRouter = [
  {
    path: '/user',
    route: userRoute,
  },
];

defaultRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
