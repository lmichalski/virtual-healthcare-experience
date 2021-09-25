import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { IntlProvider } from "react-intl";

import Main from './pages/Main'

import './App.scss'

const enMessages = require("./lang-compiled/en.json") as Record<string, string>
const frMessages = require("./lang-compiled/fr.json") as Record<string, string>

function App () {

  const locale = 'fr' as string
  const messages = locale === 'fr' ? frMessages : enMessages

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <Router>
        <div className='fullscreen'>
          <div className='view' role='application'>
            <Switch>
              <Route path='/main'>
                <Main />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </IntlProvider>
  )
}

export default App
