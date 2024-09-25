import {analyzeHistoricalData} from "./historical-data.service";
import {BinanceIntervalEnum, BinanceKLine, BinanceSymbolEnum} from "../../integrations/binance/binance.type";
import * as binanceService from "../../integrations/binance/binance.service";
import {describe} from "node:test";

describe('Historical data service', () => {
  beforeAll(() => {
    jest.mock('../../integrations/binance/binance.service');
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('function analyzeHistoricalData', () => {
    describe('fails', () => {
      it('should fail, fetchKLines method got rejected', async () => {
        jest.spyOn(binanceService, 'fetchKLines').mockImplementation(async () => Promise.reject('Wrong ACCESS_KEY'));

        await expect(analyzeHistoricalData({
          symbol: BinanceSymbolEnum.BTC_USDT,
          interval: BinanceIntervalEnum.ONE_HOUR,
        })).rejects.toEqual('Wrong ACCESS_KEY');
      })
    })

    describe('successful', () => {
      it('should be successful, fetchKLines returned valid data, price increase', async () => {
        const kLines: BinanceKLine[] = [
          [1725451200000,"50000.00000000","50000.99000000","50000.95000000","50000.00000000","776.26939000",1725454799999,"43949985.04994390",93706,"363.62337000","20590941.14061460","0"],
          [1725454800000,"60000.00000000","60000.00000000","60000.41000000","60000.00000000","1446.03410000",1725458399999,"81687899.57771600",192315,"740.04595000","41812275.07135860","0"]
        ];

        jest.spyOn(binanceService, 'fetchKLines').mockImplementation(async () => Promise.resolve(kLines));
        const result = await analyzeHistoricalData({
          symbol: BinanceSymbolEnum.BTC_USDT,
          interval: BinanceIntervalEnum.ONE_HOUR,
        })

        expect(result).toEqual({
          symbol: 'BTCUSDT',
          interval: '1h',
          timestampFrom: 1725451200000,
          timestampTo: 1725458399999,
          priceChangeDirection: 'increase',
          priceChange: 10000,
          priceChangeInPercent: 20
        })
      })
    })
  })

})