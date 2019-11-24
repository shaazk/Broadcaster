/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
import { incidents } from '../db/data';
import returnMessage from '../helpers/response.helper';

export const redflagController = {
  getAllRedflags: (req, res) => {
    const redflags = incidents.filter((redflag) => redflag.type === 'redflag' && redflag.createdBy === req.user.userId);
    return returnMessage(res, 200, { redflags, });
  },
  getSpecificRedflag: (req, res) => {
    const redflag = incidents.find((item) => item.incidentId.toString() === req.params.incidentId);
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
  },

};
