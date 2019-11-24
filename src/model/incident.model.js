/* eslint-disable import/prefer-default-export */
export class Incident {
  constructor(IncidentId, createdOn, createdBy, title, type, location, images, videos, comment, status = 'pending') {
    this.incidentId = IncidentId;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.title = title;
    this.type = type;
    this.location = location;
    this.images = images;
    this.videos = videos;
    this.comment = comment;
    this.status = status;
  }
}
