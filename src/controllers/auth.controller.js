import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../db/data';
import returnMessage from '../helpers/response.helper';
import User from '../model/user.model';

const userController = {
  signup: (req, res) => {
    try {
      const user = new User(
        req.body.userId,
        req.body.fullName,
        req.body.email,
        req.body.password,
        req.body.phoneNumber,
        req.body.username,
      );
      users.push(user);
      return returnMessage(res, 201, 'User created successfully', {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        username: user.username,
      });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },

  signin: async (req, res) => {
    try {
      const loggedUser = users.find((user) => user.email === req.body.email);
      let isPasswordCorrect;

      if (loggedUser) {
        isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          loggedUser.password,
        );
      }

      if (loggedUser && isPasswordCorrect) {
        const genToken = jwt.sign(
          {
            payload: {
              role: loggedUser.role,
              id: loggedUser.userId,
            },
            ignoreExpiration: true,
          },
          process.env.KEY,
        );
        return returnMessage(
          res,
          200,
          'User is successfully logged in',
          {
            userId: loggedUser.userId,
            fullName: loggedUser.fullName,
            email: loggedUser.email,
            phoneNumber: loggedUser.phoneNumber,
            username: loggedUser.username,
          },
          genToken,
        );
      }
      return returnMessage(res, 401, 'Your email or password is incorrect.');
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
};

export default userController;
