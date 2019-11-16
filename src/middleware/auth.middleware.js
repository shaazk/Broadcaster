import { users } from "../db/data";

export const ifExist = (req, res, next) => {
    const logUser = users.find(user => user.email === req.body.email);
    if(logUser){
      return res.status(409).send({
        status: 409,
        message: "Email already exists",
      });

    }
    next();
}