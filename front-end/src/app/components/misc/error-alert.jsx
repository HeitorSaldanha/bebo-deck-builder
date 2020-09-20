import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const ErrorAlert = (props) => {
  const [show, setShow] = useState(true);
  const { message, clearError } = props;

  const closeAlert = () => {
    setShow(false);
    clearError();
  };

  return (
    <Alert
      variant="danger"
      dismissible
      onClose={closeAlert}
      show={show}
    >
      <Alert.Heading>Error!</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default ErrorAlert;
