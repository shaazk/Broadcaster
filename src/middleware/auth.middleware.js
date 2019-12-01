import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import returnMessage from '../helpers/response.helper';
import { users } from '../db/data';

const schema = {
  signup: Joi.object({
    userId: Joi.number()
      .min(16)
      .required(),
    fullName: Joi.string()
      .min(8)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required(),
    phoneNumber: Joi.number()
      .min(10)
      .required(),
    username: Joi.string()
      .min(3)
      .required(),
  }),
  signin: Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required(),
  }),
};

export const ifExist = (req, res, next) => {
  const logUser = users.find(
    (user) => user.email === req.body.email || user.userId === req.body.userId,
  );
  if (logUser) {
    return returnMessage(res, 409, 'Provided Email or ID already exists.');
  }
  next();
  return 0;
};

export const validateSignup = async (req, res, next) => {
  try {
    await schema.signup.validateAsync(req.body);
  } catch (error) {
    return returnMessage(res, 409, error.details[0].message);
  }
  next();
  return 0;
};

export const validateSignin = async (req, res, next) => {
  try {
    await schema.signin.validateAsync(req.body);
  } catch (error) {
    return returnMessage(res, 400, error.details[0].message);
  }
  next();
  return 0;
};

export const harshPassword = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  req.body.password = password;
  next();
};
