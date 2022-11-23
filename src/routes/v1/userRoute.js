import { Router } from 'express';
import userController from '../../controllers/userController.js';

const router = Router();

router.get('/', userController.getAllUserController);
router.get('/:idUser', userController.getUserByIdController);

export default router;
