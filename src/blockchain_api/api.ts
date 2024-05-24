import fetch from "node-fetch";
import {BlockAPIResponse} from "./types";

export async function fetchBlockWithHash(hash: string): Promise<BlockAPIResponse> {
  const response = await fetch('https://blockchain.info/rawblock/' + hash);
  return (await response.json()) as BlockAPIResponse;
}