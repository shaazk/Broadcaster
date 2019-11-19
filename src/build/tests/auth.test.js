"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

describe('auth:', function () {
  var data = {
    userId: '1234567890123456',
    fullname: 'sharon k',
    email: 'sharonuashy@gmail.com',
    password: 'jhjjhgjhg',
    PhoneNumber: '5657657',
    username: 'tesi'
  };
  it('should create new user.', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(data).end(function (_err, res) {
      _chai["default"].expect(res.status).to.eq(201);

      done();
    });
  });
  it('should return error if all required fields are not supplied', function (done) {
    var userData = {
      userId: '1234567890123456',
      fullname: 'sharon k',
      email: 'sharonuashy@gmail.com',
      password: 'jhjjhgjhg',
      PhoneNumber: '5657657',
      username: ''
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(userData).end(function (err, res) {
      _chai["default"].expect(res.status).to.eq(409);

      done();
    });
  });
  it('should return error if email already exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(data).end(function (err, res) {
      _chai["default"].expect(res.status).to.eq(409);

      done();
    });
  });
  it('should return a token and user details', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'sharonuashy@gmail.com',
      password: 'jhjjhgjhg'
    }).then(function (res) {
      _chai["default"].expect(res.status).to.eq(200);
    })["catch"](function (error) {
      throw error;
    });
  });
});