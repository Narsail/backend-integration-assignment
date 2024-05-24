import { schemaComposer } from './schema_block'
import {calculateTransactionEnergyConsumptionForBlock} from "../service/calculation";
import { fetchBlockWithHash } from '../blockchain_api/api';

schemaComposer.Query.addFields({
  block: {
    type: 'BlockWithTransactionEnergyConsumption',
    args: { hash: 'String!' },
    resolve: (_, { hash }) => fetchBlockWithHash(hash)
      .then(blockApiResponse => {
        return calculateTransactionEnergyConsumptionForBlock(blockApiResponse)
      })  
  },
})

export const schema = schemaComposer.buildSchema()
