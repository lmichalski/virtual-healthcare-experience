import { useEffect, useMemo, useState } from "react";
import { generateUUID } from "../util";
import { VHEStorage } from "./useStorage";

interface iGameSave {
  uuid: string;
  gamesaved: boolean;
  subtitles: boolean;
  fullscreen: boolean;
  currentStep: number;
  videoposition: number;
  progress: {
    id: number;
    label: string;
    option: number;
  }[];
}

const useGameState = () => {
  const storageKey = "emergency";
  const [loaded] = useState(
    VHEStorage.getObject(storageKey) as iGameSave | null
  );

  const [uuid] = useState(loaded?.uuid ?? generateUUID());
  const [gamesaved, setGamesaved] = useState(loaded?.gamesaved ?? false);
  const [currentStep, setCurrentStep] = useState(loaded?.currentStep ?? 0);
  const [videoposition, setVideoposition] = useState(
    loaded?.videoposition ?? 0
  );
  const [progress, setProgress] = useState(loaded?.progress ?? []);

  useEffect(() => {
    VHEStorage.setObject(storageKey, {
      uuid,
      gamesaved,
      subtitles: false,
      fullscreen: false,
      currentStep,
      videoposition,
      progress,
    });
  }, [uuid, gamesaved, currentStep, videoposition, progress]);

  const gameState = useMemo(
    () => ({
      newGame: () => {
        setGamesaved(true);
        setCurrentStep(0);
        setVideoposition(0);
        setProgress([]);
      },
      selectOption: (nextId: number, label: string) => {
        setProgress((ps) => [
          ...ps,
          {
            id: currentStep,
            label: label,
            option: nextId,
          },
        ]);
        setCurrentStep(nextId);
      },
      currentStep,
      setCurrentStep,
      videoposition,
      setVideoposition,
      progress,
      gamesaved,
    }),
    [currentStep, gamesaved, progress, videoposition]
  );

  return gameState;
};

export default useGameState;
