export interface BlockAPIResponse {
  hash: string
  tx: TransactionAPIResponse[]
}

export interface TransactionAPIResponse {
  hash: string
  size: number // in Bytes according to https://learnmeabitcoin.com/technical/transaction/size/#bytes
}

export interface BlocksForADayAPIResponse {
  date: Date
  blocks: BlockForADayAPIResponse[]
}

export interface BlockForADayAPIResponse {
  hash: string
}