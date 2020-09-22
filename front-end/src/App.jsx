import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';

import AuthView from './app/views/auth/auth-view';
import DecksView from './app/views/decks/decks-view';
import TopNav from './app/components/top-nav/top-nav';
import UserContext from './context/user-context';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const tokenRes = await Axios.get('/users/tokenIsValid');
      if (tokenRes.data) {
        const userRes = await Axios.get('/users/');
        setUserData({
          user: userRes.data,
        });
      }
    };

    const getCsrfToken = async () => {
      const { data } = await Axios.get('/csrf-token');
      Axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
    };

    getCsrfToken();
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={
        {
          userData,
          setUserData,
        }
      }
        >
          <TopNav />
          <Container
            fluid
            style={{ padding: '50px' }}
          >
            <Switch>
              <Route exact path="/" component={DecksView} />
              <Route path="/auth" component={AuthView} />
            </Switch>
          </Container>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
