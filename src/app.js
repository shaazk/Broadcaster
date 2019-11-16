import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/v1/auth.routes";



dotenv.config();

const app = express();

// extracting body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

//accept static files like images
// app.use(express.static(`${__dirname}/`))

//router middleware
app.use("/api/v1", router);

export default app;