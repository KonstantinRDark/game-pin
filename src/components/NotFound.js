import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const META_TITLE = 'Страница не найдена';

const NotFound = () => {
  return (
    <div>
      <Helmet title={ META_TITLE } />
      <h1>{ META_TITLE }</h1>
    </div>
  );
};

export default NotFound;
