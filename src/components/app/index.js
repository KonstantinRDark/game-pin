import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Header from './../header';
import Nav from './../nav';
import Footer from './../footer';
import { META_BASE_TITLE, META_BASE_TITLE_TEMPLATE} from './../../constants';

export default class App extends Component {

  /**
   * Типы передаваемых свойств
   * @see https://facebook.github.io/react/docs/reusable-components.html
   */
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    const  { children } = this.props;
    return (
      <div className='app'>
        <Helmet title={META_BASE_TITLE} titleTemplate={META_BASE_TITLE_TEMPLATE}/>
        <div className='app-container'>
          {children}
        </div>
      </div>
    );
  }
}
