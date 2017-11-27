import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Panel from './containers/Panel/Panel.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';




ReactDOM.render(
<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
