"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _auth = _interopRequireDefault(require("./routes/v1/auth.routes"));

var _incident = _interopRequireDefault(require("./routes/v1/incident.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); // extracting body

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // accept static files like images
// app.use(express.static(`${__dirname}/`))
// router middleware

app.use('/api/v1', _auth["default"], _incident["default"]);
var _default = app;
exports["default"] = _default;