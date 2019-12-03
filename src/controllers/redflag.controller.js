import returnMessage from '../helpers/response.helper';
import db from '../db/db';

const redflagController = {

  getAllRedflags: async (req, res) => {
    try {
      const query = await db.userSelectBy('INCIDENT', 'type', 'redflag', req.user.userid);
      const redflags = query.rows;

      return returnMessage(res, 200, { redflags });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
  getSpecificRedflag: async (req, res) => {
    try {
      const query = await db.userSelectBy('INCIDENT', 'incidentid', req.params.incidentId, req.user.userid);
      const incident = query.rows[0];
      if (!incident || incident.type !== 'redflag') {
        return returnMessage(res, 404, {
          success: false,
          message: 'The intervention does not exist, check your ID',
        });
      }
      return returnMessage(res, 200, {
        success: true,
        details: incident,
      });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
};
export default redflagController;
