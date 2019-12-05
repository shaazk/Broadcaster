import express from 'express';
import incidentController from '../../controllers/incident.controller';
import redflagController from '../../controllers/redflag.controller';
import interventionController from '../../controllers/intervention.controller';
import verifyToken from '../../middleware/token.middleware';
import { isCitizen, isAdmin } from '../../middleware/auth.middleware';
import validateIncident from '../../middleware/incident.middleware';


const router1 = express.Router();
// full incident
router1.post('/incident', verifyToken, isCitizen, validateIncident, incidentController.createIncident);
router1.patch('/incident/:incidentId/comment', verifyToken, isCitizen, incidentController.updateComment);
router1.patch('/incident/:incidentId/location', verifyToken, isCitizen, incidentController.updateLocation);
router1.get('/interventions/:incidentId', verifyToken, isCitizen, interventionController.getSpecificIntervention);
router1.delete('/incident/:incidentId', verifyToken, isCitizen, incidentController.deleteIncident);

// red-flags
router1.get('/red-flags', verifyToken, isCitizen, redflagController.getAllRedflags);
router1.get('/red-flags/:incidentId', verifyToken, isCitizen, redflagController.getSpecificRedflag);

// interventions
router1.get('/interventions', verifyToken, isCitizen, interventionController.getAllInterventions);
router1.get('/interventions/:incidentId', verifyToken, isCitizen, interventionController.getSpecificIntervention);

// Admin
router1.patch('/incident/:incidentId/status', verifyToken, isAdmin, incidentController.updateStatus);

export default router1;
