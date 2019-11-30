
import returnMessage from '../helpers/response.helper';
import { incidents } from '../db/data';
import Incident from '../model/incident.model';

const incidentController = {
  createIncident: async (req, res) => {
    try {
      const userIncident = new Incident(
        incidents.length + 1,
        req.body.createdOn,
        req.user.userId,
        req.body.title,
        req.body.type,
        req.body.location,
        req.body.images,
        req.body.videos,
        req.body.comment,
      );
      incidents.push(userIncident);
      return returnMessage(res, 201, {
        id: userIncident.incidentId,
        message: `Created ${userIncident.type} record`,
      });
    } catch (error) {
      return returnMessage(res, 400, error.details[0].message);
    }
  },

  updateComment: (req, res) => {
    try {
      if (req.user.role === 'citizen') {
        const index = incidents.findIndex(
          (item) => item.incidentId.toString() === req.params.incidentId,
        );
        if (index > -1) {
          if (incidents[index].status !== 'pending') {
            return returnMessage(res, 404, {
              message: 'You are not allowed to update this incident',
            });
          }

          incidents[index].comment = req.body.comment;
          return returnMessage(res, 200, {
            id: incidents[index].incidentId,
            message: 'Updated red-flag record’s comment',
          });
        }
        return returnMessage(res, 404, {
          message: 'Incident not found',
        });
      }
      return returnMessage(res, 401, {
        message: 'Unauthorised access',
      });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
  updateLocation: (req, res) => {
    try {
      if (req.user.role === 'citizen') {
        const index = incidents.findIndex(
          (item) => item.incidentId.toString() === req.params.incidentId,
        );
        if (index > -1) {
          if (incidents[index].status !== 'pending') {
            return returnMessage(res, 404, {
              message: 'You are not allowed to update this incident',
            });
          }

          incidents[index].location = req.body.location;
          return returnMessage(res, 200, {
            id: incidents[index].incidentId,
            message: 'Updated red-flag record’s location',
          });
        }
        return returnMessage(res, 404, {
          message: 'Incident not found',
        });
      }
      return returnMessage(res, 401, {
        message: 'Unauthorised access',
      });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
  deleteIncident: (req, res) => {
    try {
      const deleteRedFlag = incidents.findIndex(
        (item) => item.incidentId.toString() === req.params.incidentId,
      );
      if (deleteRedFlag > -1) {
        if (incidents[deleteRedFlag].status !== 'pending') {
          return returnMessage(res, 404, {
            id: incidents[deleteRedFlag].incidentId,
            message: 'You are not allowed to delete this incident',
          });
        }

        incidents.splice(deleteRedFlag, 1);
        return returnMessage(res, 200, {
          message: 'Red-flag successfully deleted',
        });
      }
      return returnMessage(res, 404, {
        message: 'invalid ID',
      });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },

};
export default incidentController;
