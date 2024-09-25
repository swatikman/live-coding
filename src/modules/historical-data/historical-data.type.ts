import Joi from "joi";
import {BinanceIntervalEnum, BinanceSymbolEnum} from "../../integrations/binance/binance.type";

export const analyzeSchema = Joi.object().keys({
  symbol: Joi.string().required().valid(...Object.values(BinanceSymbolEnum)),
  interval: Joi.string().required().valid(...Object.values(BinanceIntervalEnum)),
});