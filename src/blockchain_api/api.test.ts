import { expect, test } from 'vitest'
import {fetchBlocksFromAPIForDate, fetchBlockFromAPIWithHash} from "./api";

test('standard block api response', async () => {
  const blockAPIResponse = await fetchBlockFromAPIWithHash('0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103')
  expect(blockAPIResponse.hash).toBe('0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103')
  expect(blockAPIResponse.tx.length).toBe(22)
});

test('standard blocks for a day api response', async () => {
  let exampleDate = new Date("01/01/2024 16:00:00")
  const blocksForADayResponse = await fetchBlocksFromAPIForDate(exampleDate)
  expect(blocksForADayResponse.blocks.length).toBeGreaterThan(0)
  expect(blocksForADayResponse.date).toBe(exampleDate)
})