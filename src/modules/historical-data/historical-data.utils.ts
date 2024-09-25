import {BinanceKLine, KLine} from "../../integrations/binance/binance.type";

export function convertKLineToObject(kLine: BinanceKLine): KLine {
  return {
    klineOpenTime: kLine[0],
    openPrice: parseFloat(kLine[1]),
    highPrice: parseFloat(kLine[2]),
    lowPrice: parseFloat(kLine[3]),
    closePrice: parseFloat(kLine[4]),
    volume: kLine[5],
    klineCloseTime: kLine[6],
    quoteAssetVolume: parseFloat(kLine[7]),
    numberOfTrades: kLine[8],
    takerBuyBaseAssetVolume: kLine[9],
    takerBuyQuoteAssetVolume: kLine[10]
  };
}