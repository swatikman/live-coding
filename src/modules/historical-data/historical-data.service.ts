import {
  AnalyzeHistoricalDataDto,
  AnalyzeHistoricalDataResponseDto,
  PriceChangeDirectionEnum
} from "./dto/analyze-historical-data.dto";
import {fetchKLines} from "../../integrations/binance/binance.service";
import {convertKLineToObject} from "./historical-data.utils";

export async function analyzeHistoricalData(data: AnalyzeHistoricalDataDto): Promise<AnalyzeHistoricalDataResponseDto> {
  const binanceKLines = await fetchKLines({
    symbol: data.symbol,
    interval: data.interval
  });
  const formattedKLines = binanceKLines.map(binanceKLine => convertKLineToObject(binanceKLine));
  const firstKLine = formattedKLines[0];
  const lastKline = formattedKLines[formattedKLines.length - 1];
  const priceChange = formattedKLines[0].closePrice - lastKline.closePrice;

  let priceChangeDirection: PriceChangeDirectionEnum = PriceChangeDirectionEnum.EQUAL;
  let priceChangeInPercent: number = 0;
  if (priceChange > 0) {
    priceChangeDirection = PriceChangeDirectionEnum.INCREASE;
    priceChangeInPercent = (lastKline.klineCloseTime - firstKLine.klineOpenTime) / firstKLine.klineOpenTime * 100;
  } else if (priceChange < 0) {
    priceChangeDirection = PriceChangeDirectionEnum.DECREASE;
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
