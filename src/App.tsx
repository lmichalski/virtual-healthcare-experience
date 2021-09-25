import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";

import Main from "./pages/Main";
import Menu from "./pages/Menu";

import "./App.scss";

import enMessages from "./lang-compiled/en.json";
import frMessages from "./lang-compiled/fr.json";

const App: React.FC<{}> = () => {
  const locale = "fr" as string;
  const messages = locale === "fr" ? frMessages : enMessages;

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <Router>
        <div className="fullscreen">
          <div className="view" role="application">
            <Switch>
              <Route path="/main">
                <Main />
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
