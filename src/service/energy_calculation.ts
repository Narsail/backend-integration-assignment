import {BlockAPIResponse, TransactionAPIResponse} from "../blockchain_api/types";
import {Block, Transaction} from "./types";

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