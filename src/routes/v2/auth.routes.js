import express from 'express';
import userController from '../../controllers/auth.controller';
import {
  ifExist, validateSignup, validateSignin, harshPassword,
} from '../../middleware/auth.middleware';

const router1 = express.Router();

router1.post('/auth/signup', validateSignup, ifExist, harshPassword, userController.signup);
router1.post('/auth/signin', validateSignin, userController.signin);


export default router1;
