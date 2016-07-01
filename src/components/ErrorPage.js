import React, { PropTypes } from 'react';

const ErrorPage = ({ error }) => {
  return (
    <div>
      <h1>Page Error!</h1>
      { error.message }
    </div>
  );
};

export default ErrorPage;
