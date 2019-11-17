import express from 'express';
import userController from '../../controllers/auth.controller';
import { ifExist } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/auth/signup', ifExist, userController.signup);
router.post('/auth/signin', userController.signin);


export default router;
