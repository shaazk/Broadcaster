"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incidents = exports.users = void 0;

var _user = _interopRequireDefault(require("../model/user.model"));

var _incident = require("../model/incident.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = [new _user["default"](1234567890123459, 'Mutesi Sharon K', 'sharonuase@gmail.com', '$2b$10$VwsjGOc.e9fzfMdHrm5PTOsFs3dtJ8bxe9bT.PJBWNTdfllyGmM2S', 'tesi', 'admin')];
exports.users = users;
var incidents = [new _incident.Incident(1, '12/12/09', '1234567890123456', 'Corruption', 'Redflag', 'kicukiro', 'pending', 'w.png', 'w.mp4', ' Veda is very corrupt')];
exports.incidents = incidents;