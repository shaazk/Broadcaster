/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
import { incidents } from '../db/data';

export const redflagController = {
  getAllRedflags: (req, res) => {
    const redflags = incidents.filter((user) => user.type === 'redflag');
    return res.status(200).send({
      status: 200,
      data: redflags,
    });
  },
  getSpecificRedflag: (req, res) => {
    const redflag = incidents.find((item) => item.incidentId.toString() === req.params.incidentId);
    if (!redflag || redflag.type !== 'redflag') {
      return res.status(404).send({
        success: false,
        message: 'The red-flag does not exist, check your ID',
      });
    }
    return res.status(200).send({
      success: true,
      details: redflag,
    });
  },

};
