"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incidentController = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _data = require("../db/data");

var _incident = require("../model/incident.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/prefer-default-export */

/* eslint-disable max-len */

/* eslint-disable eqeqeq */

/* eslint-disable comma-dangle */
var schema = {
  createIncident: _joi["default"].object({
    createdOn: _joi["default"].date().required(),
    createdBy: _joi["default"].number().min(16).required(),
    title: _joi["default"].string().min(3).required(),
    type: _joi["default"].string().min(7).required(),
    location: _joi["default"].string().min(3).required(),
    status: _joi["default"].string().min(3).required(),
    images: _joi["default"].array().required(),
    videos: _joi["default"].array().required(),
    comment: _joi["default"].string().min(3).required()
  })
};
var incidentController = {
  createIncident: function createIncident(req, res) {
    var userIncident;
    return regeneratorRuntime.async(function createIncident$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(schema.createIncident.validateAsync(req.body));

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
            userIncident = new _incident.Incident(_data.incidents.length + 1, req.body.createdOn, req.user.userId, req.body.title, req.body.type, req.body.location, req.body.status, req.body.images, req.body.videos, req.body.comment);

            _data.incidents.push(userIncident);

            return _context.abrupt("return", res.status(201).send({
              status: 201,
              data: {
                id: userIncident.incidentId,
                message: "Created ".concat(userIncident.type, " record")
              }
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  },
  updateComment: function updateComment(req, res) {
    if (req.user.role === 'citizen') {
      var index = _data.incidents.findIndex(function (item) {
        return item.incidentId.toString() === req.params.incidentId;
      });

      if (index > -1) {
        if (_data.incidents[index].status != 'pending') {
          return res.status(404).json({
            status: 404,
            data: {
              message: 'You are not allowed to update this incident'
            }
          });
        }

        _data.incidents[index].comment = req.body.comment;
        return res.status(200).json({
          status: 200,
          data: {
            message: 'Updated red-flag record’s comment'
          }
        });
      }

      return res.status(404).json({
        status: 404,
        data: {
          message: 'Incident not found'
        }
      });
    }

    return res.status(401).json({
      status: 401,
      data: {
        message: 'Unauthorised access'
      }
    });
  },
  updateLocation: function updateLocation(req, res) {
    if (req.user.role === 'citizen') {
      var index = _data.incidents.findIndex(function (item) {
        return item.incidentId.toString() === req.params.incidentId;
      });

      if (index > -1) {
        if (_data.incidents[index].status != 'pending') {
          return res.status(404).json({
            status: 404,
            data: {
              message: 'You are not allowed to update this incident'
            }
          });
        }

        _data.incidents[index].location = req.body.location;
        return res.status(200).json({
          status: 200,
          data: {
            message: 'Updated red-flag record’s location'
          }
        });
      }

      return res.status(404).json({
        status: 404,
        data: {
          message: 'Incident not found'
        }
      });
    }

    return res.status(401).json({
      status: 401,
      data: {
        message: 'Unauthorised access'
      }
    });
  },
  getAllRedflags: function getAllRedflags(req, res) {
    var redflags = _data.incidents.filter(function (user) {
      return user.type === 'redflag';
    });

    return res.status(200).send({
      status: 200,
      data: redflags
    });
  },
  getSpecificRedflag: function getSpecificRedflag(req, res) {
    var redflag = _data.incidents.find(function (item) {
      return item.incidentId.toString() === req.params.incidentId;
    });

    if (!redflag || redflag.type !== 'redflag') {
      return res.status(404).send({
        success: false,
        message: 'The red-flag does not exist, check your ID'
      });
    }

    return res.status(200).send({
      success: true,
      details: redflag
    });
  },
  deleteRedflag: function deleteRedflag(req, res) {
    var deleteRedFlag = _data.incidents.findIndex(function (item) {
      return item.incidentId.toString() === req.params.incidentId;
    });

    if (deleteRedFlag > -1) {
      if (_data.incidents[deleteRedFlag].status != 'pending') {
        return res.status(404).json({
          status: 404,
          data: {
            message: 'You are not allowed to update this incident'
          }
        });
      }

      _data.incidents.splice(deleteRedFlag, 1);

      return res.status(200).send({
        status: 200,
        data: {
          message: 'Red-flag successfully deleted'
        }
      });
    }

    return 0;
  }
};
exports.incidentController = incidentController;