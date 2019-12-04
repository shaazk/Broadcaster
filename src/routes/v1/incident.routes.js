import express from 'express';
import incidentController from '../../controllers/incident.controller';
import redflagController from '../../controllers/redflag.controller';
import interventionController from '../../controllers/intervention.controller';
import verifyToken from '../../middleware/token.middleware';
import validateIncident from '../../middleware/incident.middleware';

const router = express.Router();
// full incident
router.post('/incident', verifyToken, validateIncident, incidentController.createIncident);
router.patch('/incident/:incidentId/comment', verifyToken, incidentController.updateComment);
router.patch('/incident/:incidentId/location', verifyToken, incidentController.updateLocation);
router.delete('/incident/:incidentId', verifyToken, incidentController.deleteIncident);

// red-flags
router.get('/red-flags', verifyToken, redflagController.getAllRedflags);
router.get('/red-flags/:incidentId', verifyToken, redflagController.getSpecificRedflag);

// interventions
router.get('/interventions', verifyToken, interventionController.getAllInterventions);
router.get('/interventions/:incidentId', verifyToken, interventionController.getSpecificIntervention);

// Admin
router.patch('/incident/:incidentId/status', verifyToken, incidentController.updateStatus);

export default router;
