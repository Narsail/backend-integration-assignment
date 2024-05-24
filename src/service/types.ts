export interface Block {
  blockHash: string,
  transactions: Transaction[]
}

export interface Transaction {
  transactionHash: string,
  energyConsumption: number,
  energyConsumptionUnit: string
//  blockHash: string
}