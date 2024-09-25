import axios from "axios";
import {BinanceKLine, FetchKLinesArgs} from "./binance.type";

const BASE_URL = 'https://api.binance.com'

export async function fetchKLines(args: FetchKLinesArgs): Promise<BinanceKLine[]> {
  const response = await axios.get<BinanceKLine[]>(`${BASE_URL}/api/v3/klines`, {
    params: args,
  });
  return response.data;
}
