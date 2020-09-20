import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ErrorAlert from '../misc/error-alert';
import UserContext from '../../../context/user-context';

const LoginComponent = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await Axios.post(
        'http://localhost:5000/users/login',
        {
          email,
          password,
        },
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      if (err.response.data.msg) {
        setError(err.response.data.msg);
      }
    }
  };

  return (
    <>
      <h2>
        Login
      </h2>
      {
        error
          && <ErrorAlert message={error} clearError={() => setError(undefined)} />
      }
      <Form onSubmit={submitForm}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="loginEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="loginPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginComponent;
