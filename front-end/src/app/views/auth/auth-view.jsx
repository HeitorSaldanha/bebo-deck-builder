import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom';

import Login from '../../components/auth/login';
import Register from '../../components/auth/register';

const AuthView = () => (
  <Container>
    <Row className="justify-content-md-center align-middle">
      <Col xs={6}>
        <Switch>
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/register" component={Register} />
        </Switch>
      </Col>
    </Row>
  </Container>
);

export default AuthView;
