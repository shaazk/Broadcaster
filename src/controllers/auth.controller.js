import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../db/data';
import returnMessage from '../helpers/response.helper';
import User from '../model/user.model';

const userController = {
  signup: (req, res) => {
    const user = new User(
      req.body.userId,
      req.body.fullname,
      req.body.email,
      req.body.password,
      req.body.PhoneNumber,
      req.body.username,
    );
    users.push(user);
    const genToken = jwt.sign(
      { email: user.email, ignoreExpiration: true },
      process.env.KEY,
    );
    return returnMessage(res, 201, 'User created successfully', genToken, {
      userId: user.userId,
      fullname: user.fullname,
      email: user.email,
      PhoneNumber: user.PhoneNumber,
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
      return returnMessage(res, 200, 'User is successfully logged in', genToken, {
        userId: loggedUser.userId,
        fullname: loggedUser.fullname,
        email: loggedUser.email,
        PhoneNumber: loggedUser.PhoneNumber,
        username: loggedUser.username,
      });
    }
    return returnMessage(res, 404, 'Your email or password is incorrect.');
  },
};

export default userController;
