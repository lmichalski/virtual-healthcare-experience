// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Game, Option, VideoSources, DecisionPoint } = initSchema(schema);

export {
  Game,
  Option,
  VideoSources,
  DecisionPoint
};