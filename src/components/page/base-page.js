'use strict';

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';

import NotFound from './../NotFound';
import EmptyBody from './../EmptyBody';

export default class BasePage extends Component {
  /**
   * Типы передаваемых свойств
   * @see https://facebook.github.io/react/docs/reusable-components.html
   */
  static propTypes = {
    error: PropTypes.object
  };

  /**
   * Свойства по умолчанию
   * @see https://facebook.github.io/react/docs/reusable-components.html#default-prop-values
   */
  static defaultProps = {};

  render() {
    let { error } = this.props;

    if (!error) {
      return this.wrapper();
    } else {
      return this.error();
    }
  }

  wrapper() {
    return (
      <div className='page-wrapper'>
        {this.meta()}
        {this.body()}
      </div>
    );
  }

  error() {
    return <NotFound />;
  }

  meta(options) {
    if (!options) {
      return '';
    }

    return <Helmet {...options} />;
  }

  body() {
    return <EmptyBody/>;
  }
}
