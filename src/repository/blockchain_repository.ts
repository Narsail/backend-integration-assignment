import {fetchBlockFromAPIWithHash, fetchBlocksFromAPIForDate} from "../blockchain_api/api";
import { BlockAPIResponse, BlocksForADayAPIResponse } from "../blockchain_api/types";

import { createClient, _RedisClientType } from 'redis';

let client: _RedisClientType | null = null;

async function connectRedis(): _RedisClientType {
//  return createClient()
  return createClient({url: `redis://redis:6379`})
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
}

export async function fetchBlockWithHash(hash: string): Promise<BlockAPIResponse> {
  if (client == null) {
    client = await connectRedis()
  }
  
  if (client) {
    const value = await client.get(hash);
    if (value) {
      const apiResponse = JSON.parse(value) as BlockAPIResponse
      if (apiResponse) {
        console.log("Fetched response for " + hash + " from Redis Cache.")
        return apiResponse
      }
    }
  }
  
  console.log("Could not find cache for " + hash + ", will fetch from API instead.")
  return fetchBlockFromAPIWithHash(hash)
    .then(apiResponse => {
      if (client) {
        console.log("Save response of " + hash + " to Redis Cache.")
        client.set(hash, JSON.stringify(apiResponse))
      }
      return apiResponse
    });
}

export async function fetchBlocksForDate(date: Date): Promise<BlocksForADayAPIResponse> {
  return fetchBlocksFromAPIForDate(date)
}