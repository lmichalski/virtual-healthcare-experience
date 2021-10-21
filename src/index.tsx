import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoggingContextProvider } from "./hooks/useLogGameEvent";

import enMessages from "./lang-compiled/en.json";
import frMessages from "./lang-compiled/fr.json";

const locale = "en" as string;
const messages = locale === "fr" ? frMessages : enMessages;

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <Router basename="/">
        <LoggingContextProvider>
          <Switch>
            <Route path="/games/:game_id">
              {(params) => (
                <App
                  gameId={params.match?.params.game_id!}
                />
              )}
            </Route>
          </Switch>
        </LoggingContextProvider>
      </Router>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
