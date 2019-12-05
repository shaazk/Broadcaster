import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import returnMessage from '../helpers/response.helper';
import User from '../model/user.model';
import db from '../db/db';

const userController = {
  signup: async (req, res) => {
    try {
      const {
        fullName, email, password, phoneNumber, username,
      } = req.body;
      const user = new User(
        '',
        fullName,
        email,
        password,
        phoneNumber,
        username,
        'citizen',
      );
      const data = await db.insertIntoUser(user);
      const userData = data.rows[0];
      return returnMessage(res, 201, 'User created successfully', {
        userId: userData.userid,
        fullName: userData.fullname,
        email: userData.email,
        phoneNumber: userData.phonenumber,
        username: userData.username,
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
        const {
          userid, nationalid, fullname, email, phonenumber, username,
        } = loggedUser;
        return returnMessage(
          res,
          200,
          'User is successfully logged in',
          {
            userId: userid,
            nationalId: nationalid,
            fullName: fullname,
            email,
            phoneNumber: phonenumber,
            username,
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
