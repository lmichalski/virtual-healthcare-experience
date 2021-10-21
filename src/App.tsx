import React, { useCallback, useMemo } from "react";

import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
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
import { getBrowser } from "./util";
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
  const gameState = useGameState();
  const minSteps = gameData.decisionpoints.filter(
    ({ correct }) => correct
  ).length;

  const lastDecisionPoint =
    gameData.decisionpoints[gameData.decisionpoints.length - 1].id ===
    gameState.currentStep;

  const currentDecisionPoint = useMemo(() => {
    return gameData.decisionpoints.find(
      ({ id }) => id === gameState.currentStep
    )!;
  }, [gameData.decisionpoints, gameState.currentStep]);

  const handleStartNewGame = useCallback(() => {
    gameState.newGame();

    history.push(`${url}/intro/`);
    logGameEvent("", "start", "game", getBrowser(), "");
  }, [history, logGameEvent, gameState]);

  const handleResumeGame = useCallback(() => {
    var dp = currentDecisionPoint;

    if (dp && lastDecisionPoint) {
      history.push(`${url}/summary/`);
    } else if (gameState.videoposition > 0.1) {
      history.push(`${url}/video/`);
    } else {
      history.push(`${url}/decision/`);
    }

    logGameEvent("", "resume", "game", "", "");
  }, [
    history,
    logGameEvent,
    gameState.videoposition,
    currentDecisionPoint,
    lastDecisionPoint,
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
          history.push(`${url}/video/`);
          break;
        case "lo":
          if (next.feedback > "") {
            // If there's feedback, show it then advance
            history.push(`${url}/feedback/`);
          } else {
            history.push(`${url}/lo/`);
          }
          break;
      }

      // google analytics ???
    },
    [gameData.decisionpoints, history, logGameEvent, gameState]
  );

  const handleVideoFinished = useCallback(() => {
    const dp = currentDecisionPoint;
    gameState.setVideoposition(0);

    if (lastDecisionPoint) {
      history.push(`${url}/summary/`);
    } else if (dp && dp.options.length > 0) {
      if (dp.feedback > "") {
        history.push(`${url}/feedback/`);
      } else {
        // No feedback means go directly to the decision
        history.push(`${url}/decision/`);
      }
    } else {
      gameState.setCurrentStep(gameState.currentStep + 1);
      if (dp?.next) {
        // If there are no options, go to the next decision point
        history.push(`${url}/lo/`);
      } else {
        history.push(`${url}/transition/`);
      }
    }
  }, [currentDecisionPoint, history, lastDecisionPoint, gameState]);

  return (
    <div className="fullscreen">
      <div className="view" role="application">
        <Switch>
          <Route path={`${path}/credits`}>
            <Credits />
          </Route>

          <Route path={`${path}/decision`}>
            <Decision
              decisionPoint={currentDecisionPoint}
              onOptionChosen={handleOptionChosen}
            />
          </Route>

          <Route path={`${path}/feedback`}>
            <Feedback decisionPoint={currentDecisionPoint} />
          </Route>

          <Route path={`${path}/instructions`}>
            <Instructions
              minSteps={minSteps}
              strings={gameData.strings.instructions}
            />
          </Route>

          <Route path={`${path}/intro`}>
            <Intro strings={gameData.strings.intro} />
          </Route>

          <Route path={`${path}/materials`}>
            <Materials />
          </Route>

          <Route path={`${path}/objectives`}>
            <Objectives strings={gameData.strings.objectives} />
          </Route>

          <Route path={`${path}/principles`}>
            <Principles strings={gameData.strings.principles} />
          </Route>

          <Route path={`${path}/settings`}>
            <Settings />
          </Route>

          <Route path={`${path}/summary`}>
            <Summary
              decisionPoints={gameData.decisionpoints}
              gameProgress={gameState.progress}
              completed={lastDecisionPoint}
            />
          </Route>

          <Route path={`${path}/transition`}>
            <Transition decisionPoint={currentDecisionPoint} />
          </Route>

          <Route path={`${path}/video`}>
            <Video
              decisionPoint={currentDecisionPoint}
              onVideoFinished={handleVideoFinished}
              videoposition={gameState.videoposition}
              setVideoposition={gameState.setVideoposition}
            />
          </Route>

          <Route path={`${path}/lo`}>Somethings going on here, I swear</Route>

          <Route path={`${path}/`}>
            <Menu
              strings={gameData.strings.menu}
              startNewGame={handleStartNewGame}
              resumeGame={handleResumeGame}
              gamesaved={gameState.gamesaved}
              pagesToShow={{
                objectives: !!gameData.strings.objectives,
              }}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
