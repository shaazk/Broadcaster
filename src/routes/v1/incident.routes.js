import express from "express";
import {incidentController} from "../../controllers/incident.controller";
import verifyToken from "../../middleware/token.middleware"

const router = express.Router();

router.post("/red-flags", verifyToken, incidentController.createIncident);
export default router;