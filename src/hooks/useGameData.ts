import { useMemo } from "react";
import er_game_data from "../games/er_game_data.json";
import suicidal_patient_data from "../games/suicidal_patient_data.json";

export interface DecisionPoint {
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
  strings: {
    menu: {
      title: string;
    };
    intro: {
      introCards: string[];
    };
    objectives: {
      paragraph1: string;
      paragraph2: string;
      bullet_list: string[];
    };
    instructions: {
      paragraph: string;
      bullet_list: string[];
    };
  };
}

export const useGameData = (
  game: "emergency"|"suicidal_patient",
  locale?: string
): GameDataShape => {
  const data = useMemo(() => {
    switch (game) {
      case "emergency":
        return locale === "fr" ? er_game_data : er_game_data;
      case "suicidal_patient":
        return locale === "fr" ? er_game_data : er_game_data;
    }
  }, [game, locale]);

  return data;
};
