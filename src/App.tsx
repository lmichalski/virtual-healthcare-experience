import React, { useRef } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";

import Menu from "./pages/Menu";
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

const App: React.FC<{}> = () => {
  const locale = "en" as string;
  const messages = locale === "fr" ? frMessages : enMessages;

  const rootScope = useRef(emptyRootScope());

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <Router basename="/virtual-healthcare-experience/">
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
      </Router>
    </IntlProvider>
  );
};

export default App;
