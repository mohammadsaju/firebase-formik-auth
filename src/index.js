import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './StateProvider';
import { initialstate, reducer } from './reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialstate={initialstate} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
