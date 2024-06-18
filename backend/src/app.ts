import express, { json, urlencoded,Response as ExResponse, Request as ExRequest } from "express";
import { RegisterRoutes } from "../build/routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";


dotenv.config();

const app = express();

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tsoa-db")
// .then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

RegisterRoutes(app);

export { app };
