import { expect, test } from 'vitest'
import {calculateTransactionEnergyConsumptionForBlock} from "../src/service/energy_calculation";
import {BlockAPIResponse, TransactionAPIResponse} from "../src/blockchain_api/types";

test('calculate energy consumption of a block and its transactions', async () => {
  const transactionAPIResponse: TransactionAPIResponse[] = [
    {
      hash: 'tx1',
      size: 1 // in Bytes according to https://learnmeabitcoin.com/technical/transaction/size/#bytes
    },
    {
      hash: 'tx2',
      size: 2.5
    }
  ]
  const blockAPIResponse: BlockAPIResponse = {
    hash: '1',
    tx: transactionAPIResponse
  }
  
  let energyConsumptionBlock = calculateTransactionEnergyConsumptionForBlock(blockAPIResponse)
  
  expect(energyConsumptionBlock.blockHash).toBe('1')
  expect(energyConsumptionBlock.transactions[0].transactionHash).toBe('tx1')
  expect(energyConsumptionBlock.transactions[0].energyConsumption).toBe(4.56)
  expect(energyConsumptionBlock.transactions[0].energyConsumptionUnit).toBe('kWh')
  expect(energyConsumptionBlock.transactions[1].transactionHash).toBe('tx2')
  expect(energyConsumptionBlock.transactions[1].energyConsumption).toBeCloseTo(11.4)
  expect(energyConsumptionBlock.transactions[1].energyConsumptionUnit).toBe('kWh')
});