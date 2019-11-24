import express from 'express';
import userController from '../../controllers/auth.controller';
import {
  ifExist, validateSignup, validateSignin, harshPassword,
} from '../../middleware/auth.middleware';

const router = express.Router();

router.post('/auth/signup', validateSignup, ifExist, harshPassword, userController.signup);
router.post('/auth/signin', validateSignin, userController.signin);


export default router;
