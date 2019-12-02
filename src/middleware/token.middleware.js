import jwt from 'jsonwebtoken';
import db from '../db/db';
import returnMessage from '../helpers/response.helper';


const verifyToken = async (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return returnMessage(res, 401, {
      message: 'Please sign in first.',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.KEY);
    const query = await db.selectBy('users', 'userId', verified.payload.id);
    const user = query.rows[0];

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
