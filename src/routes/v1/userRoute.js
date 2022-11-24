import { Router } from 'express';
import userController from '../../controllers/userController.js';
import validator from '../../middlewares/validator.js';
import userValidation from '../../validation/userValidation.js';

const router = Router();

const { createUserValidation } = userValidation;

router.post('/', validator(createUserValidation), userController.createUserController);
router.get('/', userController.getAllUserController);
router.get('/:idUser', userController.getUserByIdController);

export default router;
