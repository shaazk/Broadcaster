import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/v1/auth.routes';
import incidentRouter from './routes/v1/incident.routes';


dotenv.config();

const app = express();

// extracting body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router middleware
app.use('/api/v1', router, incidentRouter);
app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'this is my default route',
  });
});

export default app;
