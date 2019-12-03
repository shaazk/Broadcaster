import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import returnMessage from '../helpers/response.helper';
import User from '../model/user.model';
import db from '../db/db';

const userController = {
  signup: async (req, res) => {
    try {
      const {
        userId, fullName, email, password, phoneNumber, username,
      } = req.body;
      const user = new User(
        userId,
        fullName,
        email,
        password,
        phoneNumber,
        username,
        'citizen',
      );
      await db.insertIntoUser(user);
      // const userData = data.rows[0];
      return returnMessage(res, 201, 'User created successfully', {
        userId: parseInt(user.userId, 0),
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
      const {
        email, password,
      } = req.body;

      const query = await db.selectBy('users', 'email', email);
      const loggedUser = query.rows[0];
      let isPasswordCorrect;

      if (loggedUser) {
        isPasswordCorrect = await bcrypt.compare(
          password,
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
