import { expect, test } from 'vitest'
import {provideDatesForLastDays} from "./date_mapping";

test('create array of dates of the last 5 days', async () => {
  let dates = provideDatesForLastDays(5)
  expect(dates.length).toBe(5)
  
  const today = new Date()
  expect(dates[0].getDate()).toStrictEqual(today.getDate())
  expect(dates[1].getDate()).toStrictEqual(today.getDate() - 4)
  expect(dates[2].getDate()).toStrictEqual(today.getDate() - 3)
  expect(dates[3].getDate()).toStrictEqual(today.getDate() - 2)
  expect(dates[4].getDate()).toStrictEqual(today.getDate() - 1)
});

test('zero or negative days should produce an empty date array', async () => {
  expect(provideDatesForLastDays(0).length).toBe(0)
  expect(provideDatesForLastDays(-5).length).toBe(0)
})