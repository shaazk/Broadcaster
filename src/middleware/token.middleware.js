import jwt from 'jsonwebtoken';
import { users } from '../db/data';
import returnMessage from '../helpers/response.helper';


const verifyToken = (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return returnMessage(res, 401, {
      message: 'Please sign in first.',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.KEY);
    const user = users.find((user) => user.userId === verified.payload.id);
    if (!user) {
      return returnMessage(res, 401, {
        message: 'Invalid token!',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return returnMessage(res, 401, {
      message: 'Invalid token!',
    });
  }
  return 0;
};
export default verifyToken;
