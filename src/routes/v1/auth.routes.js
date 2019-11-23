import express from 'express';
import userController from '../../controllers/auth.controller';
import { ifExist, validateSignup, harshPassword } from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/auth/signup', validateSignup, ifExist, harshPassword, userController.signup);
router.post('/auth/signin', userController.signin);


export default router;
