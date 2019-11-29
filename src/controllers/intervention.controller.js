import { incidents } from '../db/data';
import returnMessage from '../helpers/response.helper';

const interventionController = {

  getAllInterventions: (req, res) => {
    const interventions = incidents.filter((intervention) => intervention.type === 'intervention' && intervention.createdBy === req.user.userId);
    return returnMessage(res, 200, { interventions });
  },
  getSpecificIntervention: (req, res) => {
    const intervention = incidents.find(
      (item) => item.incidentId.toString() === req.params.incidentId,
    );
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
  },
};

export default interventionController;
