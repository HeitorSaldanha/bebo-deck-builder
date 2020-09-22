import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ErrorAlert from '../misc/error-alert';
import UserContext from '../../../context/user-context';

const RegisterComponent = () => {
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        displayName,
        email,
        password,
        passwordCheck,
      };
      await Axios.post(
        '/users/register',
        newUser,
      );
      const loginRes = await Axios.post(
        '/users/login',
        {
          email,
          password,
        },
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
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
        Register
      </h2>
      {
        error
          && <ErrorAlert message={error} clearError={() => setError(undefined)} />
      }
      <Form
        onSubmit={submitForm}
      >
        <Form.Group>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Display Name"
            id="registerDisplayName"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="registerEmail"
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
            id="registerPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
        >
          Register
        </Button>
      </Form>
    </>
  );
};

export default RegisterComponent;
