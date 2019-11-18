"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _data = require("../db/data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var token = req.header('token');

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Please sign in first.'
    });
  }

  try {
    var verified = _jsonwebtoken["default"].verify(token, process.env.KEY);

    var user = _data.users.find(function (user) {
      return user.email === verified.email;
    });

    if (!user) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid token!'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: 'Invalid token!'
    });
  }

  return 0;
};

var _default = verifyToken;
exports["default"] = _default;