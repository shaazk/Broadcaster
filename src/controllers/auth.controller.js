import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../db/data';
import returnMessage from '../helpers/response.helper';
import User from '../model/user.model';

const userController = {
  signup: (req, res) => {
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
  },

  signin: async (req, res) => {
    const loggedUser = users.find((user) => user.email === req.body.email);

    const isPasswordCorrect = await bcrypt.compare(req.body.password, loggedUser.password);

    if (loggedUser && isPasswordCorrect) {
      const genToken = jwt.sign(
        { email: loggedUser.email, ignoreExpiration: true },
        process.env.KEY,
      );
      return returnMessage(res, 200, 'User is successfully logged in', {
        userId: loggedUser.userId,
        fullName: loggedUser.fullName,
        email: loggedUser.email,
        phoneNumber: loggedUser.phoneNumber,
        username: loggedUser.username,
      }, genToken);
    }
    return returnMessage(res, 401, 'Your email or password is incorrect.');
  },
};

export default userController;
