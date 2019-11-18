"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _data = require("../db/data");

var _user = _interopRequireDefault(require("../model/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = {
  signup: _joi["default"].object({
    userId: _joi["default"].number().min(16).required(),
    fullname: _joi["default"].string().min(8).required(),
    email: _joi["default"].string().min(6).required().email(),
    password: _joi["default"].string().min(8).required(),
    PhoneNumber: _joi["default"].number().min(10).required(),
    username: _joi["default"].string().min(3).required()
  }),
  signin: _joi["default"].object({
    email: _joi["default"].string().min(6).required().email(),
    password: _joi["default"].string().min(8).required()
  })
};
var userController = {
  signup: function signup(req, res) {
    var salt, password, user, genToken;
    return regeneratorRuntime.async(function signup$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(schema.signup.validateAsync(req.body));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(400).send({
              status: 400,
              message: _context.t0.details[0].message
            }));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

          case 10:
            salt = _context.sent;
            _context.next = 13;
            return regeneratorRuntime.awrap(_bcrypt["default"].hash(req.body.password, salt));

          case 13:
            password = _context.sent;
            console.log(password);
            user = new _user["default"](req.body.userId, req.body.fullname, req.body.email, password, req.body.PhoneNumber, req.body.username);

            _data.users.push(user);

            genToken = _jsonwebtoken["default"].sign({
              email: user.email,
              ignoreExpiration: true
            }, process.env.KEY);
            return _context.abrupt("return", res.status(201).send({
              status: 201,
              message: 'User created successfully',
              token: genToken,
              data: {
                userId: user.userId,
                fullname: user.fullname,
                email: user.email,
                PhoneNumber: user.PhoneNumber,
                username: user.username
              }
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  },
  signin: function signin(req, res) {
    var loggedUser, isPasswordCorrect, genToken;
    return regeneratorRuntime.async(function signin$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(schema.signin.validateAsync(req.body));

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(400).send({
              status: 400,
              message: _context2.t0.details[0].message
            }));

          case 8:
            loggedUser = _data.users.find(function (user) {
              return user.email === req.body.email;
            });
            _context2.next = 11;
            return regeneratorRuntime.awrap(_bcrypt["default"].compare(req.body.password, loggedUser.password));

          case 11:
            isPasswordCorrect = _context2.sent;

            if (!(loggedUser && isPasswordCorrect)) {
              _context2.next = 15;
              break;
            }

            genToken = _jsonwebtoken["default"].sign({
              email: loggedUser.email,
              ignoreExpiration: true
            }, process.env.KEY);
            return _context2.abrupt("return", res.status(200).send({
              status: 200,
              message: 'User is successfully logged in',
              token: genToken,
              data: {
                userId: loggedUser.userId,
                fullname: loggedUser.fullname,
                email: loggedUser.email,
                PhoneNumber: loggedUser.PhoneNumber,
                username: loggedUser.username
              }
            }));

          case 15:
            return _context2.abrupt("return", res.status(404).send({
              status: 404,
              message: 'Your email or password is incorrect.'
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 5]]);
  }
};
var _default = userController;
exports["default"] = _default;