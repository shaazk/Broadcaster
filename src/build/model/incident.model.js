"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Incident = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable import/prefer-default-export */
var Incident = function Incident(IncidentId, createdOn, createdBy, title, type, location) {
  var status = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'pending';
  var images = arguments.length > 7 ? arguments[7] : undefined;
  var videos = arguments.length > 8 ? arguments[8] : undefined;
  var comment = arguments.length > 9 ? arguments[9] : undefined;

  _classCallCheck(this, Incident);

  this.incidentId = IncidentId;
  this.createdOn = createdOn;
  this.createdBy = createdBy;
  this.title = title;
  this.type = type;
  this.location = location;
  this.status = status;
  this.images = images;
  this.videos = videos;
  this.comment = comment;
};

exports.Incident = Incident;