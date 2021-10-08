import React, { useCallback, useMemo, useRef } from "react";

import { Switch, Route, useHistory } from "react-router-dom";
import { useIntl } from "react-intl";

import Menu from "./pages/Menu";
import "./App.scss";

import RootScopeContext, {
  emptyRootScope,
  fetchGameData,
} from "./controllers/RootScopeContext";

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
import useLogGameEvent from "./hooks/useLogGameEvent";
import { getBrowser } from "./util";

const App: React.FC<{}> = () => {
  const rootScope = useRef(emptyRootScope());
  const history = useHistory();
  const logGameEvent = useLogGameEvent();
  const locale = useIntl().locale;
  const gameData = useMemo(() => fetchGameData("emergency", locale), [locale]);
  const minSteps = gameData.decisionpoints.filter(({ correct }) => correct).length

  const currentDecisionPoint = useMemo(() => {
    return gameData.decisionpoints.find(
      ({ id }) => id === rootScope.current.sg.current
    )!;
  }, [gameData.decisionpoints]);

  const initialiseSaveGame = useCallback(() => {
    rootScope.current.sg.gamesaved = true;
    rootScope.current.sg.videoposition = 0;
    rootScope.current.saveState();
  }, []);

  const handleStartNewGame = useCallback(() => {
    rootScope.current.sg.gamesaved = false;
    rootScope.current.sg.current = 0;
    rootScope.current.sg.completed = false;
    rootScope.current.sg.videoposition = 0;
    rootScope.current.sg.progress = [];

    history.push("/intro/");
    rootScope.current.saveState();

    logGameEvent("", "start", "game", getBrowser(), "");
  }, [rootScope, history, logGameEvent]);

  const handleResumeGame = useCallback(() => {
    var dp = rootScope.current.dataProvider.find(
      ({ id }) => id === rootScope.current.sg.current
    );

    if (
      dp &&
      rootScope.current.dataProvider.indexOf(dp) === rootScope.current.dataProvider.length - 1
    ) {
      history.push("/summary/");
    } else if (rootScope.current.sg.videoposition > 0.1) {
      history.push("/video/");
    } else {
      history.push("/decision/");
    }

    logGameEvent("", "resume", "game", "", "");
    rootScope.current.sg.progress = [];
  }, [history, logGameEvent, rootScope]);

  const handleOptionChosen = useCallback(
    (nextId: number, label: string) => {
      const next = gameData.decisionpoints.find(({ id }) => id === nextId);

      rootScope.current.sg.progress.push({
        id: rootScope.current.sg.current,
        label: label,
        option: nextId,
      });
      rootScope.current.sg.current = nextId;
      rootScope.current.saveState();

      logGameEvent(
        "",
        "select",
        "answer",
        label,
        next?.correct ? "correct" : "incorrect"
      );

      switch (next?.type) {
        case "video":
          history.push("/video/");
          break;
        case "lo":
          if (next.feedback > "") {
            history.push("/feedback/");
          } else {
            history.push("/lo/");
          }
          break;
      }

      // google analytics ???
    },
    [gameData.decisionpoints, history, logGameEvent]
  );

  const handleVideoFinished = useCallback(() => {
    const dp = currentDecisionPoint
    rootScope.current.sg.videoposition = 0;
    rootScope.current.saveState();

    if (
      dp &&
      gameData.decisionpoints.indexOf(dp) === gameData.decisionpoints.length - 1
    ) {
      rootScope.current.sg.completed = true;
      history.push("/summary/");
    } else if (dp && dp.options.length > 0) {
      if (dp && dp.feedback > "") {
        history.push("/feedback/");
      } else {
        history.push("/decision/");
      }
    } else if (dp?.next) {
      rootScope.current.sg.videoposition = 0;
      history.push("/lo/");
      rootScope.current.saveState();
      rootScope.current.sg.current++;
    } else {
      history.push("/transition/");
      rootScope.current.sg.current++;
    }
    rootScope.current.saveState()
  },[currentDecisionPoint, gameData.decisionpoints, history])

  return (
    <RootScopeContext.Provider value={rootScope.current}>
      <div className="fullscreen">
        <div className="view" role="application">
          <Switch>
            <Route path="/credits">
              <Credits />
            </Route>

            <Route path="/decision">
              <Decision
                decisionPoint={currentDecisionPoint}
                onOptionChosen={handleOptionChosen}
              />
            </Route>

            <Route path="/feedback">
              <Feedback decisionPoint={currentDecisionPoint} />
            </Route>

            <Route path="/instructions">
              <Instructions
                minSteps={
                  minSteps
                }
              />
            </Route>

            <Route path="/intro">
              <Intro handleInitialiseSaveGame={initialiseSaveGame} />
            </Route>

            <Route path="/materials">
              <Materials />
            </Route>

            <Route path="/objectives">
              <Objectives />
            </Route>

            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/summary">
              <Summary 
                decisionPoints={gameData.decisionpoints}
                gameProgress={rootScope.current.sg.progress}
                completed={rootScope.current.sg.completed}
              />
            </Route>

            <Route path="/transition">
              <Transition decisionPoint={currentDecisionPoint}/>
            </Route>

            <Route path="/video">
              <Video 
                decisionPoint={currentDecisionPoint} 
                onVideoFinished={handleVideoFinished} 
                videoposition={rootScope.current.sg.videoposition} 
                setVideoposition={(time) => { 
                  rootScope.current.sg.videoposition = time
                  rootScope.current.saveState();
                }}
              />
            </Route>

            <Route path="/">
              <Menu 
                startNewGame={handleStartNewGame}
                resumeGame={handleResumeGame}
                gamesaved={rootScope.current.sg.gamesaved}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </RootScopeContext.Provider>
  );
};

export default App;
