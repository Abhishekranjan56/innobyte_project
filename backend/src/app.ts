import express, { json, urlencoded,Response as ExResponse, Request as ExRequest } from "express";
import { RegisterRoutes } from "../build/routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
var cors = require('cors')



dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ranjanab321:BkCfsAukgNZpiGxJ@cluster0.winioyv.mongodb.net/")
.then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use(cors());


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
app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,POST,PUT,DELETE',  
  allowedHeaders: 'Content-Type,Authorization', 
  credentials: true, 
}));


RegisterRoutes(app);

export { app };
