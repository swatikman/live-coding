import {AnalyzeHistoricalDataDto, AnalyzeHistoricalDataResponseDto} from "./dto/analyze-historical-data.dto";
import {fetchKLines} from "../../integrations/binance/binance.service";
import {BinanceIntervalEnum, BinanceKLine, BinanceSymbolEnum, KLine} from "../../integrations/binance/binance.type";

export async function analyzeHistoricalData(data: AnalyzeHistoricalDataDto): Promise<AnalyzeHistoricalDataResponseDto> {
  const binanceKLines = await fetchKLines({
    symbol: data.symbol,
    interval: data.interval
  });
  const formattedKLines = binanceKLines.map(binanceKLine => convertKLineToObject(binanceKLine));
  const firstKLine = formattedKLines[0];
  const lastKline = formattedKLines[formattedKLines.length - 1];
  const priceChange = formattedKLines[0].closePrice - lastKline.closePrice;

  let priceChangeDirection: 'increase' | 'decrease' | 'equal' = 'equal';
  let priceChangeInPercent: number = 0;
  if (priceChange > 0) {
    priceChangeDirection = 'increase';
    priceChangeInPercent = (lastKline.klineCloseTime - firstKLine.klineOpenTime) / firstKLine.klineOpenTime * 100;
  } else if (priceChange < 0) {
    priceChangeDirection = 'decrease';
    priceChangeInPercent = (firstKLine.klineCloseTime - lastKline.klineOpenTime) / firstKLine.klineOpenTime * 100;
  }

  return {
    symbol: data.symbol,
    interval: data.interval,
    timestampFrom: firstKLine.klineOpenTime,
    timestampTo: lastKline.klineCloseTime,
    priceChangeDirection,
    priceChange,
    priceChangeInPercent,
  };
}


function convertKLineToObject(kLine: BinanceKLine): KLine {
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