import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './components/app';
import {ServiceWorkerContainer} from './components/service-worker-container';
import {registerServiceWorker} from './util/register-service-worker';
import './styles/app';

ReactDOM.render(
  <ServiceWorkerContainer registerServiceWorker={registerServiceWorker}>
    <App />
  </ServiceWorkerContainer>,
  document.getElementById('application-host'));
