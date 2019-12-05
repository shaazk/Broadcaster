import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import returnMessage from '../helpers/response.helper';
import db from '../db/db';

const schema = {
  signup: Joi.object({
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

export const ifExist = async (req, res, next) => {
  const logUser = await db.selectUser(req.body.email);
  const rowCount = logUser.rows[0].count;
  if (rowCount > 0) {
    return returnMessage(res, 409, 'Provided Email already exists.');
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

export const isAdmin = async (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    return returnMessage(res, 401, {
      message: 'Unauthorised access',
    });
  }
  return 0;
};

export const isCitizen = async (req, res, next) => {
  if (req.user.role === 'citizen') {
    next();
  } else {
    return returnMessage(res, 401, {
      message: 'Unauthorised access',
    });
  }
  return 0;
};
