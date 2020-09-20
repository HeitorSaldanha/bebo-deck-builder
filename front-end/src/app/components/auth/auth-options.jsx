import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import UserContext from '../../../context/user-context';

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <Nav className="ml-auto">
      {
        userData.user ? (
          <Button
            variant="outline-info"
            onClick={logout}
          >
            Log Out
          </Button>
        ) : (
          <>
            <Nav.Link as={Link} to="/auth/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/auth/register">
              Register
            </Nav.Link>
          </>
        )
      }
    </Nav>
  );
};

export default AuthOptions;
