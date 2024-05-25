import { SchemaComposer } from "graphql-compose";

export const schemaComposer = new SchemaComposer()

export const EnergyConsumptionOnDayTC = schemaComposer.createObjectTC({
  name: 'EnergyConsumptionOnDay',
  fields: {
    dateInMilliseconds: "String!",
    energyConsumption: "Float!",
    energyConsumptionUnit: "String!"
  },
})