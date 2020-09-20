import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';

import AuthView from './app/views/auth/auth-view';
import HomeView from './app/views/home/home-view';
import TopNav from './app/components/top-nav/top-nav';
import UserContext from './context/user-context';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(
          'http://localhost:5000/users/',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

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
            style={{ paddingTop: '50px' }}
          >
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route path="/auth" component={AuthView} />
            </Switch>
          </Container>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
