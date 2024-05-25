import {BlockAPIResponse, TransactionAPIResponse} from "../blockchain_api/types";
import {Block, EnergyConsumptionOfDay, Transaction} from "./types";

export function calculateTransactionEnergyConsumptionForBlock(apiResponse: BlockAPIResponse): Block {
  return {
    blockHash: apiResponse.hash,
    transactions: apiResponse.tx.map(calculateTransactionEnergyConsumption)
  }
}

function calculateTransactionEnergyConsumption(transaction: TransactionAPIResponse): Transaction {
  return {
    transactionHash: transaction.hash,
    energyConsumption: transaction.size * 4.56,
    energyConsumptionUnit: "kWh"
  }
}

export function calculateEnergyConsumptionOfBlocks(blocks: BlockAPIResponse[], forDay: Date): EnergyConsumptionOfDay {
  const totalEnergyConsumption = blocks
    .map(calculateTransactionEnergyConsumptionForBlock)
    .flatMap(block => { return block.transactions })
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.energyConsumption,
      0
    )
  return {
    dateInMilliseconds: forDay,
    energyConsumption: totalEnergyConsumption,
    energyConsumptionUnit: "kWh"
  }
}