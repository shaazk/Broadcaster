import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import returnMessage from '../helpers/response.helper';
import User from '../model/user.model';
import db from '../db/db';

const userController = {
  signup: async (req, res) => {
    try {
      const user = new User(
        req.body.userId,
        req.body.fullName,
        req.body.email,
        req.body.password,
        req.body.phoneNumber,
        req.body.username,
        'citizen',
      );
      const data = await db.insertIntoUser(user);
      if (data) {
        return returnMessage(res, 201, 'User created successfully', {
          userId: parseInt(user.userId, 0),
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          username: user.username,
        });
      }
      return returnMessage(res, 401, 'Data was not successfully recorded.');
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },

  signin: async (req, res) => {
    try {
      const query = await db.selectBy('users', 'email', req.body.email);
      const loggedUser = query.rows[0];
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
              id: loggedUser.userid,
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
            userId: loggedUser.userid,
            fullName: loggedUser.fullname,
            email: loggedUser.email,
            phoneNumber: loggedUser.phonenumber,
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
