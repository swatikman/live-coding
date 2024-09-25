import { Router, Response, Request } from "express";
import {AnalyzeHistoricalDataDto} from "./dto/analyze-historical-data.dto";
import {analyzeHistoricalData} from "./historical-data.service";

const router = Router();

router.get('/', async (req: Request<undefined, undefined, undefined, AnalyzeHistoricalDataDto>, res, Response) => {
  await analyzeHistoricalData(req.query)
})

export default router