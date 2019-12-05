import returnMessage from '../helpers/response.helper';
import Incident from '../model/incident.model';
import db from '../db/db';

const incidentController = {
  createIncident: async (req, res) => {
    try {
      const {
        title, type, location, images, videos, comment,
      } = req.body;

      const userIncident = new Incident(
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
      const incident = query.rows[0];
      return returnMessage(res, 201, `Created ${userIncident.type} record`, incident);
    } catch (error) {
      return returnMessage(res, 400, error.details[0].message);
    }
  },

  updateComment: async (req, res) => {
    try {
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
        return returnMessage(res, 200, 'Updated red-flag record’s comment', query.rows[0]);
      }
      return returnMessage(res, 404, 'Incident not found');
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
  updateLocation: async (req, res) => {
    try {
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
        return returnMessage(res, 200, 'Updated red-flag record’s location', query.rows[0]);
      }
      return returnMessage(res, 404, 'Incident not found');
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
        return returnMessage(res, 200, 'Red-flag successfully deleted');
      }

      return returnMessage(res, 404, 'invalid ID');
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
  updateStatus: async (req, res) => {
    try {
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
        return returnMessage(res, 200, 'Updated incident record’s status', query.rows[0]);
      }
      return returnMessage(res, 404, 'Incident not found');
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
};
export default incidentController;
