import { useMemo } from "react";

const games: Record<string, Record<string, GameDataShape>> = {
  emergency: {
    en: require("../games/er_game_data.json"),
  },
  post_partum: {
    fr: require("../games/post_partum_fr.json"),
  },
  labor_delivery: {
    fr: require("../games/labor_delivery_fr.json"),
  },
  prenatal_fr: {
    fr: require("../games/prenatal_fr.json"),
  },
};

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
  colors: {
    "--theme-light": string;
    "--theme-dark": string;
    "--theme-primary": string;
    "--primary-text-color": string;
    "--link-color": string;
  };
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
    principles?: {
      paragraph: string;
      bullet_list: string[];
    };
    instructions: {
      paragraph: string;
      bullet_list: string[];
    };
    credits: {
      paragraphs: string[];
      credits_sections: {
        header: string;
        items: string[];
      }[];
      end_paragraphs: string[];
    };
  };
}

export const useGameData = (game: string, locale: string): GameDataShape => {
  const data = useMemo(
    () => games[game]?.[locale] || games[game]?.["en"] || games[game]?.["fr"],
    [game, locale]
  );
  console.log(data);
  if (!data) {
    throw new Error("That game could not be found");
  }
  return data;
};
