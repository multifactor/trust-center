import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import nitro from './img/nitro.png';
import Navigation from './Navigation';
import Nitro from './Nitro';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Redirect to="/nitro" />
            <div className="page-header mb-4">
              <h1>Multifactor Trust Center</h1>
              <p className="lead">Tools for Trusted Computing</p>
            </div>
            <div className="row pt-4">
              <div className="col-3">
                <Link to="/nitro" className="text-decoration-none">
                  <div class="card text-white bg-dark mb-3">
                    <div class="card-body text-center p-4">
                      <img src={nitro} width="96px" className="mb-4" alt="AWS Nitro" />
                      <h4 class="card-title">AWS Nitro</h4>
                      <p class="card-text">Validate AWS Nitro attestation documents and encrypt secrets for use in Nitro enclaves.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Route>
          <Route path="/nitro" component={Nitro} />
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
