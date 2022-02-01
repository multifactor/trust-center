import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import logo from './logo.png';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Trust Center" height="30" />
          </a>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="https://trust.multifactor.com">Tools</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://trust.multifactor.com/sdk">SDK</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/multifactor/trust-center">Source Code</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://trust.multifactor.com/docs">Documentation</a>
            </li>
          </ul>
          <form className="d-flex">
            <a className="btn btn-secondary my-2 my-sm-0" href="#">Security</a>
          </form>
        </div>
      </nav>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <div className="page-header">
              <h1>Multifactor Trust Center</h1>
              <p className="lead">Tools for Trusted Computing</p>
            </div>
          </Route>
          <Route path="*">
            <div className="page-header">
              <h1><i class="fas fa-exclamation-triangle"></i> 404</h1>
              <p className="lead">Page not found</p>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
