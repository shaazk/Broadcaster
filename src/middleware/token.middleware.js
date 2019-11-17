import jwt from 'jsonwebtoken';
import { users } from '../db/data';

const verifyToken = (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Please sign in first.',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.KEY);
    const user = users.find((user) => user.email === verified.email);
    if (!user) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid token!',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: 'Invalid token!',
    });
  }
  return 0;
};
export default verifyToken;
