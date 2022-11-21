import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  console.log('userRoute');
});

export default router;
