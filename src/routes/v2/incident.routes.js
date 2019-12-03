import express from 'express';
import incidentController from '../../controllers/incident.controller';
import redflagController from '../../controllers/redflag.controller';
import interventionController from '../../controllers/intervention.controller';
import verifyToken from '../../middleware/token.middleware';
import validateIncident from '../../middleware/incident.middleware';

const router1 = express.Router();
// full incident
router1.post('/incident', verifyToken, validateIncident, incidentController.createIncident);
router1.patch('/incident/:incidentId/comment', verifyToken, incidentController.updateComment);
router1.patch('/incident/:incidentId/location', verifyToken, incidentController.updateLocation);
router1.delete('/incident/:incidentId', verifyToken, incidentController.deleteIncident);

// red-flags
router1.get('/red-flags', verifyToken, redflagController.getAllRedflags);
router1.get('/red-flags/:incidentId', verifyToken, redflagController.getSpecificRedflag);

// interventions
router1.get('/interventions', verifyToken, interventionController.getAllInterventions);
router1.get('/interventions/:incidentId', verifyToken, interventionController.getSpecificIntervention);

export default router1;
