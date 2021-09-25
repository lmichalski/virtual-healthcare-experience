import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";

import Menu from "./pages/Menu";

import "./App.scss";

import enMessages from "./lang-compiled/en.json";
import frMessages from "./lang-compiled/fr.json";

import Objectives from "./pages/Objectives";
import Intro from "./pages/Intro";
import Decision from "./pages/Decision";
import Video from "./pages/Video";

const App: React.FC<{}> = () => {
  const locale = "en" as string;
  const messages = locale === "fr" ? frMessages : enMessages;

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <Router>
        <div className="fullscreen">
          <div className="view" role="application">
            <Switch>
              <Route path="/intro">
                <Intro />
              </Route>

              <Route path="/decision">
                <Decision />
              </Route>

              <Route path="/objectives">
                <Objectives />
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
      </Router>
    </IntlProvider>
  );
};

export default App;
