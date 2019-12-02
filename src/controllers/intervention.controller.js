import returnMessage from '../helpers/response.helper';
import db from '../db/db';

const interventionController = {

  getAllInterventions: async (req, res) => {
    try {
      const query = await db.userSelectBy('INCIDENT', 'type', 'intervention', req.user.userid);
      const interventions = query.rows;

      return returnMessage(res, 200, { interventions });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
  getSpecificIntervention: async (req, res) => {
    try {
      const query = await db.userSelectBy('INCIDENT', 'incidentid', req.params.incidentId, req.user.userid);
      const intervention = query.rows[0];
      if (!intervention || intervention.type !== 'intervention') {
        return returnMessage(res, 404, {
          success: false,
          message: 'The intervention does not exist, check your ID',
        });
      }
      return returnMessage(res, 200, {
        success: true,
        details: intervention,
      });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
};

export default interventionController;
