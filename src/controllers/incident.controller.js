
import returnMessage from '../helpers/response.helper';
import { incidents } from '../db/data';
import Incident from '../model/incident.model';
import db from '../db/db';

const incidentController = {
  createIncident: async (req, res) => {
    try {
      const userIncident = new Incident(
        1,
        req.body.createdOn,
        req.user.userid,
        req.body.title,
        req.body.type,
        req.body.location,
        req.body.images,
        req.body.videos,
        req.body.comment,
        'pending',
      );
      const query = await db.insertIntoIncident(userIncident);
      return returnMessage(res, 201, {
        id: query.rows[0].incidentid,
        message: `Created ${userIncident.type} record`,
      });
    } catch (error) {
      return returnMessage(res, 400, error.details[0].message);
    }
  },

  updateComment: async (req, res) => {
    try {
      if (req.user.role === 'citizen') {
        const query = await db.updateIncident(parseInt(req.params.incidentId, 0), 'comment', req.body.comment, req.user.userid);

        if (query.rowCount === 1) {
          return returnMessage(res, 200, {
            id: req.params.incidentId,
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
  deleteIncident: async (req, res) => {
    try {
      const query = await db.deleteIfExist('incident', 'incidentid', parseInt(req.params.incidentId, 0), req.user.userid);

      if (query.rowCount === 1) {
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
