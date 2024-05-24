import { expect, test } from 'vitest'
import {fetchBlockWithHash} from "../src/blockchain_api/api";

test('standard block api response', async () => {
  const blockAPIResponse = await fetchBlockWithHash('0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103')
  expect(blockAPIResponse.hash).toBe('0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103')
  expect(blockAPIResponse.tx.length).toBe(22)
});