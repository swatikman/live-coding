import axios from "axios";
import {BinanceKLine, FetchKLinesArgs, KLine} from "./binance.type";

export async function fetchKLines(args: FetchKLinesArgs): Promise<BinanceKLine[]> {
  const response = await axios.get<BinanceKLine[]>('https://api.binance.com/api/v3/klines', {
    params: args,
  });
  return response.data;
}
