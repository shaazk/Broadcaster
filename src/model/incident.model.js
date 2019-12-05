class Incident {
  constructor(createdBy, title, type, location, images, videos, comment, status = 'pending') {
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
export default Incident;
