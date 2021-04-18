import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LoginForm, LoginFormOptions } from './login-form';

export function WelcomePage() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <LoginForm onSubmit={() => {}} />
          </Route>
          <Route path="/register">
            <LoginForm onSubmit={() => {}} option={LoginFormOptions.register} />
          </Route>
          {/* <Route path="/">
            
          </Route> */}
        </Switch>
      </div>
    </Router>
  )
}