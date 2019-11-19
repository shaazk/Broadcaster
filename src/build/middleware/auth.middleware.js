"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ifExist = void 0;

var _data = require("../db/data");

/* eslint-disable import/prefer-default-export */

/* eslint-disable consistent-return */
var ifExist = function ifExist(req, res, next) {
  var logUser = _data.users.find(function (user) {
    return user.email === req.body.email;
  });

  if (logUser) {
    return res.status(409).send({
      status: 409,
      message: 'Email already exists'
    });
  }

  next();
};

exports.ifExist = ifExist;