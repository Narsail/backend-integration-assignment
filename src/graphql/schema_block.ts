import { SchemaComposer } from 'graphql-compose'

export const schemaComposer = new SchemaComposer()

export const BlockWithTransactionEnergyConsumptionTC = schemaComposer.createObjectTC({
  name: 'BlockWithTransactionEnergyConsumption',
  fields: {
    blockHash: "String!",
    transactions: "[TransactionWithConsumption]!"
  },
})

export const TransactionWithConsumptionTC = schemaComposer.createObjectTC({
  name: 'TransactionWithConsumption',
  fields: {
    transactionHash: "String!",
    energyConsumption: "Float!",
    energyConsumptionUnit: "String!"
  },
})
