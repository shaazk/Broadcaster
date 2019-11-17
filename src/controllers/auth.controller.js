import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import { users } from '../db/data';
import User from '../model/user.model';

const schema = {
  signup: Joi.object({
    userId: Joi.number()
      .min(16)
      .required(),
    fullname: Joi.string()
      .min(8)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required(),
    PhoneNumber: Joi.number()
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

const userController = {
  signup: async (req, res) => {
    try {
      await schema.signup.validateAsync(req.body);
    } catch (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User(
      req.body.userId,
      req.body.fullname,
      req.body.email,
      password,
      req.body.PhoneNumber,
      req.body.username,
    );
    users.push(user);
    const genToken = jwt.sign(
      { email: user.email, ignoreExpiration: true },
      process.env.KEY,
    );
    return res.status(201).send({
      status: 201,
      message: 'User created successfully',
      token: genToken,
      data: {
        userId: user.userId,
        fullname: user.fullname,
        email: user.email,
        PhoneNumber: user.PhoneNumber,
        username: user.username,
      },
    });
  },

  signin: async (req, res) => {
    try {
      await schema.signin.validateAsync(req.body);
    } catch (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const loggedUser = users.find((user) => user.email === req.body.email);

    const isPasswordCorrect = await bcrypt.compare(req.body.password, loggedUser.password);

    if (loggedUser && isPasswordCorrect) {
      const genToken = jwt.sign(
        { email: loggedUser.email, ignoreExpiration: true },
        process.env.KEY,
      );
      return res.status(200).send({
        status: 200,
        message: 'User is successfully logged in',
        token: genToken,
        data: {
          userId: loggedUser.userId,
          fullname: loggedUser.fullname,
          email: loggedUser.email,
          PhoneNumber: loggedUser.PhoneNumber,
          username: loggedUser.username,
        },
      });
    }
    return res.status(404).send({
      status: 404,
      message: 'Your email or password is incorrect.',
    });
  },
};

export default userController;
