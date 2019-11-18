"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(userId, fullname, email, password, PhoneNumber, username) {
  var role = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'citizen';

  _classCallCheck(this, User);

  this.userId = userId;
  this.fullname = fullname;
  this.email = email;
  this.password = password;
  this.PhoneNumber = PhoneNumber;
  this.username = username;
  this.role = role;
};

var _default = User;
exports["default"] = _default;