'use strict';
import React, { PropTypes } from 'react';

import BasePage from './base-page';
import PageLoader from '../PageLoader';
import ErrorPage from '../ErrorPage';

export default class AsyncPage extends BasePage {
  /**
   * Типы передаваемых свойств
   * @see https://facebook.github.io/react/docs/reusable-components.html
   */
  static propTypes = {
    isLoading: PropTypes.bool
  };

  /**
   * Свойства по умолчанию
   * @see https://facebook.github.io/react/docs/reusable-components.html#default-prop-values
   */
  static defaultProps = {};

  wrapper() {
    let { isLoading } = this.props;
    let loader = <PageLoader/>;
    let meta = '';
    let body = '';

    if (isLoading === false) {
      loader = '';

      try {
        meta = this.meta();
        body = this.body();
      } catch (err) {
        console.error(err);
        return (<ErrorPage error={err}/>);
      }
    }

    return (
      <div className='page-wrapper'>
        {loader}
        {meta}
        {body}
      </div>
    );
  }
}
