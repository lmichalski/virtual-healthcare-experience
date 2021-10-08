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

  const onOptionChosen = useCallback(
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
                handleOptionChosen={onOptionChosen}
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
              <Summary />
            </Route>

            <Route path="/transition">
              <Transition decisionPoint={currentDecisionPoint}/>
            </Route>

            <Route path="/video">
              <Video />
            </Route>

            <Route path="/">
              <Menu />
            </Route>
          </Switch>
        </div>
      </div>
    </RootScopeContext.Provider>
  );
};

export default App;
