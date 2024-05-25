import {calculateEnergyConsumptionOfBlocks, calculateTransactionEnergyConsumptionForBlock} from "../service/energy_calculation";
import {fetchBlocksForDate, fetchBlockWithHash} from '../blockchain_api/api';
import { SchemaComposer } from "graphql-compose";
import {provideDatesForLastDays} from "../service/date_mapping";
import {BlockWithTransactionEnergyConsumptionTC} from "./schema_block";
import {EnergyConsumptionOnDayTC} from "./schema_day";

export const schemaComposer = new SchemaComposer()

schemaComposer.Query.addFields({
  block: {
    type: BlockWithTransactionEnergyConsumptionTC,
    args: { hash: 'String!' },
    resolve: (_, { hash }) => fetchBlockWithHash(hash)
      .then(blockApiResponse => {
        return calculateTransactionEnergyConsumptionForBlock(blockApiResponse)
      })  
  },
  energyConsumptionOfLastX: {
    type: [EnergyConsumptionOnDayTC],
    args: { days: 'Int!' },
    resolve: (_, { days }) => provideDatesForLastDays(days)
      .map(fetchBlocksForDate)
      .map(async blocksOfDayPromise => {

        const blocksOfDay = await blocksOfDayPromise;
        return Promise.all(
          blocksOfDay.blocks.map(oneBlockOfDay => {
            return fetchBlockWithHash(oneBlockOfDay.hash);
          })
        ).then(blockResponses => {
          return calculateEnergyConsumptionOfBlocks(blockResponses, blocksOfDay.date);
        });

      })
  }
})

export const schema = schemaComposer.buildSchema()
