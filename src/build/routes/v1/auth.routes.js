"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../../controllers/auth.controller"));

var _auth2 = require("../../middleware/auth.middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/auth/signup', _auth2.ifExist, _auth["default"].signup);
router.post('/auth/signin', _auth["default"].signin);
var _default = router;
exports["default"] = _default;