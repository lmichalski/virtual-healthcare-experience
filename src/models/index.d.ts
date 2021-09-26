import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Option {
  readonly label: string;
  readonly next: number;
  constructor(init: ModelInit<Option>);
}

export declare class VideoSources {
  readonly vimeoUrl?: string;
  readonly videojsUrl?: string;
  constructor(init: ModelInit<VideoSources>);
}

export declare class DecisionPoint {
  readonly data: string;
  readonly id: number;
  readonly title?: string;
  readonly type: string;
  readonly video?: VideoSources;
  readonly correct: boolean;
  readonly feedback: string;
  readonly message: string;
  readonly options: Option[];
  readonly next?: number;
  readonly last?: boolean;
  constructor(init: ModelInit<DecisionPoint>);
}

type GameMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Game {
  readonly id: string;
  readonly lang?: string;
  readonly slug?: string;
  readonly name?: string;
  readonly decisionpoints: DecisionPoint[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Game, GameMetaData>);
  static copyOf(source: Game, mutator: (draft: MutableModel<Game, GameMetaData>) => MutableModel<Game, GameMetaData> | void): Game;
}