export type FetchKLinesArgs = {
  symbol: BinanceSymbolEnum,
  interval?: BinanceIntervalEnum,
  startTime?: number,
  endTime?: number,
}

export enum BinanceSymbolEnum {
  BTC_USDT = 'BTCUSDT',
  ETH_USDT = 'ETHUSDT',
}

export enum BinanceIntervalEnum {
  ONE_SECOND = '1s',
  ONE_MINUTE = '1m',
  THREE_MINUTES = '3m',
  FIVE_MINUTES = '5m',
  FIFTEEN_MINUTES = '15m',
  THIRTY_MINUTES = '30m',
  ONE_HOUR = '1h',
  TWO_HOURS = '2h',
  FOUR_HOURS = '4h',
  SIX_HOURS = '6h',
  EIGHT_HOURS = '8h',
  TWELVE_HOURS = '12h',
  ONE_DAY = '1d',
  THREE_DAYS = '3d',
  ONE_WEEK = '1w',
  ONE_MONTH = '1M',
}

export type BinanceKLine = [number, string, string, string, string, string, number, string, number, string, string, string]

export type KLine = {
  klineOpenTime: number,
  openPrice: number,
  highPrice: number,
  lowPrice: number,
  closePrice: number,
  volume: string,
  klineCloseTime: number,
  quoteAssetVolume: number,
  numberOfTrades: number,
  takerBuyBaseAssetVolume: string,
  takerBuyQuoteAssetVolume: string
}