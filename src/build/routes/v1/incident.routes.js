"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _incident = require("../../controllers/incident.controller");

var _token = _interopRequireDefault(require("../../middleware/token.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/red-flags', _token["default"], _incident.incidentController.createIncident);
router.patch('/red-flags/:incidentId/comment', _token["default"], _incident.incidentController.updateComment);
router.patch('/red-flags/:incidentId/location', _token["default"], _incident.incidentController.updateLocation);
router.get('/red-flags', _token["default"], _incident.incidentController.getAllRedflags);
router.get('/red-flags/:incidentId', _token["default"], _incident.incidentController.getSpecificRedflag);
router["delete"]('/red-flags/:incidentId', _token["default"], _incident.incidentController.deleteRedflag);
var _default = router;
exports["default"] = _default;