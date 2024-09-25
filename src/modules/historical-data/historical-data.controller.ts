import {Router, Response, Request} from "express";
import {AnalyzeHistoricalDataDto} from "./dto/analyze-historical-data.dto";
import {analyzeHistoricalData} from "./historical-data.service";
import {analyzeSchema} from "./historical-data.type";
import {validator} from "../../common/validator";

const router = Router();

router.get('/', validator.query(analyzeSchema), async (req: Request<undefined, undefined, undefined, AnalyzeHistoricalDataDto>, res: Response) => {
  res.send(await analyzeHistoricalData(req.query))
})

export default router