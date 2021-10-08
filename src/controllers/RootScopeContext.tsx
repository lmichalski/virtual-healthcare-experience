import React from "react";

import { generateUUID, Storage } from "../util";
import er_game_data from "../games/er_game_data.json";

const data: GameDataShape = er_game_data;

interface DecisionPoint {
  id: number;
  title?: string;
  type: string; //"video" | "string",
  data: string;

  video:
    | {
        vimeo_url: string;
        videojs_url?: string;
      }
    | {
        vimeo_url?: string;
        videojs_url: string;
      }
    | null;

  correct: boolean;
  feedback: string;
  message: string;
  options: {
    label: string;
    next: number;
  }[];
  next: null;
}

interface GameDataShape {
  decisionpoints: DecisionPoint[];
}

interface iGameSave {
  uuid: string;
  gamesaved: boolean;
  subtitles: boolean;
  fullscreen: boolean;
  current: number;
  completed: boolean;
  videoposition: number;
  progress: {
    id: number;
    label: string;
    option: number;
  }[];
}

interface iRootScope {
  dataProvider: DecisionPoint[];
  correctOptions: DecisionPoint[];
  sg: iGameSave;
  resumeURL?: string;
  saveState: () => void;
}

export const emptyRootScope = (): iRootScope => ({
  dataProvider: data.decisionpoints,
  correctOptions: data.decisionpoints.filter(({ correct }) => correct),
  sg: (Storage.getObject("prenatal") as iGameSave | false) || {
    uuid: generateUUID(),
    gamesaved: false,
    subtitles: false,
    fullscreen: false,
    current: 0,
    completed: false,
    videoposition: 0,
    progress: [],
  },
  resumeURL: undefined,
  saveState() {
    Storage.setObject("prenatal", this.sg);
  },
});

const RootScopeContext = React.createContext(emptyRootScope());
export default RootScopeContext;
