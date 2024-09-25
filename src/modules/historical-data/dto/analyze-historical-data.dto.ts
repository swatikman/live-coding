import {BinanceIntervalEnum, BinanceSymbolEnum} from "../../../integrations/binance/binance.type";

export type AnalyzeHistoricalDataDto = {
  symbol: BinanceSymbolEnum,
  interval: BinanceIntervalEnum,
}

export type AnalyzeHistoricalDataResponseDto = {
  symbol: BinanceSymbolEnum,
  interval: BinanceIntervalEnum,
  timestampFrom: number,
  timestampTo: number,
  priceChange: number,
  priceChangeInPercent: number,
  priceChangeDirection: PriceChangeDirectionEnum
}

export enum PriceChangeDirectionEnum {
  INCREASE = 'increase',
  DECREASE = 'decrease',
  EQUAL = 'equal',
}