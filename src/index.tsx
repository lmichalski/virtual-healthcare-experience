import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { SentryRoute as Route } from "./util";
import { LoggingContextProvider } from "./hooks/useLogGameEvent";

import enMessages from "./lang-compiled/en.json";
import frMessages from "./lang-compiled/fr.json";
import Home from "./pages/Home";
import { cookies } from "./hooks/useStorage";

const savedLocale = cookies.get("locale");
const locale =
  savedLocale === "fr" || navigator.languages[0].startsWith("fr") ? "fr" : "en";
const messages = locale === "fr" ? frMessages : enMessages;

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [new Integrations.BrowserTracing()],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});


ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <Router basename="/">
        <LoggingContextProvider>
          <Switch>
            <Route path="/games/:game_id">
              {(params) => <App gameId={params.match?.params.game_id!} />}
            </Route>
            <Route>
              <Home />
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
