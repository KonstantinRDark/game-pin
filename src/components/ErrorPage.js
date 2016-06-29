import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const ErrorPage = ({ error }) => {
  return (
    <div>
      <h1>Page Error!</h1>
      {error.message}
    </div>
  );
};

export default ErrorPage;
