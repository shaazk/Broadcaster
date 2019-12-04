import returnMessage from '../helpers/response.helper';
// import { incidents } from '../db/data';
import Incident from '../model/incident.model';
import db from '../db/db';

const incidentController = {
  createIncident: async (req, res) => {
    try {
      const {
        createdOn, title, type, location, images, videos, comment,
      } = req.body;

      const userIncident = new Incident(
        1,
        createdOn,
        req.user.userid,
        title,
        type,
        location,
        images,
        videos,
        comment,
        'pending',
      );
      const query = await db.insertIntoIncident(userIncident);
      const { incidentid } = query.rows[0];
      return returnMessage(res, 201, {
        id: incidentid,
        message: `Created ${userIncident.type} record`,
      });
    } catch (error) {
      return returnMessage(res, 400, error.details[0].message);
    }
  },

  updateComment: async (req, res) => {
    try {
      if (req.user.role === 'citizen') {
        const { comment } = req.body;
        const { incidentId } = req.params;
        const { userid } = req.user;
        const query = await db.updateIncident(
          parseInt(incidentId, 0),
          'comment',
          comment,
          userid,
        );

        if (query.rowCount === 1) {
          return returnMessage(res, 200, {
            id: incidentId,
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
  updateLocation: async (req, res) => {
    try {
      if (req.user.role === 'citizen') {
        const { location } = req.body;
        const { incidentId } = req.params;
        const { userid } = req.user;
        const query = await db.updateIncident(
          parseInt(incidentId, 0),
          'location',
          location,
          userid,
        );
        if (query.rowCount === 1) {
          return returnMessage(res, 200, {
            id: incidentId,
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
      const { userid } = req.user;
      const { incidentId } = req.params;
      const query = await db.deleteIfExist(
        'incident',
        'incidentid',
        parseInt(incidentId, 0),
        userid,
      );

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
  updateStatus: async (req, res) => {
    try {
      if (req.user.role === 'admin') {
        const { status } = req.body;
        const { incidentId } = req.params;
        const { userid } = req.user;
        const query = await db.updateIncident(
          parseInt(incidentId, 0),
          'status',
          status,
          userid,
        );
        if (query.rowCount === 1) {
          return returnMessage(res, 200, {
            id: incidentId,
            message: 'Updated incident record’s status',
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
};
export default incidentController;
