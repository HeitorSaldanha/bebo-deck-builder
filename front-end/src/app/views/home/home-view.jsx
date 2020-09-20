import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../context/user-context';

const HomeView = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (!userData.user) {
      history.push('/auth/login');
    }
  });

  return (
    <h1>Home</h1>
  );
};

export default HomeView;
