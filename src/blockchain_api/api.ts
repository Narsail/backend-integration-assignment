import { RateLimiter } from "limiter";
import fetch from "node-fetch";
import {BlockAPIResponse, BlockForADayAPIResponse, BlocksForADayAPIResponse} from "./types"

// Rate Limiting to one request every 250ms
const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 250 });
export async function fetchBlockWithHash(hash: string): Promise<BlockAPIResponse> {
  await limiter.removeTokens(1);
  const response = await fetch('https://blockchain.info/rawblock/' + hash);
  const jsonObject = await response.json();
  return jsonObject as BlockAPIResponse
}

export async function fetchBlocksForDate(date: Date): Promise<BlocksForADayAPIResponse> {
  const response = await fetch(' https://blockchain.info/blocks/' + date.getTime() + '?format=json');

  return {
    blocks: (await response.json()) as BlockForADayAPIResponse[],
    date: date
  }
}
