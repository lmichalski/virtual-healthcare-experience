import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Switch, useHistory, useRouteMatch } from "react-router-dom";
import { SentryRoute as Route } from "./util";
import { useIntl } from "react-intl";

import Menu from "./pages/Menu";
import "./App.scss";

import { useGameData } from "./hooks/useGameData";

import Objectives from "./pages/Objectives";
import Intro from "./pages/Intro";
import Decision from "./pages/Decision";
import Video from "./pages/Video";
import Credits from "./pages/Credits";
import Instructions from "./pages/Instructions";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";
import Summary from "./pages/Summary";
import Transition from "./pages/Transition";
import Materials from "./pages/Materials";
import Principles from "./pages/Principles";
import useLogGameEvent from "./hooks/useLogGameEvent";
import { getBrowser, concatenatePaths } from "./util";
import useGameState from "./hooks/useGameState";

interface iProps {
  gameId: string;
}

const App: React.FC<iProps> = ({ gameId }) => {
  const history = useHistory();
  let { path, url } = useRouteMatch();

  const logGameEvent = useLogGameEvent();
  const locale = useIntl().locale;

  const gameData = useGameData(gameId, locale);
  const gameState = useGameState(gameId);
  const minSteps = gameData.decisionpoints.filter(
    ({ correct }) => correct
  ).length;

  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const handleSubtitlesLanguageSet = useCallback(
    (lang) => setSubtitlesEnabled(!!lang),
    []
  );

  const lastDecisionPoint =
    gameData.decisionpoints[gameData.decisionpoints.length - 1].id ===
    gameState.currentStep;

  const currentDecisionPoint = useMemo(() => {
    const currentDP = gameData.decisionpoints.find(
      ({ id }) => id === gameState.currentStep
    )!;
    if (!currentDP)
      console.error(`couldnt find dp for step${gameState.currentStep}`);
    return currentDP;
  }, [gameData.decisionpoints, gameState.currentStep]);

  const handleStartNewGame = useCallback(() => {
    gameState.newGame();

    history.push(concatenatePaths(url, `/intro/`));
    logGameEvent("", "start", "game", getBrowser(), "");
  }, [url, history, logGameEvent, gameState]);

  const handleResumeGame = useCallback(() => {
    var dp = currentDecisionPoint;

    if (dp && lastDecisionPoint) {
      history.push(concatenatePaths(url, `/summary/`));
    } else if (gameState.videoposition > 0.1) {
      history.push(concatenatePaths(url, `/video/`));
    } else {
      history.push(concatenatePaths(url, `/decision/`));
    }

    logGameEvent("", "resume", "game", "", "");
  }, [
    history,
    logGameEvent,
    gameState.videoposition,
    currentDecisionPoint,
    lastDecisionPoint,
    url,
  ]);

  const handleOptionChosen = useCallback(
    (nextId: number, label: string) => {
      const next = gameData.decisionpoints.find(({ id }) => id === nextId);

      gameState.selectOption(nextId, label);

      logGameEvent(
        "",
        "select",
        "answer",
        label,
        next?.correct ? "correct" : "incorrect"
      );

      switch (next?.type) {
        case "video":
          history.push(concatenatePaths(url, `/video/`));
          break;
        case "lo":
          if (next.feedback > "") {
            // If there's feedback, show it then advance
            history.push(concatenatePaths(url, `/feedback/`));
          } else {
            history.push(concatenatePaths(url, `/lo/`));
          }
          break;
      }

      // google analytics ???
    },
    [url, gameData.decisionpoints, history, logGameEvent, gameState]
  );

  const handleVideoFinished = useCallback(() => {
    const dp = currentDecisionPoint;
    gameState.setVideoposition(0);

    if (lastDecisionPoint) {
      history.push(concatenatePaths(url, `/summary/`));
    } else if (dp && dp.options.length > 0) {
      if (dp.feedback > "") {
        history.push(concatenatePaths(url, `/feedback/`));
      } else {
        // No feedback means go directly to the decision
        history.push(concatenatePaths(url, `/decision/`));
      }
    } else {
      gameState.setCurrentStep(gameState.currentStep + 1);
      if (dp?.next) {
        // If there are no options, go to the next decision point
        history.push(concatenatePaths(url, `/lo/`));
      } else {
        history.push(concatenatePaths(url, `/transition/`));
      }
    }
  }, [currentDecisionPoint, history, lastDecisionPoint, gameState, url]);

  useEffect(() => {
    Object.entries(gameData.colors).forEach(
      ([key, value]: [string, string]) => {
        document.body.style.setProperty(key, value);
      }
    );
  }, [gameData.colors]);

  return (
    <div className="fullscreen" style={gameData.colors as React.CSSProperties}>
      <div className="view" role="application">
        <Switch>
          <Route path={concatenatePaths(path, `/credits`)}>
            <Credits strings={gameData.strings.credits} />
          </Route>

          <Route path={concatenatePaths(path, `/decision`)}>
            <Decision
              decisionPoint={currentDecisionPoint}
              onOptionChosen={handleOptionChosen}
            />
          </Route>

          <Route path={concatenatePaths(path, `/feedback`)}>
            <Feedback decisionPoint={currentDecisionPoint} />
          </Route>

          <Route path={concatenatePaths(path, `/instructions`)}>
            <Instructions
              minSteps={minSteps}
              strings={gameData.strings.instructions}
            />
          </Route>

          <Route path={concatenatePaths(path, `/intro`)}>
            <Intro strings={gameData.strings.intro} />
          </Route>

          <Route path={concatenatePaths(path, `/materials`)}>
            <Materials />
          </Route>

          <Route path={concatenatePaths(path, `/objectives`)}>
            <Objectives strings={gameData.strings.objectives} />
          </Route>

          {gameData.strings.principles ? (
            <Route path={concatenatePaths(path, `/principles`)}>
              <Principles strings={gameData.strings.principles} />
            </Route>
          ) : null}

          <Route path={concatenatePaths(path, `/settings`)}>
            <Settings
              subtitlesEnabled={subtitlesEnabled}
              onSubtitlesToggled={setSubtitlesEnabled}
            />
          </Route>

          <Route path={concatenatePaths(path, `/summary`)}>
            <Summary
              decisionPoints={gameData.decisionpoints}
              gameProgress={gameState.progress}
              completed={lastDecisionPoint}
            />
          </Route>

          <Route path={concatenatePaths(path, `/transition`)}>
            <Transition decisionPoint={currentDecisionPoint} />
          </Route>

          <Route path={concatenatePaths(path, `/video`)}>
            <Video
              decisionPoint={currentDecisionPoint}
              onVideoFinished={handleVideoFinished}
              videoposition={gameState.videoposition}
              setVideoposition={gameState.setVideoposition}
              subtitlesLanguage={subtitlesEnabled ? locale : null}
              onSubtitlesLanguageSet={handleSubtitlesLanguageSet}
            />
          </Route>

          <Route path={concatenatePaths(path, `/lo`)}>
            Somethings going on here, I swear
          </Route>

          <Route path={concatenatePaths(path, `/`)}>
            <Menu
              strings={gameData.strings.menu}
              startNewGame={handleStartNewGame}
              resumeGame={handleResumeGame}
              gamesaved={gameState.gamesaved}
              pagesToShow={{
                principles: !!gameData.strings.principles,
              }}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
