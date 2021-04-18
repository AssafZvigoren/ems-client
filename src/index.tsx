import React from 'react';
import ReactDOM from 'react-dom';
import { WelcomePage } from './components/welcome-page';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <WelcomePage />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);