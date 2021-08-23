import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import './main.scss';
import './fonts/Segoe-UI.ttf';
import App from './App';

Sentry.init({
  dsn: 'https://d6de13a8c966408d971030ad86a553fa@o968511.ingest.sentry.io/5919856',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
