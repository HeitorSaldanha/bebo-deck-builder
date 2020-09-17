import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginView from './app/views/auth/login-view';
import DashBoardView from './app/views/dashboard/dashboard-view';

export default function App() {
  return <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DashBoardView} />
        <Route path="/login" component={LoginView} />
      </Switch>
    </BrowserRouter>
  </>
}
