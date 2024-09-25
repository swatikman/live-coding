import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import HistoricalDataController from "./modules/historical-data/historical-data.controller";
import {errorHandlerMiddleware} from "./common/middlewares/error-handler.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  return res.send({ status: "ok" });
});

app.use('/historical-trades', HistoricalDataController)

app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});