/* eslint-disable max-len */
import { incidents } from '../db/data';
// eslint-disable-next-line import/prefer-default-export
export const interventionController = {

  getAllInterventions: (req, res) => {
    const interventions = incidents.filter((user) => user.type === 'intervention');
    return res.status(200).send({
      status: 200,
      data: interventions,
    });
  },
  getSpecificIntervention: (req, res) => {
    const intervention = incidents.find((item) => item.incidentId.toString() === req.params.incidentId);
    if (!intervention || intervention.type !== 'intervention') {
      return res.status(404).send({
        success: false,
        message: 'The intervention does not exist, check your ID',
      });
    }
    return res.status(200).send({
      success: true,
      details: intervention,
    });
  },
};
