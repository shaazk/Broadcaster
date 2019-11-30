import { incidents } from '../db/data';
import returnMessage from '../helpers/response.helper';

const redflagController = {
  getAllRedflags: (req, res) => {
    try {
      const redflags = incidents.filter(
        (redflag) => redflag.type === 'redflag' && redflag.createdBy === req.user.userId,
      );
      return returnMessage(res, 200, { redflags });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },
  getSpecificRedflag: (req, res) => {
    try {
      const redflag = incidents.find(
        (item) => item.incidentId.toString() === req.params.incidentId,
      );
      if (!redflag || redflag.type !== 'redflag') {
        return returnMessage(res, 404, {
          success: false,
          message: 'The red-flag does not exist, check your ID',
        });
      }
      return returnMessage(res, 200, {
        success: true,
        details: redflag,
      });
    } catch (error) {
      return returnMessage(res, 500, 'Internal server error');
    }
  },

};
export default redflagController;
