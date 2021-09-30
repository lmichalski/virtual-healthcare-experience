import React, { useEffect, useRef, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import { API, DataStore } from "aws-amplify";

import Menu from "./pages/Menu";
import flags from "./flags";
import "./App.scss";

import enMessages from "./lang-compiled/en.json";
import frMessages from "./lang-compiled/fr.json";
import RootScopeContext, {
  emptyRootScope,
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
import { Game } from "./models";

import Amplify, { Logger } from "aws-amplify";

import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
API.configure(awsconfig);
Logger.LOG_LEVEL = "WARN";
DataStore.configure();
DataStore.start();

const App: React.FC<{}> = () => {
  const userLocale = "en" as string;
  const messages = userLocale === "fr" ? frMessages : enMessages;

  const rootScope = useRef(emptyRootScope());

  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (game || !flags.useDbForGameData) return;
    DataStore.query(Game, (game) =>
      game.lang("eq", userLocale).slug("eq", "er")
    ).then((games) => {
      const game = games[0];
      if (!game) return;
      console.log("Game gotten");
      rootScope.current.dataProvider = game.decisionpoints;
      rootScope.current.correctOptions = game.decisionpoints.filter(
        ({ correct }) => correct
      );
      setGame(game);
    });
  }, [userLocale, game]);

  return (
    <IntlProvider messages={messages} locale={userLocale} defaultLocale="en">
      <Router>
        {!game && flags.useDbForGameData ? (
          <h1> Loading! </h1>
        ) : (
          <RootScopeContext.Provider value={rootScope.current}>
            <div className="fullscreen">
              <div className="view" role="application">
                <Switch>
                  <Route path="/credits">
                    <Credits />
                  </Route>

                  <Route path="/decision">
                    <Decision />
                  </Route>

                  <Route path="/feedback">
                    <Feedback />
                  </Route>

                  <Route path="/instructions">
                    <Instructions />
                  </Route>

                  <Route path="/intro">
                    <Intro />
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
                    <Transition />
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
        )}
      </Router>
    </IntlProvider>
  );
};

export default App;
