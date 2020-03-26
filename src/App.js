import React, { Component } from 'react';
import LayoutMain from './Layout';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from './auth/Signup';
import VerifyOTP from './auth/VerifyOTP';
import Login from './auth/Login';

import './App.css';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <Switch>
              <Route exact path="/dashboard" component={LayoutMain} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/verify-otp" component={VerifyOTP} />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

