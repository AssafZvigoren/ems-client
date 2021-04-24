import React from 'react';
import ReactDOM from 'react-dom';
// import { WelcomePage } from './components/welcome-page';
import {WelcomePage} from './components/welcome-with-context'
import {AuthProvider} from './auth/AuthContext'
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <AuthProvider>
        <WelcomePage />
      </AuthProvider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);