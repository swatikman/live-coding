import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {fetchKLines} from "./integrations/binance/binance.service";
import {BinanceIntervalEnum, BinanceSymbolEnum} from "./integrations/binance/binance.type";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  await fetchKLines({
    symbol: BinanceSymbolEnum.BTC_USDT,
    interval: BinanceIntervalEnum.ONE_HOUR
  })
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});