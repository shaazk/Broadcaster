/* eslint-disable import/prefer-default-export */
export class Incident {
  constructor(IncidentId, createdOn, createdBy, title, type, location, status = 'pending', images, videos, comment) {
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
  }
}
