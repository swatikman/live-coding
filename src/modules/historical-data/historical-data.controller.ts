import {Router, Response, Request} from "express";
import {AnalyzeHistoricalDataDto} from "./dto/analyze-historical-data.dto";
import {analyzeHistoricalData} from "./historical-data.service";
import {analyzeSchema} from "./historical-data.type";
import {validator} from "../../common/validators";
import {asyncHandler} from "../../common/handlers";

const router = Router();

router.get('/', validator.query(analyzeSchema), asyncHandler(async (req: Request<undefined, undefined, undefined, AnalyzeHistoricalDataDto>, res: Response) => {
  res.send(await analyzeHistoricalData(req.query))
}))

export default router