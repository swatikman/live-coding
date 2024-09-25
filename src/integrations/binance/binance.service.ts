import axios from "axios";
import {BinanceKLine, FetchKLinesArgs, KLine} from "./binance.type";

export async function fetchKLine(args: FetchKLinesArgs) {
  const val = await axios.get<BinanceKLine>('https://api.binance.com/api/v3/klines', {
    params: args,
  })
  return val;
}

function convertKLineToObject(kLine: BinanceKLine): KLine {
  return {
    klineOpenTime: kLine[0],
    openPrice: kLine[1],
    highPrice: kLine[2],
    lowPrice: kLine[3],
    closePrice: kLine[4],
    volume: kLine[5],
    klineCloseTime: kLine[6],
    quoteAssetVolume: kLine[7],
    numberOfTrades: kLine[8],
    takerBuyBaseAssetVolume: kLine[9],
    takerBuyQuoteAssetVolume: kLine[10]
  }
}